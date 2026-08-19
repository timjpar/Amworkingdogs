import { LINKS } from "@/app/_config/links";
import { CONTACT_LIMITS } from "@/app/_config/contact";

/**
 * Browser-side FormSubmit client.
 *
 * Replaces the Resend transport, which needed an API key that was never set in
 * Vercel — so every submission short-circuited on `missing-api-key` and the
 * sender saw the fallback notice. FormSubmit needs no key, no account, and no
 * DNS records: the destination address *is* the endpoint, which removes the
 * configuration that was missing in the first place. The address comes from
 * LINKS.email, so there is nothing to set in Vercel and no unset-variable
 * failure mode to regress into.
 *
 * This runs in the visitor's browser, not on the server. FormSubmit answers
 * HTTP 403 to requests originating from cloud infrastructure, so a POST from a
 * Vercel function fails in production while succeeding from a laptop.
 * Consequently these forms have no server action behind them.
 *
 * Spam handling is the hidden honeypot in the form plus FormSubmit's own
 * filtering. The previous per-IP limiter ran server-side and could not survive
 * this move; it also bought little, since anything abusive can post to the
 * endpoint directly without involving this site at all.
 */

/** The AJAX endpoint returns JSON; the bare one redirects to FormSubmit's page. */
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax";

/** Longest value we'll relay, per field. Matches the textarea's own cap. */
const MAX_FIELD_LENGTH = CONTACT_LIMITS.message;

export interface SubmitResult {
  success: boolean;
  error?: string;
  /** True when delivery failed, so the UI can offer phone/email instead. */
  showFallback?: boolean;
}

export async function submitForm({
  subject,
  fields,
  replyTo,
  honeypot,
}: {
  subject: string;
  /** Label/value pairs, rendered by FormSubmit as rows in the email. */
  fields: Array<[string, string]>;
  replyTo?: string;
  honeypot?: string;
}): Promise<SubmitResult> {
  // Silent success: a bot that filled the hidden field shouldn't learn it was caught.
  if (honeypot) return { success: true };

  // Reject rather than truncate — silently shortening someone's message would
  // be worse than telling them.
  if (fields.some(([, value]) => value.length > MAX_FIELD_LENGTH)) {
    return {
      success: false,
      error: "That's longer than we can accept. Please shorten it and try again.",
    };
  }

  if (replyTo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    const res = await fetch(`${FORMSUBMIT_ENDPOINT}/${encodeURIComponent(LINKS.email)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...Object.fromEntries(fields),
        _subject: subject,
        _template: "table",
        // The AJAX endpoint can't present a challenge, so asking for one would
        // reject every submission.
        _captcha: "false",
        ...(replyTo ? { _replyto: replyTo } : {}),
      }),
      // Never let a slow provider hold a visitor's submit open.
      signal: AbortSignal.timeout(15_000),
    });

    // FormSubmit answers 200 even when it declines, so the body decides.
    // `success` comes back as the string "true", not a boolean.
    const body: unknown = await res.json().catch(() => null);
    const success =
      typeof body === "object" && body !== null && "success" in body
        ? String((body as { success: unknown }).success) === "true"
        : false;

    if (!res.ok || !success) {
      return {
        success: false,
        error: "We couldn't send your message just now.",
        showFallback: true,
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "We couldn't send your message just now.",
      showFallback: true,
    };
  }
}

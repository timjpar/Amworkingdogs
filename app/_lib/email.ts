import { BUSINESS } from "@/app/_config/business";
import { LINKS } from "@/app/_config/links";

/**
 * Contact-form delivery via Resend's REST API.
 *
 * Deliberately no SDK: this is one POST, and every dependency added here is
 * another package to keep patched. Swapping providers means rewriting this one
 * function — nothing else imports the transport.
 *
 * Configuration, all from the environment so no key is ever committed:
 *   RESEND_API_KEY    required; without it sending is skipped and reported.
 *   CONTACT_TO        where enquiries land. Defaults to the published address.
 *   CONTACT_FROM      verified sender. Until the domain is verified in Resend
 *                     this must be onboarding@resend.dev.
 */

const ENDPOINT = "https://api.resend.com/emails";

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subjectLabel: string;
  message: string;
}

export type SendResult = { ok: true } | { ok: false; reason: string };

/** Escape anything that lands inside the HTML body of the notification. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(msg: ContactMessage): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "missing-api-key" };

  const to = process.env.CONTACT_TO || BUSINESS.email;
  const from = process.env.CONTACT_FROM || "onboarding@resend.dev";

  const html = `
    <h2>New enquiry from ${esc(BUSINESS.name)}</h2>
    <p><strong>Name:</strong> ${esc(msg.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${esc(msg.email)}">${esc(msg.email)}</a></p>
    <p><strong>Phone:</strong> ${msg.phone ? esc(msg.phone) : "not given"}</p>
    <p><strong>About:</strong> ${esc(msg.subjectLabel)}</p>
    <hr>
    <p style="white-space:pre-wrap">${esc(msg.message)}</p>
    <hr>
    <p style="color:#666;font-size:12px">
      Sent from the contact form at ${esc(BUSINESS.url)}.
      Reply straight to this email to answer ${esc(msg.name)}.
    </p>`.trim();

  const text =
    `New enquiry from ${BUSINESS.name}\n\n` +
    `Name:  ${msg.name}\n` +
    `Email: ${msg.email}\n` +
    `Phone: ${msg.phone || "not given"}\n` +
    `About: ${msg.subjectLabel}\n\n${msg.message}\n`;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${BUSINESS.name} <${from}>`,
        to: [to],
        // Hitting reply in the inbox answers the buyer, not the robot.
        reply_to: msg.email,
        subject: `${msg.subjectLabel} — ${msg.name}`,
        html,
        text,
      }),
      // Never let a slow provider hold a visitor's submit open.
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      // Status only. The body can echo back the address we tried to mail.
      return { ok: false, reason: `resend-http-${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    const reason = err instanceof Error && err.name === "TimeoutError" ? "timeout" : "network";
    return { ok: false, reason };
  }
}

/** Fallback line shown to a visitor when delivery fails. */
export const CONTACT_FALLBACK = `We couldn't send that just now. Please call or text ${LINKS.phone}, or email ${LINKS.email} directly.`;

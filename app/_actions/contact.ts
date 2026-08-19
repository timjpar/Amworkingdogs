"use server";

import { headers } from "next/headers";
import {
  CONTACT_LIMITS,
  CONTACT_SUBJECT_VALUES,
} from "@/app/_config/contact";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  honeypot?: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

/**
 * Best-effort per-IP throttle.
 *
 * Deliberately modest expectations: on Vercel this Map lives in one serverless
 * instance, so a distributed flood routed across instances will slip past it.
 * It exists to blunt the naive case (one script hammering one warm instance)
 * and to keep an honest ceiling on invocations. The durable control is a
 * Vercel Firewall rate-limit rule on this route — see the README notes.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  // Opportunistic sweep so the Map can't grow without bound on a long-lived
  // instance. Cheap at this volume.
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

async function clientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export async function submitContact(data: ContactFormData): Promise<ActionResult> {
  // Bots that fill hidden fields get a success they can't distinguish from the
  // real thing, so there's no signal to tune against.
  if (data.honeypot) return { success: true };

  const name = data.name?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const phone = data.phone?.trim() ?? "";
  const subject = data.subject?.trim() ?? "";
  const message = data.message?.trim() ?? "";

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  // Length caps before anything else. Reject rather than truncate — silently
  // shortening someone's message would be worse than telling them.
  if (
    name.length > CONTACT_LIMITS.name ||
    email.length > CONTACT_LIMITS.email ||
    phone.length > CONTACT_LIMITS.phone ||
    message.length > CONTACT_LIMITS.message
  ) {
    return { success: false, error: "That's longer than we can accept. Please shorten it and try again." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // The <select> can be anything by the time it reaches here — this is a POST
  // endpoint, not a form. Pin it to the known set.
  const safeSubject = CONTACT_SUBJECT_VALUES.includes(subject) ? subject : "other";

  if (rateLimited(await clientIp())) {
    return {
      success: false,
      error: "Too many messages from this connection. Please try again shortly, or call or text instead.",
    };
  }

  // TODO: wire this to email delivery (Resend/SES) or a CRM webhook.
  //
  // Until that exists this action accepts the message and drops it — the form
  // still reports success to the sender. Nothing here logs the sender's name,
  // email, phone, or message body: runtime logs are retained and searchable,
  // and there is no reason to put someone's contact details in them.
  console.log("contact: submission received", {
    subject: safeSubject,
    hasPhone: Boolean(phone),
    messageLength: message.length,
    timestamp: new Date().toISOString(),
  });

  return { success: true };
}

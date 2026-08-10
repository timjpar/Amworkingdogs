"use server";

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

export async function submitContact(data: ContactFormData): Promise<ActionResult> {
  if (data.honeypot) return { success: true };

  const { name, email, phone, subject, message } = data;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { success: false, error: "Please fill in all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // TODO: wire this to email delivery (Resend/SES) or a CRM webhook.
  console.log("Contact form submission:", {
    name,
    email,
    phone,
    subject,
    message,
    timestamp: new Date().toISOString(),
  });

  return { success: true };
}

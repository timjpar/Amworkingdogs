/**
 * Shared contract for the contact form.
 *
 * Lives outside both the form and the server action because a `"use server"`
 * module may only export async functions — and because the allowlist and the
 * field limits have to be the *same* on the client that renders the form and
 * the action that validates it. The action is the real boundary: the form's
 * maxLength attributes are a courtesy to whoever is typing, nothing more.
 */

export const CONTACT_SUBJECTS = [
  { value: "puppy", label: "Puppy availability" },
  { value: "reserve", label: "Reserving a puppy" },
  { value: "visit", label: "Visiting the farm" },
  { value: "advice", label: "Guardian dog questions" },
  { value: "other", label: "Something else" },
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]["value"];

export const CONTACT_SUBJECT_VALUES: readonly string[] = CONTACT_SUBJECTS.map(
  (s) => s.value,
);

/** Upper bounds on each field. Anything longer is rejected, not truncated. */
export const CONTACT_LIMITS = {
  name: 100,
  email: 200,
  phone: 40,
  message: 4000,
} as const;

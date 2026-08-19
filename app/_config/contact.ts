/**
 * Shared contract for the contact form.
 *
 * Kept apart from the form itself so the subject allowlist and the field limits
 * have one home, shared by the markup that renders them and the submit helper
 * that enforces them. Since delivery now goes straight from the browser to
 * FormSubmit, there is no server-side boundary behind this: these caps keep an
 * honest form honest, and FormSubmit's own filtering handles the rest.
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

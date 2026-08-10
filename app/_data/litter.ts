/**
 * CURRENT LITTER — edit this file when the litter changes.
 *
 * Availability moves faster than anything else on the site, so it lives in one
 * place. `status` drives the badge and the headline on /puppies; the reserved
 * count drives the "X of Y spoken for" line. If you're between litters, set
 * status to "between" and the page copy adjusts on its own.
 */

export type LitterStatus = "available" | "expecting" | "between";

export const CURRENT_LITTER = {
  status: "available" as LitterStatus,
  /** Shown as-is. Keep it vague enough to stay true for a few weeks. */
  born: "Spring litter, on the ground now",
  /** Roughly when pups can go home. */
  readyDate: "Ready at eight weeks",
  totalPups: 8,
  reserved: 3,
  /** Anything worth saying about this specific litter. Leave "" to hide. */
  note: "Fawn coats with black masks, males and females both. Raised in the barn with the poultry.",
};

/** Everything that goes home with a puppy. */
export const includedWithPuppy = [
  "Health check before pickup",
  "Age-appropriate worming",
  "First vaccinations",
  "A written record of what's been done",
  "Feeding and transition instructions",
  "A bag of what they've been eating",
  "Phone support for as long as you have the dog",
];

/** How we pick which pup goes to which farm. */
export const matchingNotes = [
  {
    title: "We match, you choose",
    desc: "Tell us what you're guarding and how much ground. We'll point you toward the pups whose temperament suits it, and you pick from those.",
  },
  {
    title: "Sex matters less than you'd think",
    desc: "Males run bigger and tend to hold a wider perimeter; females often stay closer to the stock. Both work. Price is the same either way.",
  },
  {
    title: "Two is often better than one",
    desc: "On open ground with real pressure, a pair covers far more than one dog can. If you're taking two, say so early — we'll pick a pair that works together.",
  },
];

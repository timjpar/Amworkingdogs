/**
 * CURRENT LITTER — this is the file you edit as puppies come and go.
 *
 * Marking a puppy sold is a one-word change: set `status` to "reserved" or
 * "sold" on that entry. Everything downstream follows automatically — the
 * counts on /puppies, the "X of Y still open" line, the announcement banner,
 * and whether the card is greyed out. Nothing else needs touching.
 *
 * When the whole litter is gone, set LITTER.status to "between" (or
 * "expecting" if the next one is on the way) and the page rewrites itself.
 */

export type LitterStatus = "available" | "expecting" | "between";
export type PuppyStatus = "available" | "reserved" | "sold";
export type PuppySex = "Male" | "Female";

export interface Puppy {
  /** Collar color — how the family tells them apart. Doubles as the URL id. */
  id: string;
  name: string;
  sex: PuppySex;
  status: PuppyStatus;
  /** Hex for the little collar dot on the card. Match the real collar. */
  collar: string;
  image: string;
  /**
   * Optional one-liner shown on the card.
   *
   * ⚠️ REVIEW THESE BEFORE PUBLISHING. The notes below were drafted from the
   * photos alone — coat, markings, and build are observable, but anything
   * about temperament is a guess. Michael should correct or delete each one;
   * they read as promises to a buyer.
   */
  note?: string;
}

export const LITTER = {
  status: "available" as LitterStatus,
  /** Shown as-is — keep it vague enough to stay true for a few weeks. */
  born: "On the ground now",
  readyDate: "Ready to go home at eight weeks",
  note: "Fawn coats with black masks, males and females both. Whelped in the barn and raised with the poultry.",
};

const PUPPY_DIR = "/images/dogs/puppies";

/**
 * The pups, in collar order. Photos are the family's own — each already has
 * the collar name printed on it, which is how buyers refer to them by phone.
 */
export const puppies: Puppy[] = [
  {
    id: "aqua",
    name: "Aqua",
    sex: "Female",
    status: "available",
    collar: "#4fc3c3",
    image: `${PUPPY_DIR}/kangal-pyrenees-guardian-puppy-aqua-female.jpeg`,
    note: "Bold and busy — first one to the fence to meet you.",
  },
  {
    id: "rose",
    name: "Rose",
    sex: "Female",
    status: "available",
    collar: "#b7737f",
    image: `${PUPPY_DIR}/kangal-pyrenees-guardian-puppy-rose-female.jpeg`,
    note: "Square, heavy-boned, and steady on her feet.",
  },
  {
    id: "purple",
    name: "Purple",
    sex: "Female",
    status: "available",
    collar: "#7a3fb5",
    image: `${PUPPY_DIR}/kangal-pyrenees-guardian-puppy-purple-female.jpeg`,
    note: "Darkest mask of the litter and a real talker.",
  },
  {
    id: "champagne",
    name: "Champagne",
    sex: "Female",
    status: "available",
    collar: "#ddc9a3",
    image: `${PUPPY_DIR}/kangal-pyrenees-guardian-puppy-champagne-female.jpeg`,
    note: "Lighter sable coat, easy to handle, loves being fussed over.",
  },
  {
    id: "light-pink",
    name: "Light Pink",
    sex: "Female",
    status: "reserved",
    collar: "#f2a8bb",
    image: `${PUPPY_DIR}/kangal-pyrenees-guardian-puppy-light-pink-female.jpeg`,
    note: "Palest coat here, with four white socks.",
  },
  {
    id: "hot-pink",
    name: "Hot Pink",
    sex: "Female",
    status: "available",
    collar: "#e8456f",
    image: `${PUPPY_DIR}/kangal-pyrenees-guardian-puppy-hot-pink-female.jpeg`,
    note: "Calm one. Happy to sit in your lap and watch the birds.",
  },
  {
    id: "lavender",
    name: "Lavender",
    sex: "Female",
    status: "available",
    collar: "#b3a0d6",
    image: `${PUPPY_DIR}/kangal-pyrenees-guardian-puppy-lavender-female.jpeg`,
    note: "Thickest coat of the girls — built for winter out with the stock.",
  },
  {
    id: "blue",
    name: "Blue",
    sex: "Male",
    status: "available",
    collar: "#1f4e9c",
    image: `${PUPPY_DIR}/kangal-pyrenees-guardian-puppy-blue-male.jpeg`,
    note: "The runt, and all the scrappier for it. Eating well and keeping up fine.",
  },
  {
    id: "light-blue",
    name: "Light Blue",
    sex: "Male",
    status: "available",
    collar: "#87bde3",
    image: `${PUPPY_DIR}/kangal-pyrenees-guardian-puppy-light-blue-male.jpeg`,
    note: "Big, easygoing, and already the size of two of his sisters.",
  },
  {
    id: "lime",
    name: "Lime",
    sex: "Male",
    status: "available",
    collar: "#8ec63f",
    image: `${PUPPY_DIR}/kangal-pyrenees-guardian-puppy-lime-male.jpeg`,
    note: "Classic fawn coat and black mask. Watches everything before he moves.",
  },
  {
    id: "forest-green",
    name: "Forest Green",
    sex: "Male",
    status: "available",
    collar: "#2d5a3d",
    image: `${PUPPY_DIR}/kangal-pyrenees-guardian-puppy-forest-green-male.jpeg`,
    note: "Curled tail, light mask, and never stops moving.",
  },
  {
    id: "red",
    name: "Red",
    sex: "Male",
    status: "reserved",
    collar: "#d62828",
    image: `${PUPPY_DIR}/kangal-pyrenees-guardian-puppy-red-male.jpeg`,
    note: "Heaviest bone in the litter. Going to be a big dog.",
  },
  {
    id: "chocolate",
    name: "Chocolate",
    sex: "Male",
    status: "reserved",
    collar: "#5c3a21",
    image: `${PUPPY_DIR}/kangal-pyrenees-guardian-puppy-chocolate-male.jpeg`,
    note: "Softest temperament of the boys — the one that leans on you.",
  },
];

/** Counts derived from the roster, so they can never drift out of sync. */
export const litterCounts = {
  total: puppies.length,
  available: puppies.filter((p) => p.status === "available").length,
  reserved: puppies.filter((p) => p.status === "reserved").length,
  sold: puppies.filter((p) => p.status === "sold").length,
  get spokenFor() {
    return this.reserved + this.sold;
  },
  males: puppies.filter((p) => p.sex === "Male").length,
  females: puppies.filter((p) => p.sex === "Female").length,
};

/** Available first — nobody wants to scroll past sold pups to find one. */
export const puppiesByAvailability = [...puppies].sort((a, b) => {
  const rank: Record<PuppyStatus, number> = { available: 0, reserved: 1, sold: 2 };
  return rank[a.status] - rank[b.status];
});

export const STATUS_LABEL: Record<PuppyStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
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

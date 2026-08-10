import type { ParentBreed } from "@/app/_types";

/**
 * The cross we raise and the two parent breeds behind it.
 * Ratio and price come from the AMRabbits guardian-dog page; keep them in sync
 * with app/_config/business.ts (PUPPY_PRICE).
 */

export const CROSS = {
  name: "Kangal x Great Pyrenees",
  ratio: "75% Kangal · 25% Great Pyrenees",
  kangalShare: 75,
  pyreneesShare: 25,
  summary:
    "That cross gives you the size, courage, and protective drive of the Kangal with the steady, attentive temperament of the Great Pyrenees. They make great guard dogs and livestock dogs both — bonded to their flock, wary of predators, and gentle with the animals and people they protect.",
} as const;

export const parentBreeds: ParentBreed[] = [
  {
    id: "kangal",
    name: "Kangal",
    share: "75% of the cross",
    origin: "Sivas Province, Türkiye",
    tagline: "The muscle and the nerve.",
    description:
      "The Kangal is Türkiye's national dog and one of the most respected guardian breeds in the world — bred for centuries to hold off wolves and bears on open Anatolian range. It is a deterrent first and a fighter last: enormous, fast for its size, and confident enough that most predators leave rather than test it. The fawn coat with a black mask is the classic Kangal signature, and it comes through strongly in our pups.",
    traits: [
      "Powerful, athletic build",
      "Calm until there's a reason not to be",
      "Independent decision-maker",
      "Patrols a wide perimeter",
      "Fawn coat, black mask",
    ],
    weight: "90–145 lb",
    height: "28–32 in at the shoulder",
    imageSrc: "/images/dogs/kangal-pyrenees-guardian-adult-dog-standing.jpeg",
    imageAlt:
      "Adult Kangal x Great Pyrenees livestock guardian dog with a black mask standing in the field",
  },
  {
    id: "great-pyrenees",
    name: "Great Pyrenees",
    share: "25% of the cross",
    origin: "Pyrenees Mountains, France & Spain",
    tagline: "The patience and the good sense.",
    description:
      "The Great Pyrenees has guarded mountain flocks for a thousand years and brings the softer half of the equation: nurturing with young stock, tolerant of handling, and famously trustworthy around children. Pyrenees are attentive nighttime workers who prefer to warn rather than engage. That quarter of Pyr blood is what makes these dogs livable — a working guardian your family can also walk up to.",
    traits: [
      "Gentle with lambs, kids, and poultry",
      "Warns early, escalates slowly",
      "Thick weather-proof coat",
      "Works the night shift",
      "Deeply bonded to its charges",
    ],
    weight: "85–115 lb",
    height: "25–32 in at the shoulder",
    imageSrc: "/images/dogs/kangal-pyrenees-guardian-dogs-pair-pasture.jpeg",
    imageAlt: "Pair of Kangal x Great Pyrenees guardian dogs out on pasture",
  },
];

/** What the cross is actually good at, shown as the "built for" grid. */
export const suitedFor = [
  {
    icon: "🐑",
    title: "Sheep & Goats",
    desc: "The classic job. A bonded pair will hold a perimeter around a grazing flock day and night without being told to.",
  },
  {
    icon: "🐔",
    title: "Poultry Flocks",
    desc: "Ours grow up around chickens, ducks, and quail from the day their eyes open — hawks, foxes, and coons are the whole point.",
  },
  {
    icon: "🐄",
    title: "Cattle & Larger Stock",
    desc: "Calving season draws predators. A guardian that lives with the herd is there at 3 a.m. when you aren't.",
  },
  {
    icon: "🏡",
    title: "Homestead & Property",
    desc: "Big, visible, and territorial in the right way. Most trouble turns around at the fence line before anything happens.",
  },
];

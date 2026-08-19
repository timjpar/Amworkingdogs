import { puppies } from "@/app/_data/litter";

export type GalleryImage = {
  src: string;
  alt: string;
  /**
   * Pre-built srcset for photos hosted somewhere that already publishes fixed
   * sizes (the Flickr album). When present, GalleryGrid renders a plain <img>
   * pointing at that host instead of routing the photo through next/image —
   * no image transformation is billed and no bytes come off our own origin.
   */
  srcSet?: string;
  /** Link back to the photo's page on its host, where one exists. */
  href?: string;
};

/**
 * Portraits of the current litter, derived from the roster so a new litter
 * only has to be entered once (in litter.ts) to show up here too.
 */
export const litterPortraits: GalleryImage[] = puppies.map((p) => ({
  src: p.image,
  alt: `${p.name} — ${p.sex.toLowerCase()} Kangal x Great Pyrenees livestock guardian puppy`,
}));

/** Adults at work — used on the breed page and the front of the gallery. */
export const adultPhotos: GalleryImage[] = [
  {
    src: "/images/dogs/kangal-pyrenees-guardian-adult-dog-standing.jpeg",
    alt: "Adult Kangal x Great Pyrenees livestock guardian dog with a black mask standing in the field",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-adult-dog-sitting.jpeg",
    alt: "Adult Kangal x Great Pyrenees livestock guardian dog sitting in the grass",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-dogs-pair-pasture.jpeg",
    alt: "Pair of Kangal x Great Pyrenees guardian dogs working a pasture together",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-dogs-fence-line.jpeg",
    alt: "Kangal x Great Pyrenees guardian dogs walking the fence line",
  },
  {
    src: "/images/dogs/kangal-pyrenees-livestock-guardian-dogs-pack.jpeg",
    alt: "Group of Kangal x Great Pyrenees livestock guardian dogs on the homestead",
  },
  {
    src: "/images/dogs/kangal-pyrenees-livestock-guardian-dog.jpeg",
    alt: "Kangal x Great Pyrenees livestock guardian dog on watch",
  },
  {
    src: "/images/dogs/livestock-guardian-dog-pasture-sunset.jpeg",
    alt: "Livestock guardian dog standing watch over pasture at sunset",
  },
  {
    src: "/images/dogs/livestock-guardian-dogs-anatolian-pair.jpeg",
    alt: "Pair of Anatolian-type livestock guardian dogs resting together",
  },
  {
    src: "/images/dogs/anatolian-shepherd-livestock-guardian-dog.jpeg",
    alt: "Anatolian shepherd type livestock guardian dog in the pasture",
  },
];

/** Puppies — current and past litters. */
export const puppyPhotos: GalleryImage[] = [
  {
    src: "/images/dogs/kangal-pyrenees-guardian-puppy-standing-tall-grass.jpeg",
    alt: "Fawn Kangal x Great Pyrenees guardian puppy with a black mask standing in the grass",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-dog-puppy-portrait.jpeg",
    alt: "Portrait of a Kangal x Great Pyrenees guardian puppy",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-dog-sitting.jpeg",
    alt: "Kangal x Great Pyrenees guardian puppy sitting in the yard",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-puppy-lilac-collar-walking.jpeg",
    alt: "Kangal x Great Pyrenees guardian puppy in a lilac collar walking through the grass",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-puppy-purple-collar-panting.jpeg",
    alt: "Kangal x Great Pyrenees guardian puppy in a purple collar panting beside the fence",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-puppy-white-collar-sitting.jpeg",
    alt: "Kangal x Great Pyrenees guardian puppy in a white collar sitting along the fence line",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-puppy-red-collar-greeting-hand.jpeg",
    alt: "Kangal x Great Pyrenees guardian puppy in a red collar greeting an outstretched hand",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-puppies-pair.jpeg",
    alt: "Two Kangal x Great Pyrenees guardian puppies together outdoors",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-puppy-held-newport-tn.jpeg",
    alt: "Kangal x Great Pyrenees guardian puppy being held in Newport, Tennessee",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-newborn-puppy-in-hand.jpeg",
    alt: "Days-old Kangal x Great Pyrenees guardian puppy cradled in a hand",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-newborn-puppies.jpeg",
    alt: "Newborn Kangal x Great Pyrenees guardian puppies",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-puppies-huddled-straw.jpeg",
    alt: "Kangal x Great Pyrenees guardian puppies huddled together in the straw",
  },
  {
    src: "/images/dogs/kangal-pyrenees-guardian-puppies-nest-straw.jpeg",
    alt: "Kangal x Great Pyrenees guardian puppies nestled in their straw nest",
  },
];

/** Everything, newest-feeling first — used on the gallery page. */
export const allPhotos: GalleryImage[] = [
  ...litterPortraits,
  ...puppyPhotos,
  ...adultPhotos,
];

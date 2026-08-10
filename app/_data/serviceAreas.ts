import type { ServiceArea } from "@/app/_types";

/**
 * Local-SEO landing pages at /guardian-dogs-for-sale/[area].
 * Keep the copy genuinely area-specific — thin duplicated pages get filtered.
 */

export const serviceAreas: ServiceArea[] = [
  {
    slug: "east-tennessee",
    name: "East Tennessee",
    headline: "Livestock Guardian Dogs for East Tennessee Farms",
    intro:
      "We're in Cocke County, which puts us inside an easy morning's drive of most of East Tennessee. Between the coyote pressure in the river bottoms and the bears working the ridges, guardian dogs earn their keep here — and a pup raised in this climate on this kind of ground doesn't have to adjust to anything when it gets to your place.",
    nearby: [
      "Newport",
      "Sevierville",
      "Morristown",
      "Dandridge",
      "Greeneville",
      "Knoxville",
      "Maryville",
    ],
    driveTime: "Most of the region is within 90 minutes of the farm.",
  },
  {
    slug: "tennessee",
    name: "Tennessee",
    headline: "Kangal x Great Pyrenees Puppies for Sale in Tennessee",
    intro:
      "Guardian dogs from our homestead have gone to farms across Tennessee — poultry flocks in the middle of the state, goat herds on the plateau, and cattle operations out west. Buyers usually make the drive to Newport to pick up, which we prefer, but we can point you toward ground transport if the distance doesn't work.",
    nearby: [
      "Knoxville",
      "Chattanooga",
      "Cookeville",
      "Crossville",
      "Nashville",
      "Murfreesboro",
      "Tri-Cities",
    ],
    driveTime: "Farm pickup in Newport; transport available for longer hauls.",
  },
  {
    slug: "western-north-carolina",
    name: "Western North Carolina",
    headline: "Guardian Dogs for Western North Carolina Homesteads",
    intro:
      "We're about an hour and a half from Asheville over the mountain, and a good number of our pups end up on smallholdings in the North Carolina high country. Steep ground, heavy bear and coyote traffic, and stock scattered across pasture is exactly the situation this cross was built for.",
    nearby: [
      "Asheville",
      "Waynesville",
      "Hot Springs",
      "Marshall",
      "Burnsville",
      "Hendersonville",
      "Boone",
    ],
    driveTime: "Roughly 90 minutes from Asheville to the farm.",
  },
  {
    slug: "smoky-mountains",
    name: "the Smoky Mountains",
    headline: "Livestock Guardian Dogs in the Smoky Mountains",
    intro:
      "Farming at the edge of the park means sharing ground with everything that lives in it. Bear, coyote, bobcat, and free-roaming dogs all come through, and a guardian that sleeps with the stock is the only thing that's out there at three in the morning. Our dogs are raised in these foothills and work this terrain.",
    nearby: [
      "Newport",
      "Cosby",
      "Gatlinburg",
      "Pigeon Forge",
      "Townsend",
      "Del Rio",
      "Hartford",
    ],
    driveTime: "We're right in the foothills — most of this area is under an hour.",
  },
];

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

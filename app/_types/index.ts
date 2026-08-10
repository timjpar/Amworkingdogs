export type ThemeName = "ridgeline" | "pasture" | "clay" | "nightwatch";

export interface ThemeOption {
  id: ThemeName;
  label: string;
  swatch: string;
  swatchAlt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** A section of the care & training guide. */
export interface CareSection {
  title: string;
  content: string;
  tips: string[];
}

/** One of the parent breeds behind our cross. */
export interface ParentBreed {
  id: string;
  name: string;
  share: string;
  origin: string;
  tagline: string;
  description: string;
  traits: string[];
  weight: string;
  height: string;
  imageSrc: string;
  imageAlt: string;
}

/** A geographic area we sell and deliver into. */
export interface ServiceArea {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  nearby: string[];
  driveTime: string;
}

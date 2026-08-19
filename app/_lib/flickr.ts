import type { GalleryImage } from "@/app/_data/gallery";

/**
 * Pulls the puppy gallery from a public Flickr album, so the photos can be
 * changed by adding or removing them in Flickr — no code change, no deploy.
 *
 * Uses Flickr's public photoset feed, which needs no API key and no account
 * secret. The album must stay public for this to work; if it's made private
 * the feed returns nothing and the page falls back to the bundled photos.
 *
 * The images are served straight from Flickr's CDN rather than through
 * next/image on purpose. Flickr already publishes each photo at fixed sizes,
 * so routing them through the optimizer would cost a billed transformation and
 * Vercel bandwidth for pixels Flickr is willing to serve for free.
 */

/** Album to read. Swap these two values to point at a different album. */
export const FLICKR_ALBUM = {
  nsid: "204629165@N05",
  setId: "72177720334627262",
} as const;

/**
 * Flickr size suffixes, smallest first, with their longest edge in px.
 * Deliberately stops at `_b` (1024): `_h`, `_k` and `_o` return HTTP 410 for
 * this account, so asking for them would produce broken images.
 */
const SIZES = [
  { suffix: "n", w: 240 },
  { suffix: "w", w: 300 },
  { suffix: "z", w: 480 },
  { suffix: "c", w: 600 },
  { suffix: "b", w: 768 },
] as const;

interface FeedItem {
  title?: string;
  link?: string;
  media?: { m?: string };
}

/** `…/55454135345_39084bf7c5_m.jpg` -> `…/55454135345_39084bf7c5` */
function baseUrl(mediaM: string): string | null {
  const m = mediaM.match(/^(https:\/\/live\.staticflickr\.com\/\S+?)_[a-z0-9]+\.jpg$/i);
  return m ? m[1] : null;
}

export async function fetchFlickrPuppyPhotos(): Promise<GalleryImage[]> {
  const url =
    `https://api.flickr.com/services/feeds/photoset.gne` +
    `?set=${FLICKR_ALBUM.setId}&nsid=${FLICKR_ALBUM.nsid}` +
    `&format=json&nojsoncallback=1`;

  let items: FeedItem[];
  try {
    // Re-read at most hourly. The page stays prerendered and CDN-cached; a new
    // photo in the album shows up within the hour without a deploy.
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { items?: FeedItem[] };
    items = data.items ?? [];
  } catch {
    // Flickr unreachable at build or revalidate time. Returning empty lets the
    // caller fall back to the bundled photos rather than failing the build.
    return [];
  }

  return items.flatMap((item, i) => {
    const media = item.media?.m;
    if (!media) return [];
    const base = baseUrl(media);
    if (!base) return [];

    // Album titles are blank, so fall back to alt text in the same voice as the
    // rest of the site rather than leaving it empty.
    const title = item.title?.trim();
    const alt = title
      ? title
      : `Kangal x Great Pyrenees livestock guardian puppy on the homestead in Newport, Tennessee (${i + 1})`;

    return [
      {
        src: `${base}_b.jpg`,
        alt,
        srcSet: SIZES.map((s) => `${base}_${s.suffix}.jpg ${s.w}w`).join(", "),
        href: item.link,
      },
    ];
  });
}

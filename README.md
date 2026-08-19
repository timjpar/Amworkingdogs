# AM Working Dogs

Marketing site for the Kangal x Great Pyrenees livestock guardian dogs raised in
Newport, Tennessee. Built with Next.js 16 (App Router) + Tailwind v4, following the
same structure and component conventions as the sibling site, `amrabbits`.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (all routes prerender static)
npm run lint
```

## The files you'll actually edit

Everything that changes often lives in `app/_data/` and `app/_config/` — no JSX
required.

| What | Where |
| --- | --- |
| **The puppy roster** (who's available, sold, notes) | `app/_data/litter.ts` |
| Puppy price, deposit | `app/_config/business.ts` (`PUPPY_PRICE`, `DEPOSIT`) |
| Phone, email, socials, payment links | `app/_config/links.ts` |
| Business name, address, service areas | `app/_config/business.ts` |
| FAQ questions and answers | `app/_data/faq.ts` |
| Care & training guide | `app/_data/care.ts` |
| Breed copy, the 75/25 ratio, "built for" grid | `app/_data/breed.ts` |
| Photo lists (puppies / adults) | `app/_data/gallery.ts` |
| Local-SEO area pages | `app/_data/serviceAreas.ts` |

### Updating the litter

Everything about the current puppies lives in `app/_data/litter.ts`.

**Marking a puppy sold** is a one-word change on that puppy's entry:

```ts
{ id: "red", name: "Red", sex: "Male", status: "sold", ... }
```

`status` can be `"available"`, `"reserved"`, or `"sold"`. Sold and reserved pups
drop to the bottom of the grid and grey out automatically. Every count on the
site is derived from the roster — the "still available" number, the F/M split,
the litter size, and the sitewide announcement banner — so they can't drift out
of sync with each other. There is no second place to update.

**Starting a new litter:** replace the `puppies` array, and set `LITTER.status`
to `"available"`, `"expecting"`, or `"between"`. Between litters, the `/puppies`
page hides the roster and rewrites its own headline. Portraits flow into the
gallery automatically — no need to touch `gallery.ts`.

**A note on the per-puppy `note` field.** These describe individual animals to
buyers, so they should be accurate. The ones currently in the file were drafted
from the photos alone: coat, markings, and build are observable, but anything
about temperament is a guess and needs correcting or deleting.

### Adding photos

Drop files in `public/images/dogs/`, then add `{ src, alt }` entries to
`app/_data/gallery.ts`. Write real alt text; it's read by screen readers and
carries SEO weight.

**Landscape photos only for page banners.** `PageHero` crops to roughly 2.5:1, so a
portrait shot becomes an unusable sliver of the subject. Use `imagePosition` to
adjust the crop (`"center 35%"` favors the top of the frame).

## Structure

```
app/
  _actions/     server actions (contact form)
  _components/  ui/, nav/, forms/, theme/, seo/
  _config/      business identity + outbound links
  _data/        all editable content
  _lib/         schema.org JSON-LD builders
  _types/       shared types
```

Routes: `/`, `/about`, `/contact`, `/puppies`, `/reserve`, `/dogs/{breed,working,care,faq,gallery}`,
`/buying/{process,policy,transport}`, `/guardian-dogs-for-sale/[area]`.

## Theming

Four themes — `ridgeline` (default), `pasture`, `clay`, `nightwatch` (dark) — defined
as CSS custom properties in `app/globals.css` and switchable via the floating button.
The choice persists in `localStorage` under `awd-theme`, and an inline script in
`app/layout.tsx` applies it before hydration so there's no color flash.

Always style from the semantic tokens (`var(--c-brand)`, `var(--c-ink)`, `var(--c-panel)`…)
rather than hard-coded hex, or the themes will break.

## Deploying (Vercel)

The project is a stock Next.js app — Vercel auto-detects the framework, and no
build configuration is needed. Import the GitHub repo at
[vercel.com/new](https://vercel.com/new) and every push to `main` deploys.

### Domains

The main domain is **`easttnfarmdogs.com`**. Everything else 308s to it, path and
query intact, so old links and anything already indexed keep working:

| Hostname | Role |
| --- | --- |
| `easttnfarmdogs.com` | production domain |
| `www.easttnfarmdogs.com` | 308 → `easttnfarmdogs.com` |
| `amworkingdogs.com` | 308 → `easttnfarmdogs.com` (the original domain) |
| `www.amworkingdogs.com` | 308 → `easttnfarmdogs.com` |

**Those redirects are configured on the project's domains in Vercel, not in this
repo.** Vercel resolves them at the edge before the request reaches a deployment,
which is why they cost nothing to serve and why there is deliberately no matching
rule in `next.config.ts` — one would never execute. Vercel's model has no separate
"production domain" flag: the production domain is simply the one with no redirect
set, and every other hostname points at it.

What the repo *does* own is what the site claims its address is — `PRIMARY_ORIGIN`
in `app/_config/business.ts`, which drives canonicals, the sitemap, `robots.txt`,
OG image URLs, and the JSON-LD ids. Vercel does not do that for you. Changing the
main domain means editing that constant **and** repointing the redirects in Vercel.

### Site URL

`SITE_URL` (in `app/_config/business.ts`) drives canonicals, `sitemap.xml`,
`robots.txt`, OG image URLs, and the JSON-LD ids. It resolves in this order:

1. `NEXT_PUBLIC_SITE_URL` — escape hatch, pins an exact origin.
2. `PRIMARY_ORIGIN` on any deploy running on Vercel.
3. `http://localhost:3000` for local dev — including `npm run start` against a
   local production build, so a local smoke test never advertises the live domain.

So **you don't have to set anything** to deploy correctly, and every deploy —
production or preview — canonicalizes to the main domain rather than to whatever
hostname it happens to be reachable at.

Because every page is statically prerendered, this value is baked in at build
time: after changing the domain, redeploy so the sitemap and canonicals pick it up.

## Before going live

- [ ] Attach `easttnfarmdogs.com` in Vercel (Project → Settings → Domains), set it
      as the production domain, keep `amworkingdogs.com` attached so its redirect
      still resolves, then redeploy.
- [ ] Set up a dedicated email/phone if the dogs shouldn't share AMRabbits' contact info.
- [ ] **Activate the contact form with FormSubmit.** The form posts from the
      visitor's browser to `formsubmit.co` (see `app/_lib/submitForm.ts`), with
      `LINKS.email` as the destination — no API key, account, or DNS to set up.
      FormSubmit scopes activation to *email plus origin*, so the first
      submission from the live domain sends a confirmation email to that
      address that has to be clicked before anything delivers. Being active on
      amrabbits.com does not carry over. This cannot be exercised from
      localhost.
- [ ] Add the Google Search Console token to `GOOGLE_SITE_VERIFICATION`.
- [ ] Confirm the health-guarantee wording in `app/buying/policy/page.tsx` matches
      what Michael actually offers. It was drafted as a reasonable default.
- [ ] **Set the real status on each puppy** in `app/_data/litter.ts`. All 13 are
      currently marked `"available"` because no sales status was known — correct any
      that are already reserved or sold.
- [ ] **Review the per-puppy notes.** The temperament lines were inferred from the
      photos, not observed. They read as promises to a buyer.

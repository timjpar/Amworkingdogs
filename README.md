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
| **Current litter** (status, counts, ready date) | `app/_data/litter.ts` |
| Puppy price, deposit | `app/_config/business.ts` (`PUPPY_PRICE`, `DEPOSIT`) |
| Phone, email, socials, payment links | `app/_config/links.ts` |
| Business name, address, service areas | `app/_config/business.ts` |
| FAQ questions and answers | `app/_data/faq.ts` |
| Care & training guide | `app/_data/care.ts` |
| Breed copy, the 75/25 ratio, "built for" grid | `app/_data/breed.ts` |
| Photo lists (puppies / adults) | `app/_data/gallery.ts` |
| Local-SEO area pages | `app/_data/serviceAreas.ts` |

### Updating the litter

`app/_data/litter.ts` drives three things at once: the `/puppies` page headline,
the reserved/open count, and the sitewide announcement banner. Set `status` to
`"available"`, `"expecting"`, or `"between"` and the wording changes everywhere —
the banner can't drift out of sync with the page.

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

## Before going live

- [ ] Point `SITE_URL` in `app/_config/business.ts` at the real domain (currently
      `https://amworkingdogs.com`) — it feeds canonicals, the sitemap, and JSON-LD.
- [ ] Set up a dedicated email/phone if the dogs shouldn't share AMRabbits' contact info.
- [ ] Wire up the contact form. `app/_actions/contact.ts` currently validates and
      logs to the server console — it does **not** deliver mail yet. Add Resend/SES
      or a webhook there.
- [ ] Add the Google Search Console token to `GOOGLE_SITE_VERIFICATION`.
- [ ] Confirm the health-guarantee wording in `app/buying/policy/page.tsx` matches
      what Michael actually offers. It was drafted as a reasonable default.
- [ ] Replace the placeholder litter details in `app/_data/litter.ts` with the real
      counts and dates.

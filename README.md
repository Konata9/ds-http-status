# DeepSeek-chan HTTP Field Guide

An unofficial bilingual illustrated reference to nineteen HTTP status codes across all five classes: 100, 200, 302, 304, 400, 401, 402, 403, 404, 408, 409, 413, 414, 418, 429, 451, 500, 502, and 503.

- English: `/`
- Chinese: `/zh/`
- Status entries: `/status/{code}/`
- Short page URL: `/{code}` (301 to `/status/{code}/`)
- Image URL: `/{code}.png` (the source assets are PNG)
- JPEG alias: `/{code}.jpg`
- Illustrations: Fatal1tyV (Xiaohongshu), with thanks. See `/about/`.

Built with Astro 7, TypeScript, `astro:assets`, and plain CSS tokens. Static HTML, no client-side framework, no third-party fonts. Google Analytics 4 provides aggregate traffic measurement; it may set cookies.

## Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # astro check
npm test           # Vitest data and URL checks
npm run build      # static output in dist/
npm run preview    # preview the production build
npm run qa         # check + test + build
npm run qa:visual  # screenshots of four pages; run preview first
```

## Deployment: Cloudflare Pages

1. Create a Pages project connected to this repository.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Environment variables:
   - `SITE_URL`: the production origin, no trailing slash, for example `https://http.example.com`
   - `BASE_PATH`: `/` for a root domain
   - `NODE_VERSION`: `24` (Astro 7 requires Node `>=22.23.4`)
5. Rebuild after changing the domain. Canonical URLs, Open Graph URLs, `robots.txt`, `sitemap-index.xml`, `llms.txt`, and JSON data are generated from `SITE_URL` at build time.
6. `_redirects` is generated during `astro build` from the status pages that were actually emitted. It is not a hand-maintained file.

The default `SITE_URL` is `https://ds-http-status.konata9.cc`. Change it if the domain changes.

The project also supports a subpath (for example GitHub Pages) through `BASE_PATH=/repo-name/`; internal links use Astro's base path.

## Content

All entries live in `src/data/statuses.ts`. Each entry carries:

- code, plate number, reason phrase, Chinese name, status class
- image and localized alt text
- a one-line card caption, a short summary for metadata/JSON, and a detail lead
- what it means, when it happens, server-side fixes, visitor-side fixes
- RFC section, cacheability, common headers, related entries, sources

Adding a status code:

1. Put a cleaned square image at `src/assets/status/{code}.png`.
2. Add the entry to `src/data/statuses.ts`.
3. Add any new copy in both `en` and `zh`.
4. Run `npm run qa`. The build emits the page, the JSON endpoint, the PNG/JPG endpoints, the sitemap entry, and the four short-link redirects from that single entry.

The home page, detail routes, sitemap, image sitemap, `llms.txt`, `llms-full.txt`, `status.json`, and `/{code}.png` all read from the same data. `/{code}.jpg` remains as a JPEG alias. Shared URL construction lives in `src/lib/statusUrls.ts`; shared static paths live in `src/lib/statusRoutes.ts`.

### Illustrations and watermark removal

The cleaned PNGs in `src/assets/status/` are the versions used by the site. The watermarked originals live in `originals/` and are gitignored.

`scripts/remove_watermarks.py` derives a mask from the 414 plate and inpaints the watermark on the illustrations. It is a one-time asset script, not part of the build. Pass no arguments to process all nineteen images, or a list of codes to process only those:

```bash
# One-time environment
uv venv /tmp/wm-venv --python 3.12
uv pip install --python /tmp/wm-venv/bin/python opencv-python-headless numpy

# Run from the repository root — all images, or a selected list
/tmp/wm-venv/bin/python scripts/remove_watermarks.py
/tmp/wm-venv/bin/python scripts/remove_watermarks.py 100 401 451
```

Preview crops are written to `tmp/watermark-check/`. Check the corner crops and the 560px contact sheet before replacing the cleaned assets. The 429 plate has a very small area of paper texture under the watermark; it is invisible at display size.

The illustrations belong to Fatal1tyV. Do not reuse them without the illustrator's permission. The site credit and thank-you are on the About page.

## SEO / GEO surfaces

| File | Purpose |
| --- | --- |
| `sitemap-index.xml` / `sitemap-0.xml` | All 42 HTML pages, hreflang links, image entries |
| `robots.txt` | Allows all crawlers, points to the sitemap |
| `llms.txt` | Compact bilingual index for AI crawlers |
| `llms-full.txt` | Full definitions and fixes in both languages |
| `status.json` | All entries as JSON |
| `status/{code}.json` | One entry as JSON |
| `{code}` / `{code}/` | 301 alias to `/status/{code}/` |
| `{code}.png` | Direct 1254×1254 PNG for social previews and direct use |
| `{code}.jpg` | JPEG alias for http.cat-style usage |

Every HTML page includes a canonical URL, `en` / `zh-CN` / `x-default` alternates, Open Graph and Twitter metadata, and JSON-LD:

- home: `CollectionPage` + `ItemList` + `WebSite`
- status entries: `DefinedTerm` + `DefinedTermSet` + `WebPage` + `BreadcrumbList` + `ImageObject`
- About: `AboutPage`

## Quality checks

- `npm run check`: 0 errors, 0 warnings.
- `npm test`: data integrity and shared URL tests pass.
- `npm run qa:visual`: writes 1440px and 390px screenshots for the English and Chinese home and detail pages to `tmp/shots/`.
- Hallmark `sloplint` on the English and Chinese home pages: 0 FAIL, 1 REFLEX (44c, waived: the catalogue is the hero), 1 WARN (77, dismissed: the grid is a nineteen-plate catalogue, not a landing strip).
- Lighthouse on the home page: 99 performance, 100 accessibility, 100 best practices, 100 SEO. LCP 2.0s, CLS 0.
- Lighthouse on `/status/404/`: 100 across all four categories. LCP 1.5–1.7s, CLS 0.
- Responsive checks at 320, 390, 768, 1280, 1440 and 1920 pixels, in both languages.

## Structure

```
src/
  assets/status/        cleaned square illustrations
  components/           layout pieces, page bodies and the GA4 tag
  data/analytics.ts     GA4 measurement ID
  data/statuses.ts      the single content source
  data/references.ts    shared RFC and MDN links
  data/site.ts          site identity and base-aware path helpers
  i18n/ui.ts            English and Chinese interface strings
  layouts/BaseLayout.astro
  lib/seo.ts            metadata and JSON-LD builders
  lib/statusData.ts     JSON envelope and serialization
  lib/statusImage.ts    PNG/JPG response builder
  lib/statusRoutes.ts   shared static paths
  lib/statusUrls.ts     one source for page, short, image and JSON URLs
  pages/                routes and SEO/GEO endpoints
  styles/global.css     Hallmark stamp, tokens, base, layout
tests/
  status.test.ts        data integrity and URL contract
scripts/
  remove_watermarks.py  one-time asset preparation
  visual-qa.mjs         desktop/mobile screenshots from a running preview
public/
  favicon.svg, apple-touch-icon.png, manifest.webmanifest, _headers
design.md               locked design system, scope notes and waivers
```

## Credits

- Illustrations: **Fatal1tyV** on Xiaohongshu — https://www.xiaohongshu.com/user/profile/691f24b6000000003702fdbd
- Definitions checked against RFC 9110, RFC 6585, RFC 2324, and MDN Web Docs.
- Built and maintained by Konata9 — https://github.com/Konata9

This is an unofficial fan project. It is not affiliated with DeepSeek.

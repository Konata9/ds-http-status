# Design system: DeepSeek-chan HTTP Field Guide

## The idea

A printed field guide for nineteen HTTP status codes. The illustrations are the plates; the page is the paper, rules, captions and a small developer margin. The design is deliberately more archival than a typical fan site: warm stock, a high-contrast serif, one ink-blue signal, square rules, no depth.

- **Genre:** editorial
- **Shape:** Catalogue. Opening, nineteen plates, five families, colophon.
- **Hallmark theme:** Specimen (deal 2/3), adapted with Kami's parchment and serif body.
- **Signature:** the nineteen plates. The hero's use note is the functional margin, not a second headline.
- **One idea per screen:** the opening states the guide and how to use it; the grid is the inventory; the family blocks are the taxonomy.

## Tokens

The single source of truth is `src/styles/global.css`. Do not introduce literal colours or font families outside `:root`.

| Token | Value | Use |
| --- | --- | --- |
| `--color-paper` | `oklch(96.5% 0.016 82)` | page stock |
| `--color-paper-2` | `oklch(93.5% 0.02 80)` | footer band |
| `--color-ink` | `oklch(17% 0.012 60)` | text and display |
| `--color-muted` | `oklch(49% 0.014 65)` | captions and metadata |
| `--color-rule` | `oklch(80% 0.018 75)` | hairlines |
| `--color-rule-2` | `oklch(66% 0.02 72)` | strong rules |
| `--color-accent` | `oklch(45% 0.15 264)` | links, focus, current code |
| `--color-focus` | `oklch(50% 0.18 264)` | focus ring |

Rules: `1px` hairlines, `2px` section rules, no shadows, no card borders, no radius on surfaces. The only radius is `0`.

## Type

- **Display:** system UI stack, led by Avenir Next on macOS and Segoe UI on Windows, letter-spacing `-0.02em`. CJK falls to PingFang SC / Microsoft YaHei UI. Chinese hero maxes at `5rem` so its two lines fit the 8-column measure.
- **Body and labels:** the same system UI stack at 400/500. Labels are sentence case, never tracked capitals. Nav is `16px/500`; plate reasons `17–19px/500`; captions `16px`; the direct-use panel is `20px/500` title, `15px/500` labels, `16px` mono URLs and `14px` notes; other functional labels `14px`; tertiary notes `13px`.
- **Outlier:** system mono (`ui-monospace`, SF Mono / Cascadia Code / Consolas) for RFC values, technical headers, URL patterns and the direct-link rows. Direct-use URLs are `16px`; detail direct links are `15px`; never for prose.
- **Chinese:** `:lang(zh)` gets line-height `1.85` for body, `1.14` for heads, and zero display tracking. The Chinese hero breaks into two lines at every width; the lede and plate note are one line from tablet up.

## Layout

- Container: `1180px` content, gutters grow to `56px`, then the measure stops.
- Grid: four plates at `1200px+`, three at `900px+`, two below. The last row is allowed to end naturally; the collection may grow. Image-bearing tracks use `minmax(0, 1fr)`.
- Home opening: two columns, top-aligned, `8fr / 4fr`. The left column holds the headline and one sentence; the right column is the `Use the status image` margin. No vertical offset between the columns.
- Detail: 5/7 grid with the plate on the left and the entry on the right. The plate is sticky on desktop and blends into the paper with `mix-blend-mode: multiply` on the figure.
- Mobile: one column; the detail header precedes the plate; the use block moves below the lede.

## Components

- **Plate:** square illustration, `multiply` blend, `filter: brightness(1.04)` so the supplied white background disappears into the paper. Caption below a hairline: code, reason, Chinese name on Chinese pages only, one short line.
- **Use the status image (hero):** a paper-2 utility panel with the full `https://ds-http-status.konata9.cc/{code}.png` pattern and a live `/200.png` example. No page row. Mono for the URLs; no border, radius or shadow.
- **Family blocks:** five columns, oversized `1xx` / `2xx` / `3xx` / `4xx` / `5xx`, one-line responsibility, members as mono links.
- **Use the status image (detail):** the direct PNG URL above the technical notes.
- **Footer:** colophon with sources, machine-readable files and the illustration credit link.

## Motion

State only. No entrance reveals, no marquees, no loops. Card images scale `1.012` on hover; links thicken their underline. All transitions are disabled under `prefers-reduced-motion: reduce`.

## Voice

Precise, dry, lightly literary. Lead with the definition, then the common causes, then the fix. Avoid hype and AI-slop phrases. In Chinese, write natural sentences rather than translating English word for word.

## Language boundary

English pages render English UI only. Chinese names are shown on Chinese pages; the illustrations may contain Chinese as part of the artwork. Machine-readable files (`status.json`, `llms.txt`) remain bilingual.

## SEO and GEO

- English at `/`, Chinese at `/zh/`. Status entries at `/status/{code}/`; the friendly missing-page fallback is `404.html`.
- Short URLs: `/{code}` and `/{code}/` 301 to `/status/{code}/`; `/{code}.png` is the direct illustration. `/{code}.jpg` remains a JPEG alias. Chinese aliases use `/zh/{code}`.
- Every page has a unique title, description, canonical, `hreflang`, Open Graph image and JSON-LD.
- `DefinedTerm` + `DefinedTermSet` for each status; `CollectionPage` + `ItemList` for the index; `AboutPage` for the credits.
- `/llms.txt`, `/llms-full.txt`, `/status.json`, `/status/{code}.json`, `/{code}.png`, image sitemap, `robots.txt`.
- Static HTML, no third-party fonts. Google Analytics 4 is the only third-party script and may set cookies. Lighthouse: 99–100 performance, 100 accessibility, 100 best practices, 100 SEO.

## Hallmark notes and scope

- **44c waived:** the catalogue is the hero. The hero's use note and the first row of plates carry the fold; the opening stays compact so the art appears above the fold. Filling 60% of the viewport with the opening would push the plates down and weaken the page's job.
- **77 on the home:** dismissed. The page has four sections, but the grid is a nineteen-plate catalogue, not a landing strip. The family blocks are the taxonomy, not filler.
- **Detail and About:** these are long-form reference pages, not landing screens. The landing-page 80-word fold budget and section-mass reflex do not model them. This is a **scope mismatch**, not a waiver; 58 is Floor and is not waivable. The home page is the landing page and passes sloplint with 0 FAIL.
- **Body face waiver:** the macOS/Windows system UI stack replaces Specimen's Geist so the site stays webfont-free and reads rounder. System mono remains the outlier.
- **Accent waiver:** the ink blue is sampled from the illustrations (`#3A56A0`) rather than the theme's stock accent.

## Credits

Nineteen illustrations by **Fatal1tyV** (Xiaohongshu), with thanks. The full credit and thank-you live on `/about/` and `/zh/about/`.

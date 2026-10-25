import { writeFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = (process.env.SITE_URL || 'https://ds-http-status.konata9.cc').replace(/\/$/, '');
const base = process.env.BASE_PATH || '/';
const basePath = base === '/' ? '' : base.replace(/\/$/, '');

/**
 * Derive short-link redirects from the pages that were actually built, so a
 * new status code cannot exist as a page without its /{code} aliases.
 */
function statusRedirects() {
  return {
    name: 'status-redirects',
    hooks: {
      'astro:build:done': async ({ pages, dir, logger }) => {
        const codes = [
          ...new Set(
            pages
              .map(({ pathname }) => pathname.match(/(?:^|\/)status\/(\d{3})(?:\/|$)/)?.[1])
              .filter(Boolean),
          ),
        ].sort((a, b) => Number(a) - Number(b));

        if (codes.length === 0) {
          throw new Error('status-redirects: no built status pages found');
        }

        const lines = codes.flatMap((code) => [
          `/${code} /status/${code}/ 301`,
          `/${code}/ /status/${code}/ 301`,
          `/zh/${code} /zh/status/${code}/ 301`,
          `/zh/${code}/ /zh/status/${code}/ 301`,
        ]);

        await writeFile(new URL('_redirects', dir), `${lines.join('\n')}\n`);
        logger.info(`Generated _redirects for ${codes.length} status codes.`);
      },
    },
  };
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    statusRedirects(),
    sitemap({
      filter: (page) => !page.endsWith('/404.html'),
      customPages: [
        `${site}${basePath}/status/404/`,
        `${site}${basePath}/zh/status/404/`,
        `${site}${basePath}/status/500/`,
        `${site}${basePath}/zh/status/500/`,
      ],
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          zh: 'zh-CN',
        },
      },
      namespaces: {
        image: true,
      },
      serialize(item) {
        item.lastmod = '2026-10-25';
        const pathname = new URL(item.url).pathname;
        const match = pathname.match(/\/(\d{3})\/?$/);
        if (match) {
          const code = match[1];
          item.img = [
            {
              url: `${site}${basePath}/${code}.png`,
              caption:
                code === '418'
                  ? 'DeepSeek-chan peeking out of a teapot, 418 I’m a teapot'
                  : `DeepSeek-chan HTTP status illustration for ${code}`,
            },
          ];
        }
        return item;
      },
    }),
  ],
});

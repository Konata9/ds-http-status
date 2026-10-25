import type { Locale } from '../data/statuses';
import { canonicalUrl, imageApiPath, statusPath, withBase } from '../data/site';

export interface StatusUrl {
  /** Locale-relative path, for the layout and metadata helpers. */
  path: string;
  /** Base-aware path for an href or src. */
  href: string;
  /** Absolute URL for canonical, social and machine-readable output. */
  url: string;
}

export interface StatusUrls {
  page: Record<Locale, StatusUrl>;
  short: StatusUrl;
  image: StatusUrl;
  json: StatusUrl;
}

/**
 * One source for every URL a status code owns: localized page, short alias,
 * direct PNG and JSON endpoint.
 */
export function statusUrls(code: number): StatusUrls {
  const build = (path: string): StatusUrl => ({
    path,
    href: withBase(path),
    url: canonicalUrl(path),
  });

  return {
    page: {
      en: build(statusPath('en', code)),
      zh: build(statusPath('zh', code)),
    },
    short: build(`/${code}`),
    image: build(imageApiPath(code)),
    json: build(`/status/${code}.json`),
  };
}

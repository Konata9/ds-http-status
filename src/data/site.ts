import type { Locale } from './statuses';

const SITE_URL = (import.meta.env.SITE || 'https://ds-http-status.konata9.cc').replace(/\/$/, '');
const BASE_PATH = import.meta.env.BASE_URL || '/';

export const site = {
  name: {
    en: 'DeepSeek-chan HTTP Field Guide',
    zh: 'DeepSeek 娘 HTTP 状态图鉴',
  },
  description: {
    en: 'Nineteen HTTP status codes across all five classes, illustrated by DeepSeek-chan and explained without jargon. RFC references, common causes, and practical fixes.',
    zh: '用 DeepSeek 娘插画读懂十九个 HTTP 状态码，覆盖五个类别。包含 RFC 出处、常见场景和实用处理建议。',
  },
  edition: '1.1',
  updated: '2026-10-26',
  author: {
    name: 'Konata9',
    url: 'https://github.com/Konata9',
    repo: 'https://github.com/Konata9/ds-http-status',
  },
  illustrator: {
    name: 'Fatal1tyV',
    platform: 'Xiaohongshu',
    url: 'https://www.xiaohongshu.com/user/profile/691f24b6000000003702fdbd',
  },
} as const;

export function withBase(path: string): string {
  const base = BASE_PATH.endsWith('/') ? BASE_PATH : `${BASE_PATH}/`;
  const clean = path.replace(/^\//, '');
  return `${base}${clean}`;
}

export function canonicalUrl(path: string): string {
  return new URL(withBase(path), `${SITE_URL}/`).toString();
}

function localePath(locale: Locale, path: string): string {
  if (locale === 'en') return path;
  return path === '/' ? '/zh/' : `/zh${path}`;
}

export function alternatePath(path: string, locale: Locale): string {
  if (locale === 'zh') {
    const stripped = path.replace(/^\/zh/, '');
    return stripped === '' ? '/' : stripped;
  }
  return path === '/' ? '/zh/' : `/zh${path}`;
}

export function statusPath(locale: Locale, code: number): string {
  return localePath(locale, `/status/${code}/`);
}

export function aboutPath(locale: Locale): string {
  return localePath(locale, '/about/');
}

export function homePath(locale: Locale): string {
  return localePath(locale, '/');
}

export function imageApiPath(code: number): string {
  return `/${code}.png`;
}

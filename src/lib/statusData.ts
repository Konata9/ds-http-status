import { classMeta, type Status } from '../data/statuses';
import { site } from '../data/site';
import { statusUrls } from './statusUrls';

export const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=3600',
  'Access-Control-Allow-Origin': '*',
} as const;

/** Shared metadata envelope for the full and single-entry JSON endpoints. */
export function apiEnvelope(source: string) {
  return {
    name: site.name,
    edition: site.edition,
    updated: site.updated,
    illustrator: site.illustrator,
    author: site.author,
    source,
  };
}

export function serializeStatus(status: Status) {
  const urls = statusUrls(status.code);

  return {
    code: status.code,
    plate: status.plate,
    reason: status.reason,
    reasonZh: status.reasonZh,
    class: status.class,
    classLabel: {
      en: classMeta[status.class].en,
      zh: classMeta[status.class].zh,
    },
    url: {
      en: urls.page.en.url,
      zh: urls.page.zh.url,
    },
    shortUrl: urls.short.url,
    imageUrl: urls.image.url,
    image: {
      url: urls.image.url,
      width: 1254,
      height: 1254,
      alt: status.imageAlt,
    },
    card: status.card,
    summary: status.summary,
    lead: status.lead,
    meaning: status.meaning,
    when: status.when,
    server: status.server,
    visitor: status.visitor,
    tech: status.tech,
    related: status.related,
    sources: status.sources,
  };
}

import { describe, expect, it } from 'vitest';
import {
  classMeta,
  getStatus,
  groupStatusesByClass,
  statuses,
  type StatusClass,
} from '../src/data/statuses';
import { canonicalUrl } from '../src/data/site';
import { apiEnvelope, serializeStatus } from '../src/lib/statusData';
import { statusCodePaths, statusStaticPaths } from '../src/lib/statusRoutes';
import { statusUrls } from '../src/lib/statusUrls';

const expectedCodes = [200, 401, 403, 404, 408, 414, 418, 429, 500, 503];

describe('status data', () => {
  it('contains the ten illustrated codes exactly once', () => {
    const codes = statuses.map((status) => status.code);
    expect(codes).toEqual(expectedCodes);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it('resolves every related code through getStatus', () => {
    for (const status of statuses) {
      for (const related of status.related) {
        expect(() => getStatus(related.code)).not.toThrow();
      }
    }
  });

  it('throws for a code outside the guide', () => {
    expect(() => getStatus(599)).toThrow('Unknown status code: 599');
  });

  it('has a label and short meaning for every class', () => {
    const classes: StatusClass[] = [2, 4, 5];
    for (const statusClass of classes) {
      expect(classMeta[statusClass].en).toBeTruthy();
      expect(classMeta[statusClass].zh).toBeTruthy();
      expect(classMeta[statusClass].shortMeaning.en).toBeTruthy();
      expect(classMeta[statusClass].shortMeaning.zh).toBeTruthy();
    }
  });

  it('groups all statuses by class without loss', () => {
    const groups = groupStatusesByClass();
    const grouped = Object.values(groups).flat();
    expect(grouped).toHaveLength(statuses.length);
    expect(grouped.map((status) => status.code).sort()).toEqual([...expectedCodes].sort());
  });
});

describe('status URLs', () => {
  it('builds the localized page, short, image and JSON URLs from one source', () => {
    const urls = statusUrls(200);

    expect(urls.page.en.path).toBe('/status/200/');
    expect(urls.page.zh.path).toBe('/zh/status/200/');
    expect(urls.short.path).toBe('/200');
    expect(urls.image.path).toBe('/200.png');
    expect(urls.json.path).toBe('/status/200.json');

    expect(urls.page.en.url).toBe(canonicalUrl('/status/200/'));
    expect(urls.page.zh.url).toBe(canonicalUrl('/zh/status/200/'));
    expect(urls.image.url).toBe(canonicalUrl('/200.png'));
  });

  it('uses the same URL in the serialized entry', () => {
    const status = getStatus(404);
    const serialized = serializeStatus(status);
    const urls = statusUrls(status.code);

    expect(serialized.url.en).toBe(urls.page.en.url);
    expect(serialized.url.zh).toBe(urls.page.zh.url);
    expect(serialized.shortUrl).toBe(urls.short.url);
    expect(serialized.imageUrl).toBe(urls.image.url);
    expect(serialized.image.url).toBe(urls.image.url);
  });

  it('exposes every code as a static path', () => {
    expect(statusCodePaths().map((path) => path.params.code)).toEqual(
      expectedCodes.map(String),
    );
    expect(statusStaticPaths().map((path) => path.params.code)).toEqual(
      expectedCodes.map(String),
    );
  });
});

describe('JSON envelope', () => {
  it('carries the same identity fields as the full endpoint', () => {
    const envelope = apiEnvelope(canonicalUrl('/status/200.json'));

    expect(envelope.source).toBe(canonicalUrl('/status/200.json'));
    expect(envelope.author.name).toBe('Konata9');
    expect(envelope.illustrator.name).toBe('Fatal1tyV');
    expect(envelope.edition).toBe('1.0');
  });
});

import type { APIRoute } from 'astro';
import { statuses } from '../data/statuses';
import { canonicalUrl, homePath } from '../data/site';
import { statusUrls } from '../lib/statusUrls';

export const GET: APIRoute = () => {
  const lines: string[] = [
    '# DeepSeek-chan HTTP Field Guide',
    '',
    '> An unofficial bilingual illustrated reference to ten HTTP status codes: 200, 401, 403, 404, 408, 414, 418, 429, 500, and 503. Each entry gives the meaning, common causes, fixes, the relevant RFC section, and a link to the illustration.',
    '',
    'Languages: English at /, Simplified Chinese at /zh/',
    'Edition: 1.0, updated 2026-10-25',
    'Illustrations: Fatal1tyV (Xiaohongshu) https://www.xiaohongshu.com/user/profile/691f24b6000000003702fdbd',
    'Definitions: RFC 9110, RFC 6585, RFC 2324, and MDN Web Docs.',
    '',
    '## English pages',
    `- [Index](${canonicalUrl(homePath('en'))}): Ten illustrated status codes.`,
    ...statuses.map(
      (status) =>
        `- [${status.code} ${status.reason}](${statusUrls(status.code).page.en.url}): ${status.summary.en}`,
    ),
    `- [About](${canonicalUrl('/about/')}): credits, sources, and privacy.`,
    '',
    '## Chinese pages',
    `- [图鉴](${canonicalUrl(homePath('zh'))}): 十个状态码的插画图鉴。`,
    ...statuses.map(
      (status) =>
        `- [${status.code} ${status.reason}](${statusUrls(status.code).page.zh.url}): ${status.summary.zh}`,
    ),
    `- [关于](${canonicalUrl('/zh/about/')}): 署名、致谢、出处和隐私说明。`,
    '',
    '## Machine-readable',
    `- [status.json](${canonicalUrl('/status.json')}): all entries as JSON.`,
    `- [llms-full.txt](${canonicalUrl('/llms-full.txt')}): full definitions in both languages.`,
    `- [Sitemap](${canonicalUrl('/sitemap-index.xml')}): all HTML pages and images.`,
    '',
    '## Direct use',
    `- Image: ${canonicalUrl('/')}{code}.png`,
    `- JPEG alias: ${canonicalUrl('/')}{code}.jpg`,
    '',
    '## Notes',
    '- This is an unofficial fan project, not affiliated with DeepSeek.',
    '- The site is static HTML. Google Analytics 4 measures aggregate traffic and may set cookies; no other third-party scripts run.',
    '- Every entry links to the exact RFC section and MDN page used for its definition.',
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

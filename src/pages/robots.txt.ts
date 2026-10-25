import type { APIRoute } from 'astro';
import { canonicalUrl } from '../data/site';

export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# AI crawlers are welcome. See /llms.txt for a compact index.',
    `Sitemap: ${canonicalUrl('/sitemap-index.xml')}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

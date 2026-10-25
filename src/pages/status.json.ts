import type { APIRoute } from 'astro';
import { statuses } from '../data/statuses';
import { canonicalUrl } from '../data/site';
import { apiEnvelope, jsonHeaders, serializeStatus } from '../lib/statusData';

export const GET: APIRoute = () => {
  const payload = {
    ...apiEnvelope(canonicalUrl('/')),
    statuses: statuses.map(serializeStatus),
  };

  return new Response(JSON.stringify(payload, null, 2), { headers: jsonHeaders });
};

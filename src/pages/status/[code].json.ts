import type { APIRoute } from 'astro';
import { statusUrls } from '../../lib/statusUrls';
import { apiEnvelope, jsonHeaders, serializeStatus } from '../../lib/statusData';
import { statusStaticPaths } from '../../lib/statusRoutes';

export function getStaticPaths() {
  return statusStaticPaths();
}

export const GET: APIRoute = ({ props }) => {
  const { status } = props;
  const payload = {
    ...apiEnvelope(statusUrls(status.code).json.url),
    status: serializeStatus(status),
  };

  return new Response(JSON.stringify(payload, null, 2), { headers: jsonHeaders });
};

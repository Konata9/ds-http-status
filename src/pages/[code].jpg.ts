import type { APIRoute } from 'astro';
import { createStatusImageResponse } from '../lib/statusImage';
import { statusCodePaths } from '../lib/statusRoutes';

export function getStaticPaths() {
  return statusCodePaths();
}

export const GET: APIRoute = async ({ params }) => {
  if (!params.code) {
    return new Response('Not found', { status: 404 });
  }

  return createStatusImageResponse(params.code, 'jpg');
};

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const IMAGE_DIR = join(process.cwd(), 'src', 'assets', 'status');

export type StatusImageFormat = 'png' | 'jpg';

/**
 * Read the cleaned PNG once and return the requested format with the shared
 * immutable cache policy. PNG is canonical; JPG is the compatibility alias.
 */
export async function createStatusImageResponse(
  code: string,
  format: StatusImageFormat,
): Promise<Response> {
  const png = await readFile(join(IMAGE_DIR, `${code}.png`));
  const body =
    format === 'jpg'
      ? await sharp(png).jpeg({ quality: 92, mozjpeg: true }).toBuffer()
      : png;

  return new Response(body, {
    headers: {
      'Content-Type': format === 'jpg' ? 'image/jpeg' : 'image/png',
      'Content-Disposition': `inline; filename="${code}.${format}"`,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

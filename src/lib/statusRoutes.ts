import { statuses } from '../data/statuses';

/** Fresh path objects per route: Astro may normalize the array it receives. */
export const statusStaticPaths = () =>
  statuses.map((status) => ({
    params: { code: String(status.code) },
    props: { status },
  }));

export const statusCodePaths = () =>
  statusStaticPaths().map(({ params }) => ({ params }));

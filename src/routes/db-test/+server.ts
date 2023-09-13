import type { RequestHandler } from './$types';
import '$lib/db';

export const GET: RequestHandler = async () => {
	return new Response();
};

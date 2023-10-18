import { getMatches } from "$lib/db";
import type { PageLoad } from "./$types";

export const load = (async () => {
	const matches = await getMatches()
	return { matches }
}) satisfies PageLoad


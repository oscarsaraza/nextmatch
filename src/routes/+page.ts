import { userAuth } from '$lib/auth'
import { getMatches } from '$lib/db'
import type { PageLoad } from './$types'

export const load = (async () => {
  try {
    const matches = await getMatches()
    return { matches }
  } catch (error) {}
  return { matches: [] }
}) satisfies PageLoad

import { createMatch, getMatches } from '$lib/db'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async () => {
  const matches = await getMatches()
  return { matches }
}) satisfies PageServerLoad

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const date = data.get('date')?.toString()
    const location = data.get('location')?.toString()
    const requiredPlayers = data.get('requiredPlayers')?.toString()
    if (!date || !location || !requiredPlayers) return

    const match = {
      datetime: new Date(date),
      location,
      requiredPlayers: parseInt(requiredPlayers),
    }
    await createMatch(match)
  },
} satisfies Actions

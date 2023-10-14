import { createMatch } from '$lib/db'
import type { Actions } from '@sveltejs/kit'
import { Timestamp } from 'firebase/firestore'

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const date = data.get('date')?.toString()
    const location = data.get('location')?.toString()
    const requiredPlayers = data.get('requiredPlayers')?.toString()
    if (!date || !location || !requiredPlayers) return

    const match = {
      datetime: Timestamp.fromDate(new Date(date)),
      location,
      requiredPlayers: parseInt(requiredPlayers),
    }
    await createMatch(match)
  },
} satisfies Actions

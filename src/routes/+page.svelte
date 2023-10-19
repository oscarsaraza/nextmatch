<script lang="ts">
  import { userAuth } from '$lib/auth'
  import Link from '$lib/components/link.svelte'
  import type { PageData } from './$types'
  import { invalidateAll } from '$app/navigation'
  import { applyAction } from '$app/forms'
  import type { ActionResult } from '@sveltejs/kit'
  import { Timestamp } from 'firebase/firestore'
  import { createMatch } from '$lib/db'

  export let data: PageData
  const { login, user } = userAuth()

  async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
    if ($user.isReady !== true || $user.state !== 'logged') return

    const data = new FormData(event.currentTarget)

    const date = data.get('date')?.toString()
    const location = data.get('location')?.toString()
    const requiredPlayers = data.get('requiredPlayers')?.toString()
    if (!date || !location || !requiredPlayers) return

    const match = {
      datetime: Timestamp.fromDate(new Date(date)),
      location,
      requiredPlayers: parseInt(requiredPlayers),
      createdBy: $user.id,
    }
    const matchId = await createMatch(match)

    // TODO: Maybe return ActionResult from createMatch?
    const result: ActionResult = matchId ? { type: 'success', status: 200 } : { type: 'error', status: 400, error: 'error :(' }

    if (result.type === 'success') {
      await invalidateAll() // rerun all `load` functions
    }

    applyAction(result)
  }
</script>

{#if !$user.isReady}
  Cargando...
{/if}

{#if $user.isReady}
  {#if $user.state === 'no-user'}
    <div class="min-h-screen flex flex-col justify-center items-center">
      <h1 class="h1">Juego<span class="text-emerald-700">.win</span></h1>
      <Link on:click={login}>Iniciar con Google</Link>
    </div>
  {:else if $user.state === 'logged'}
    <div class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-7xl m-auto">
      {#each data.matches as match}
        <div class="border border-slate-200 rounded-lg p-2 m-2 bg-slate-100">
          <div>Fecha: {match.datetime.toDate().toDateString()}</div>
          <div>Lugar: {match.location}</div>
          <div>Jugadores: {match.requiredPlayers}</div>
        </div>
      {/each}
    </div>

    <form method="POST" on:submit|preventDefault={handleSubmit}>
      <input type="date" name="date" />
      <input type="text" name="location" />
      <input type="number" name="requiredPlayers" />
      <button type="submit">Nuevo</button>
    </form>
  {/if}
{/if}

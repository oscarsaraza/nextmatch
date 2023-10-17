<script lang="ts">
  import { enhance } from '$app/forms'
  import { userAuth } from '$lib/auth'
  import { getMatches, type Match } from '$lib/db'
  import Link from '$lib/components/link.svelte'

  const { login, user } = userAuth()
  let matches: Array<Match> = []

  user.subscribe(async (user) => {
    if (user.isReady && user.state === 'logged') matches = await getMatches()
  })
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
      {#each matches as match}
        <div class="border border-slate-200 rounded-lg p-2 m-2 bg-slate-100">
          <div>Fecha: {match.datetime.toDate().toDateString()}</div>
          <div>Lugar: {match.location}</div>
          <div>Jugadores: {match.requiredPlayers}</div>
        </div>
      {/each}
    </div>

    <form method="POST" use:enhance>
      <input type="date" name="date" />
      <input type="text" name="location" />
      <input type="number" name="requiredPlayers" />
      <button type="submit">Nuevo</button>
    </form>
  {/if}
{/if}

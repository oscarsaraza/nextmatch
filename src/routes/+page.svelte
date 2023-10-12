<script lang="ts">
  import { userAuth } from '$lib/auth'
  import Link from '$lib/components/link.svelte'
  import type { PageData } from './$types'

  const { login, user } = userAuth()
  export let data: PageData
</script>

{#if !$user}
  <div class="min-h-screen flex flex-col justify-center items-center">
    <h1 class="h1">Juego<span class="text-emerald-700">.win</span></h1>
    <Link on:click={login}>Iniciar con Google</Link>
  </div>
{:else}
  {#each data.matches as match}
    <div>
      {match.datetime} - {match.requiredPlayers}
    </div>
  {/each}

  <form method="POST">
    <input type="date" name="date" />
    <input type="text" name="location" />
    <input type="number" name="requiredPlayers" />
    <button type="submit">Nuevo</button>
  </form>
{/if}

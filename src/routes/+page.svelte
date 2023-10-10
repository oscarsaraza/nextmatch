<script lang="ts">
  import { userAuth } from '$lib/auth'
  import Link from '$lib/components/link.svelte'

  const { login, user } = userAuth()
</script>

<div class="min-h-screen flex flex-col justify-center items-center">
  <h1 class="h1">Juego<span class="text-emerald-700">.win</span></h1>

  {#if !$user}
    <Link on:click={login}>Iniciar con Google</Link>
  {/if}
</div>

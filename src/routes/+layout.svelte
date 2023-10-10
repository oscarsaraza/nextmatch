<script>
  import { userAuth } from '$lib/auth'
  import '../app.postcss'

  const { logout, user } = userAuth()
</script>

<div>
  {#if $user}
    {$user?.name} <button on:click={logout}>Salir</button>
  {:else}
    Anónimo
  {/if}
  <slot />
</div>

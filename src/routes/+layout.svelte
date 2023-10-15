<script>
  import { userAuth } from '$lib/auth'
  import '../app.postcss'

  const { logout, user } = userAuth()
</script>

<div>
  {#if $user?.state === 'logged'}
    {$user?.name} <button on:click={logout}>Salir</button>
  {:else if $user?.state === 'no-user'}
    Anónimo
  {:else if $user?.state === 'loading'}
    Cargando...
  {/if}
  <slot />
</div>

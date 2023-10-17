<script>
  import { userAuth } from '$lib/auth'
  import '../app.postcss'

  const { logout, user } = userAuth()
</script>

<div>
  {#if !$user.isReady}
    Cargando...
  {/if}

  {#if $user.isReady}
    {#if $user.state === 'logged'}
      {$user.name} <button on:click={logout}>Salir</button>
    {:else if $user.state === 'no-user'}
      Iniciar sesión
    {/if}
  {/if}
  <slot />
</div>

<script lang="ts">
  export let href: string ='/'
</script>

<a class="text-emerald-700 border-emerald-700 inline-block p-1 -ml-2 relative" {href} on:click|preventDefault>
  <slot />
</a>

<style>
  a {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }

  a:before,
  a:after {
    position: absolute;
    content: '';
    border-bottom: 2px solid;
    border-radius: 1em;
    bottom: 0.3em;
    transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  a:before {
    width: 1em;
    transform-origin: left;
  }

  a:after {
    width: 82%;
    left: 1em;
    transform: translateX(110%);
  }

  a:hover:before {
    transform: scaleX(0.3);
  }

  a:hover:after {
    transform: translateX(0);
  }
</style>

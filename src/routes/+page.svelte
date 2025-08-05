<script>
    import { goto } from "$app/navigation";

</script>

<div class="p-4">
  <h1>Welcome to SvelteKit</h1>
  <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
  <button onclick={() => goto('/test')}>Goto /test</button>
</div>
<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Shortcuts } from 'svelte-keyboard-shortcuts';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<Shortcuts options={{ generateKbd: false}}/>
<Toaster richColors/>
<svelte:head>
	<title>Guest Who</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

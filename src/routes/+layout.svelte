<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Shortcuts } from 'svelte-keyboard-shortcuts';

	let { children } = $props();
</script>

<Shortcuts options={{ generateKbd: false}}/>
<svelte:head>
	<title>Guest Who</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

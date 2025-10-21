<script lang="ts">
	import type { CreateCharacter } from '$lib/models/CreateCharacter.svelte';
	let {
		character
	}: {
		character: CreateCharacter;
	} = $props();
</script>

<div class="card w-40 md:w-50 shadow-lg" style:--bg-1="var(--color-white)">
	<div class="flex flex-col gap-3">
		<img
			class="characterImage aspect-square self-center object-cover"
			src={character.url.href}
			alt={`character ${character.name}`}
		/>
		<span class="characterName block w-full">
			<p class="text-center whitespace-nowrap overflow-scroll sm:truncate">{character.name}</p>
		</span>
	</div>
</div>

<style>
	.characterName {
		font-size: var(--text-2xl) /* 1.875rem = 30px */;
		line-height: var(--tw-leading, var(--text-3xl--line-height));
		color: var(--color-black);
		/* text-underline-offset: 0.05em;
		text-decoration-line: underline; */
	}
	.characterImage {
		aspect-ratio: 1/1;
		object-fit: cover;
	}
	.card {
		/* border: solid black 0.5px; */
		position: relative;
		aspect-ratio: 2.5 / 3;
		font-size: 0.3rem;
		background: var(--bg-1);
		border-radius: 1em;
		user-select: none;
		padding: 1em;
		background: white;
	}
</style>

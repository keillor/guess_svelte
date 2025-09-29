<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import type { CreateCharacter } from '$lib/models/CreateCharacter.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	let {
		characterData = $bindable(),
		index,
	}: {
		characterData: CreateCharacter[],
		index: number
	} = $props();

	let isDuplicate: boolean = $derived.by(() => {
		let newName = characterData[index].name
		if(newName === '') return false;
		for(let character of characterData) {
			if(character == characterData[index]) {
				continue;
			}
			if(character.name == newName) {
				//isDuplicate = true;
				return true;
			}
		}
		//isDuplicate = false;
		return false;
	})


	async function handlePaste() {
		const result = await navigator.clipboard.readText();
		const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp|avif|bmp|tiff))/i;
		if (regex.test(result)) {
			characterData[index].url = new URL(result);
		}
	}
</script>

<div class="card" style:--bg-1="var(--color-white)">
	<div class="flex flex-col gap-2">
		{#if characterData[index].url.host != 'localhost'}
		<img
			class="characterImage self-center"
			src={characterData[index].url.href}
			alt={`character ${characterData[index].name}`}
		/>
		{:else}
		TODO: add placeholder img
		{/if}
		<span class="characterName">
			<div class="relative flex items-center w-full">
				<!-- onkeyup={() => handleIsDuplicate()} -->
				<Input
					bind:value={characterData[index].name}
					class={`w-full pr-8 ${isDuplicate ? 'border-red-500' : ''}`}
					aria-invalid={isDuplicate}
					onfocusout={() => characterData[index].name = characterData[index].name.trim()}
				/>
				{#if isDuplicate}
					<Tooltip.Provider delayDuration={100}>
						<Tooltip.Root>
							<Tooltip.Trigger class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-none p-0 text-xl">❌</Tooltip.Trigger>
							<Tooltip.Trigger class="animate-ping absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-none p-0 text-xl">❌</Tooltip.Trigger>
							<Tooltip.Content class='bg-purple-800' arrowClasses='bg-purple-800'>
								<p>Duplicate Name!</p>
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				{/if}
			</div>
		</span>
		<button
			onclick={handlePaste}
			class="w-full rounded-sm bg-purple-500 text-sm outline-1 transition-colors hover:bg-purple-800 hover:text-white"
			>Paste</button
		>
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
		font-size: 0.5rem;
		background: var(--bg-1);
		border-radius: 1em;
		user-select: none;
		padding: 1em;
		background: white;
	}
</style>

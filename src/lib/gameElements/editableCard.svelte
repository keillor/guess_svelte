<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import type { CreateCharacter } from '$lib/models/CreateCharacter.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { toast } from 'svelte-sonner';
	import ToastError from './ToastError.svelte';
	import { validImageUrl } from '$lib/utils/image';
	let {
		characterData = $bindable(),
		index
	}: {
		characterData: CreateCharacter[];
		index: number;
	} = $props();

	let isDuplicate: boolean = $derived.by(() => {
		let newName = characterData[index].name;
		if (newName === '') return false;
		for (let character of characterData) {
			if (character == characterData[index]) {
				continue;
			}
			if (character.name == newName) {
				//isDuplicate = true;
				return true;
			}
		}
		//isDuplicate = false;
		return false;
	});

	async function handlePaste() {
		const result = await navigator.clipboard.readText();
		if (validImageUrl(result)) {
			characterData[index].url = new URL(result);
		} else {
			toast.custom(ToastError, {
				componentProps: {
					message: 'Not a valid image URL',
					loading: false
				}
			});
		}
	}

	let dragging = $state<boolean>(false);

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		dragging = true;
	}

	function handleOnDrop(e: DragEvent) {
		e.preventDefault();
		dragging = false;
		const draggedText = e.dataTransfer?.getData('text').trim();
		if(typeof draggedText != 'string' || draggedText === '' || !validImageUrl(draggedText)) {
			toast.custom(ToastError, {
				componentProps: {
					loading: false,
					message: 'Not a valid image link. Only image links may be dragged in.'
				}
			})
		}
		characterData[index].url = new URL(draggedText);
	}

	function handleDragLeave(e: DragEvent) {
		e.preventDefault();
		dragging = false;
	}
</script>

<div class="card" style:--bg-1="var(--color-white)">
	<div class="flex flex-col gap-3">
		<div
			id="cardImage"
			ondragover={(e) => handleDragOver(e)}
			ondrop={(e) => handleOnDrop(e)}
			ondragleave={(e) => handleDragLeave(e)}
			aria-roledescription="what"
			role="region"
		>
			{#if dragging}
				<svg
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="absolute z-10 bg-gray-200/70 fill-blue-500 characterImage transition-all"
				>
					<path
						d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711L17.657 9.65685L12.0001 4L6.34326 9.65685L7.75748 11.0711L11 7.82854V14.9861Z"
						class='animate-[bounce_1s_ease-in-out_infinite]'
					/>
					<path
						d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
					/>
				</svg>
			{/if}
			{#if characterData[index].url.host != 'localhost'}
				<img
					class="characterImage aspect-square self-center object-cover"
					src={characterData[index].url.href}
					alt={`character ${characterData[index].name}`}
				/>
			{:else}
				<img
					class="characterImage aspect-square self-center object-cover"
					src="https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg"
					alt={`character ${characterData[index].name}`}
				/>
			{/if}
		</div>
		<span class="characterName">
			<div class="relative flex w-full items-center">
				<!-- onkeyup={() => handleIsDuplicate()} -->
				<Input
					bind:value={characterData[index].name}
					class={`w-full pr-8 ${isDuplicate ? 'border-red-500' : ''}`}
					placeholder="name"
					aria-invalid={isDuplicate}
					onfocusout={() => (characterData[index].name = characterData[index].name.trim())}
				/>
				{#if isDuplicate}
					<Tooltip.Provider delayDuration={100}>
						<Tooltip.Root>
							<!-- NOTE: the disabled boolean makes the object selectable with tab only once. -->
							<Tooltip.Trigger
								tabindex={-1}
								disabled={true}
								class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer border-none bg-transparent p-0 text-xl"
								>❌</Tooltip.Trigger
							>
							<Tooltip.Trigger
								tabindex={-1}
								class="absolute top-1/2 right-2 -translate-y-1/2 animate-ping cursor-pointer border-none bg-transparent p-0 text-xl"
								>❌</Tooltip.Trigger
							>
							<Tooltip.Content class="bg-purple-800" arrowClasses="bg-purple-800">
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
	#cardImage * {
		pointer-events: none;
	}
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

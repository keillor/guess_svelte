<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import type { Character } from '$lib/models/character';
	import { toast } from 'svelte-sonner';
	const {
		flipArray,
		characterData,
		disabled,
		children
	}: {
		flipArray: Array<boolean>;
		characterData: Array<Character>;
		disabled: boolean | null | undefined;
		children: any;
	} = $props();
	let drawerOpen = $state(false);
	let scrollRef: HTMLDivElement | any = null;
	const scrollAmount: number = 160;

	let selectedCharacter = $state<Character | undefined>();

	function handleLeft() {
		if (scrollRef) {
			const viewport = scrollRef.children[0];
			const firstCharacter = viewport.querySelector('.scrollSnapItem');
			if (firstCharacter) {
				const characterWidth = firstCharacter.getBoundingClientRect().width;
				viewport.scrollBy({ left: -characterWidth - 16, behavior: 'smooth' });
			}
		}
	}
	function handleRight() {
		if (scrollRef) {
			const viewport = scrollRef.children[0];
			const firstCharacter = viewport.querySelector('.scrollSnapItem');
			if (firstCharacter) {
				const characterWidth = firstCharacter.getBoundingClientRect().width;
				viewport.scrollBy({ left: characterWidth + 16, behavior: 'smooth' });
			}
		}
	}

	function handleCharacterTap(newCharacter: Character) {
		if (selectedCharacter != newCharacter) {
			selectedCharacter = newCharacter;
		} else {
			selectedCharacter = undefined;
		}
	}
</script>

<Drawer.Root bind:open={drawerOpen}>
	<Drawer.Trigger {disabled}>{@render children()}</Drawer.Trigger>
	<Drawer.Content>
		<div class="mx-auto w-full max-w-full sm:max-w-sm md:max-w-md">
			<Drawer.Header>
				<Drawer.Title>Did You Guess Who?</Drawer.Title>
				<Drawer.Description>
					<form
						method="post"
						use:enhance={({ formElement, formData, action, cancel, submitter }) => {
							// `formElement` is this `<form>` element
							// `formData` is its `FormData` object that's about to be submitted
							// `action` is the URL to which the form is posted
							// calling `cancel()` will prevent the submission
							// `submitter` is the `HTMLElement` that caused the form to be submitted

							if (selectedCharacter == null) {
								cancel();
								return;
							}

							drawerOpen = false;
							
							return async ({ result, update }) => {
								// `result` is an `ActionResult` object
								// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
							};
						}}
						class="flex flex-col gap-2"
					>
						<Label for="question" class="font-bold">Question</Label>
						<ScrollArea orientation="horizontal" bind:ref={scrollRef}>
							<div class="flex h-40 flex-row gap-4 p-2">
								{#each characterData as character}
									<button
										type="button"
										onclick={() => handleCharacterTap(character)}
										class={`scrollSnapItem w-40 rounded-lg p-2 outline-1 transition-all ${character == selectedCharacter ? 'bg-blue-600 text-white' : ''}`}
									>
										<div class="flex flex-row justify-center">
											<img class="characterImage" src={character.url.href} alt={character.name} />
										</div>
										<span class="text-center">
											{character.name}
										</span>
									</button>
								{/each}
							</div>
						</ScrollArea>
						<div class="flex flex-row justify-around">
							<button type="button" onclick={handleLeft}>◀</button>
							<button type="button" onclick={handleRight}>▶</button>
						</div>
						<Button
							type="submit"
							disabled={selectedCharacter === undefined}
							class="w-full rounded-2xl bg-blue-600 p-3 text-2xl hover:bg-blue-800 disabled:bg-gray-400">Submit</Button
						>
					</form>
				</Drawer.Description>
			</Drawer.Header>
			<Drawer.Footer>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>

<style>
	.characterImage {
		height: calc(var(--spacing) * 30);
		aspect-ratio: 1/1;
		object-fit: cover;
		border-radius: 1em;
		user-drag: none;
		-webkit-user-drag: none;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}
</style>

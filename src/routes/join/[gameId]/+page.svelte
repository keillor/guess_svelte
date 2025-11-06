<script lang="ts">
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	const { data } = $props();
	import { z } from 'zod/v4';
	import { toast } from 'svelte-sonner';
	import ToastError from '$lib/gameElements/ToastError.svelte';
	import { goto } from '$app/navigation';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	const formSchema = z.object({
		character: z.number().min(0).max(23)
	});

	const form = superForm(defaults(zod4(formSchema)), {
		dataType: 'json',
		validators: zod4(formSchema),
		SPA: true,
		onUpdate: async ({ form: f }) => {
			if (f.valid) {
				// yay we can redirect to /play/<GameId>
				const result = await data.game.joinGame(data.cards?.characters[f.data.character]);
				if (result === false) {
					toast.custom(ToastError, {
						componentProps: { loading: false, message: 'Failed to join game.' }
					});
                    return false;
				}
				//goto(`/play/${data.game?.gameId}`);
				console.log('game joined!')
                return true;
			} else {
			}
		}
	});

	const { form: formData, enhance } = form;

	// svelte-ignore non_reactive_update
	let scrollRef: HTMLDivElement | any = null;

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
				viewport.scrollBy({ left: characterWidth + 12, behavior: 'smooth' });
			}
		}
	}
</script>

<div class="m-3 flex flex-col items-center">
	<h1 class="w-fit rounded-2xl bg-pink-500 p-3 text-2xl text-white">Join Game</h1>
</div>

<div class="p-2">
	<Card.Root class="w-full sm:max-w-sm">
		<Card.Header>
			<Card.Title>Card Set: <span class="underline">{data.cards.setName}</span></Card.Title>
		</Card.Header>
		<Card.Content>
			<form method="POST" class="space-y-6" use:enhance>
				<Form.Fieldset {form} name="character" class="space-y-3">
					<Form.Legend>Pick your secret character:</Form.Legend>
					<RadioGroup.Root
						bind:value={$formData.character}
						class="flex flex-row space-y-1"
						name="type"
					>
						<div class="max-w-[21em]">
							<ScrollArea orientation="horizontal" class="box-border max-w-full overflow-x-auto" bind:ref={scrollRef}>
								<div class="box-border flex w-full max-w-full flex-row flex-nowrap gap-3">
									{#each data.cards.characters as character, index}
										<Form.Control>
											{#snippet children({ props })}
												<Form.Label
													class="scrollSnapItem flex w-40 items-start gap-2 rounded-lg border p-3 transition-colors has-[[data-state=checked]]:border-blue-600 has-[[data-state=checked]]:bg-blue-800/20"
												>
													<RadioGroup.Item
														value={index}
														{...props}
														class="data-[state=checked]:border-pink-500"
													/>
													<div class="grid gap-1 font-normal">
														<div class="text-center font-medium overflow-clip text-nowrap">{character.name}</div>
														<div class="text-xs leading-snug text-balance text-muted-foreground">
															<img
																src={character.url.href}
																alt={`character ${character.name}`}
																class="aspect-square rounded-2xl object-cover"
															/>
														</div>
													</div>
												</Form.Label>
											{/snippet}
										</Form.Control>
									{/each}
								</div>
							</ScrollArea>
						</div>
					</RadioGroup.Root>
					<div class='flex flex-row items-center justify-around'>
						<button	type="button" onclick={handleLeft} class="transition-all active:scale-75">
							<ChevronLeft />
						</button>
						<button type="button" onclick={handleRight} class="transition-all active:scale-75">
							<ChevronRight />
						</button>
					</div>
				</Form.Fieldset>
				<Form.Button class="w-full bg-pink-500 hover:bg-pink-800 active:scale-95">Join Game</Form.Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>

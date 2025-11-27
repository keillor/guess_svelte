<script lang="ts" module>
	import { z } from 'zod/v4';

	const formSchema = z.object({
		firstPlayer: z.number().min(0).max(1),
		character: z.number().min(0).max(23)
	});
</script>

<script lang="ts">
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import ToastWait from '$lib/gameElements/ToastWait.svelte';
	import ToastError from '$lib/gameElements/ToastError.svelte';
	import { goto } from '$app/navigation';
	import { GuessWhoGame } from '$lib/guessWho.svelte.js';
	import { page } from '$app/state';
	import { Character } from '$lib/models/character.js';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import { resolve } from '$app/paths';

	const { data } = $props();

	const form = superForm(defaults(zod4(formSchema)), {
		dataType: 'json',
		validators: zod4(formSchema),
		SPA: true,
		onUpdate: async ({ form: f }) => {
			if (f.valid) {
				toast.custom(ToastWait, {
					componentProps: {
						message: `Creating lobby...`,
						loading: true
					},
					duration: Number.POSITIVE_INFINITY
				});
				setTimeout(async () => {
					console.log(page.params);
					const character = new Character(
						data.set?.characters[f.data.character].name,
						data.set?.characters[f.data.character].url.href
					);
					try {
						const result = await GuessWhoGame.createNewGameInFirestore(
							page.params.setId,
							f.data.firstPlayer == 0 ? true : false,
							character
						);
						goto(resolve(`/wait/${result.gameId}`));
						toast.dismiss();
					} catch (e) {
						toast.dismiss();
						toast.custom(ToastError, {
							componentProps: {
								message: 'Failed to create lobby!',
								loading: false
							}
						});
					}
				}, 0);
			} else {
				toast.custom(ToastError, {
					componentProps: {
						message: 'Please fix the errors in the form.',
						loading: false
					}
				});
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

<div class="p-2">
	<Card.Root class="w-full sm:max-w-sm">
		<Card.Header>
			<Card.Title>Card Set: <span class="underline">{data.set?.setName}</span></Card.Title>
			<!-- <Card.Description
				><span
					>Set: <span class="font-bold underline">{data.set?.setName}</span></span
				></Card.Description
			> -->
			<Card.Action>
				<Button variant="link" href={resolve("/init")}>Pick a different set</Button>
			</Card.Action>
		</Card.Header>
		<Card.Content>
			<form method="POST" class="space-y-6" use:enhance>
				<Form.Fieldset {form} name="firstPlayer" class="space-y-3">
					<Form.Legend>Decide who will go first:</Form.Legend>
					<RadioGroup.Root
						bind:value={$formData.firstPlayer}
						class="flex flex-col space-y-1"
						name="type"
					>
						<div class="grid grid-cols-2 gap-4">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label
										class="flex items-start gap-3 rounded-lg border p-3 transition-all has-[[data-state=checked]]:border-pink-500 has-[[data-state=checked]]:bg-pink-500/20"
									>
										<RadioGroup.Item
											value={0}
											{...props}
											class="data-[state=checked]:border-pink-500"
										/>
										<div class="grid gap-1 font-normal">
											<div class="font-medium">Me</div>
											<div class="text-xs leading-snug text-balance text-muted-foreground">
												I wanna go first!
											</div>
										</div>
									</Form.Label>
								{/snippet}
							</Form.Control>
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label
										class="flex items-start gap-3 rounded-lg border p-3 has-[[data-state=checked]]:border-purple-500 has-[[data-state=checked]]:bg-purple-500/20"
									>
										<RadioGroup.Item
											value={1}
											{...props}
											class="data-[state=checked]:border-purple-500"
										/>
										<div class="grid gap-1 font-normal">
											<div class="font-medium">My Opponet</div>
											<div class="text-xs leading-snug text-balance text-muted-foreground">
												I'm feeling nice :)
											</div>
										</div>
									</Form.Label>
								{/snippet}
							</Form.Control>
						</div>
					</RadioGroup.Root>
					<Form.FieldErrors />
				</Form.Fieldset>
				<Form.Fieldset {form} name="character" class="space-y-3">
					<Form.Legend>Pick your secret character:</Form.Legend>
					<RadioGroup.Root
						bind:value={$formData.character}
						class="flex flex-row space-y-1"
						name="type"
					>
						<div class="max-w-[21em]">
							<ScrollArea
								orientation="horizontal"
								class="box-border max-w-full overflow-x-auto"
								bind:ref={scrollRef}
							>
								<div class="box-border flex w-full max-w-full flex-row flex-nowrap gap-3">
									{#each data.set.characters as character, index}
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
														<div class="overflow-clip text-center font-medium text-nowrap">
															{character.name}
														</div>
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
				<Form.Button class="w-full rounded-2xl bg-pink-500 hover:bg-pink-800 active:scale-95">Submit</Form.Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>

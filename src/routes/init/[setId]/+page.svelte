<script lang="ts" module>
	import { number, z } from 'zod/v4';

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
					//TODO: upload to firebase here...await the result.
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
						goto(`/wait/${result.gameId}`);
						toast.dismiss();
						//TODO: trigger new toast with infinite wait for waiting for opponet.
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
				<Button variant="link" href="/init">Pick a different set</Button>
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
							<ScrollArea orientation="horizontal" class="box-border max-w-full overflow-x-auto">
								<div class="box-border flex w-full max-w-full flex-row flex-nowrap gap-3">
									{#each data.set.characters as character, index}
										<Form.Control>
											{#snippet children({ props })}
												<Form.Label
													class="flex w-40 items-start gap-2 rounded-lg border p-3 transition-colors has-[[data-state=checked]]:border-blue-600 has-[[data-state=checked]]:bg-blue-800/20"
												>
													<RadioGroup.Item
														value={index}
														{...props}
														class="data-[state=checked]:border-pink-500"
													/>
													<div class="grid gap-1 font-normal">
														<div class="text-center font-medium">{character.name}</div>
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
				</Form.Fieldset>
				<Form.Button class="w-full">Submit</Form.Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>

<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import { shortcuts } from 'svelte-keyboard-shortcuts';
	import FlippableCard from './flippableCard.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { GuessWhoGame } from '$lib/guessWho.svelte';
	import type { Character } from '$lib/models/character';
	let { children, GuessWhoInstance, character, drawerOpen = $bindable(), question = $bindable()}: {children: any, GuessWhoInstance: GuessWhoGame, character: Character, drawerOpen: boolean, question: string} = $props();
	let answerText = $state<string>('');
	let message = $state('');
</script>

<div hidden use:shortcuts={{ keys: ['q'], type: 'callback', fn: () => {drawerOpen = !drawerOpen;}}}></div>
<Drawer.Root bind:open={drawerOpen} dismissible={false}>
	<Drawer.Trigger hidden>{@render children()}</Drawer.Trigger>
	<Drawer.Content >
		<div class="mx-auto w-full max-w-full sm:max-w-sm md:max-w-md">
			<Drawer.Header>
				<Drawer.Title>Answer the Question!</Drawer.Title>
				<Drawer.Description>
					<form
                    method="dialog"
                    onsubmit={async (e) => {
                        e.preventDefault();
						const buttonValue = e.submitter?.getAttribute('id');
						let result = null;
						if(buttonValue == null) {
							//user submitted a text response.
							result = await GuessWhoInstance.answerQuestion(answerText);
						} else {
							// the user clicked a default response.
							result = await GuessWhoInstance.answerQuestion(buttonValue);
						}
						if(result != true) {
								message = result.message;
								return;
						} else {
							drawerOpen = false;
							answerText = '';
							message = '';
						}
                        drawerOpen = false;
                    }}
						class='flex flex-col gap-2'
                        >
                        <span class='text-xl'>
                            Question: {question}
                        </span>
                        <div>
                            <FlippableCard character={character} handleFlip={() => {null}} flipped={true} index={0}/>
                        </div>
						{#if message != ''}
							<p>{message}</p>
						{/if}
						<p></p>
						<Label for='custom'>Custom Reponse</Label>
						<Input id='custom' bind:value={answerText} name='custom' type='text' class='w-full outline-pink-500 active:ring-mint-800 rounded-2xl p-3 text-2xl'/>
						<Button id='yes' type='submit' class='w-full bg-mint-500 hover:bg-mint-800 rounded-2xl p-3 text-2xl'>Yes</Button>
                        <Button id='maybe' type='submit'class='w-full bg-blue-600 hover:bg-blue-800 rounded-2xl p-3 text-2xl'>Maybe</Button>
                        <Button id='sometimes' type='submit' class='w-full bg-purple-500 hover:bg-purple-800 rounded-2xl p-3 text-2xl'>Sometimes</Button>
                        <Button id='no' type='submit' class='w-full bg-pink-500 hover:bg-pink-800 rounded-2xl p-3 text-2xl'>No</Button>
					</form>
				</Drawer.Description>
			</Drawer.Header>
			<!-- <Drawer.Footer>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer> -->
		</div>
	</Drawer.Content>
</Drawer.Root>

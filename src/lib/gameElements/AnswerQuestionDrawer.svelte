<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Shortcuts, shortcuts } from 'svelte-keyboard-shortcuts';
	import FlippableCard from './flippableCard.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	let { children, character, drawerOpen = $bindable(), question = $bindable()} = $props();
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
                    onsubmit={(e) => {
                        //e.preventDefault();
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
						<Label for='custom'>Custom Reponse</Label>
						<Input id='custom' name='custom' type='text' class='w-full outline-pink-500 active:ring-mint-800 rounded-2xl p-3 text-2xl'/>
						<Button id='yes' type='submit' class='w-full bg-mint-500 hover:bg-mint-800 rounded-2xl p-3 text-2xl'>Yes</Button>
                        <Button id='yes' type='submit'class='w-full bg-blue-600 hover:bg-blue-800 rounded-2xl p-3 text-2xl'>Maybe</Button>
                        <Button id='yes' type='submit' class='w-full bg-purple-500 hover:bg-purple-800 rounded-2xl p-3 text-2xl'>Sometimes</Button>
                        <Button id='yes' type='submit' class='w-full bg-pink-500 hover:bg-pink-800 rounded-2xl p-3 text-2xl'>No</Button>
					</form>
				</Drawer.Description>
			</Drawer.Header>
			<!-- <Drawer.Footer>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer> -->
		</div>
	</Drawer.Content>
</Drawer.Root>

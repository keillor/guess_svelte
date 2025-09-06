<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	const { triggerWaitingToast, disabled, children } = $props();

	let drawerOpen = $state(false);
	let questionText = $state('');
</script>

<Drawer.Root bind:open={drawerOpen}>
	<Drawer.Trigger {disabled}>{@render children()}</Drawer.Trigger>
	<Drawer.Content >
		<div class="mx-auto w-full max-w-full sm:max-w-sm md:max-w-md">
			<Drawer.Header>
				<Drawer.Title>Ask Away!</Drawer.Title>
				<Drawer.Description>
					<form
						method="dialog"
						onsubmit={(e) => {
							//e.preventDefault();
							triggerWaitingToast();
							drawerOpen = false;
						}}
						class='flex flex-col gap-2'
					>
						<Label for="question" class="font-bold">Question</Label>
						<Input id="question" class='rounded-2xl' name="question" bind:value={questionText} required aria-required />
						<Button type='submit' class='w-full bg-pink-500 hover:bg-pink-800 rounded-2xl p-3 text-2xl'>Submit</Button>
					</form>
				</Drawer.Description>
			</Drawer.Header>
			<Drawer.Footer>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>

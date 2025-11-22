<script lang="ts">
	import { resolve } from '$app/paths';
import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import LooseAnimation from './animations/LooseAnimation.svelte';
	import WinAnimation from './animations/WinAnimation.svelte';
	let { isOpen = $bindable(), playerWon = $bindable() } = $props();

	const starColors = 	['pink-500', 'pink-800', 'purple-500', 'purple-800', 'blue-600', 'blue-800'];
	const starValues = 	['top-5 left-15', 'left-70 bottom-2', 'left-30 bottom-8', 'top-5 left-60' , 'left-5 bottom-0', 'left-40 bottom-20'];
</script>

<AlertDialog.Root bind:open={isOpen}>
	<!-- <AlertDialog.Trigger class={buttonVariants({ variant: 'outline' })}>
		Show Results
	</AlertDialog.Trigger> -->
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>The results are in...</AlertDialog.Title>
			<AlertDialog.Description>
				{#if playerWon}
					<WinAnimation/>
				{:else}
					<LooseAnimation/>
				{/if}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<!-- <AlertDialog.Cancel class='rounded-2xl'>Close Screen</AlertDialog.Cancel> -->
			<Button href={resolve('/')} class='rounded-2xl bg-pink-500 hover:bg-pink-800 cursor-default'>Start a New Game</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

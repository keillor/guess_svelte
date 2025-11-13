<script>
	import { Button } from '$lib/components/ui/button';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import GeneralLoading from '$lib/gameElements/animations/generalLoading.svelte';
	import StarExample from '$lib/gameElements/animations/starExample.svelte';
	import WinAnimation from '$lib/gameElements/animations/WinAnimation.svelte';
	import GameResultsModal from '$lib/gameElements/GameResultsModal.svelte';

	let isOpen = $state(false);
	let isWinner = $state(true);
</script>

<h2 class="w-min rounded-2xl border-2 border-black bg-mint-500 p-3 text-2xl">Tests</h2>

<ul class="flex flex-col gap-5">
	<li>
		<span class="flex flex-row gap-3">
			<Label for="winner">Did Player Win?</Label>
			<Switch id="winner" bind:checked={isWinner} />
		</span>
        <GameResultsModal {isOpen} playerWon={isWinner} />
	</li>

	<li><StarExample /></li>

	<li>
		<Label for="stalledLoad">Simulate Stalled Load</Label>
		<Button id="stalledLoad" href="/test/stalledLoadFunction">Link</Button>
	</li>
</ul>

<style>
	li {
		border: dashed black;
		border-color: black;
	}
</style>

<script>
	import Label from "$lib/components/ui/label/label.svelte";
	import { Switch } from "$lib/components/ui/switch";
	import GeneralLoading from "$lib/gameElements/animations/generalLoading.svelte";
	import StarExample from "$lib/gameElements/animations/starExample.svelte";
	import GameResultsModal from "$lib/gameElements/GameResultsModal.svelte";

    let isOpen = $state(false);
    let isWinner = $state(true);

</script>

<div>
    <h2 class='font-bold underline text-xl'>tests</h2>
    <span class='flex flex-row gap-3'>
        <Label for='winner'>Did Player Win?</Label>
        <Switch id='winner' bind:checked={isWinner} />
    </span>
</div>
<GameResultsModal {isOpen} playerWon={isWinner} />


<StarExample/>

<a href='/test/stalledLoadFunction'>test</a>
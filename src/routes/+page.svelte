<script>
	import FlippableCard from "$lib/gameElements/flippableCard.svelte";
	let flipArray = $state(Array(24).fill(true));
	let remaining = $derived(flipArray.reduce((accumulator, value) => accumulator + (value ? 1 : 0), 0))

	/**
	 * @param {number} index
	 */
	function handleFlip(index) {
		flipArray[index] = !flipArray[index]
		//flipArray = flipArray.map((value, i) => i == index ? !value : value);
	}

</script>
remaining cards: {remaining}
<div class='flippableContainer'>
	{#each [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23] as number}
		<FlippableCard name={number} handleFlip={handleFlip} index={number} flipped={flipArray[number]}/>
	{/each}
</div>


<style>
.flippableContainer {
	display: flex;
	flex-wrap: wrap;
	/*grid-template-columns: repeat(3, minmax(0, 1fr));*/
	gap: 0.5em;
	flex-direction: row;
}
</style>
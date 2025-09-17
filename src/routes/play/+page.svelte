<script lang='ts'>
import FlippableCard from '$lib/gameElements/flippableCard.svelte';
	import GameNavigationButtons from '$lib/gameElements/GameNavigationButtons.svelte';
	import Sidebar from '$lib/gameElements/Sidebar.svelte';
	import { GuessWhoGame, playerId } from '$lib/guessWho.svelte';
	import { Character } from '$lib/models/character';
	import { onDestroy } from 'svelte';
	import { shortcuts } from 'svelte-keyboard-shortcuts';
	let GuessWhoInstance = $state(new GuessWhoGame('myGame', '', true, playerId.playerA));
	let flipArray = $state(Array(24).fill(true));
	let remaining = $derived(
		flipArray.reduce((accumulator, value) => accumulator + (value ? 1 : 0), 0)
	);
3
	function handleFlip(index: number) {
		flipArray[index] = !flipArray[index];
		//flipArray = flipArray.map((value, i) => i == index ? !value : value);
	}
	const exampleImg = 'https://images.pexels.com/photos/3789888/pexels-photo-3789888.jpeg';
	const dummyCharacter = new Character('Elizabeth', exampleImg);
	const characterData : Character[] = Array(24).fill(dummyCharacter);

	onDestroy(() => {
		GuessWhoInstance.destroy();
	})
</script>

<main class='gameboard'>
	<Sidebar {dummyCharacter} {remaining}/>
	<div class="flippableContainer">
		{#each characterData as character, i}
			<FlippableCard {character} {handleFlip} index={i} flipped={flipArray[i]} />
		{/each}
	</div>
</main>
<GameNavigationButtons {GuessWhoInstance} {characterData} {flipArray} selectedCharacter={dummyCharacter}/>

<div hidden>
	<button class='items-center' use:shortcuts={{ keys: ['d'], type: 'callback', fn: () => {
		for(let i = 0; i < flipArray.length; i++) {
			flipArray[i] = false;
		}
	}}} hidden>Flip All Up!</button>
	<button class='items-center' use:shortcuts={{ keys: ['u'], type: 'callback', fn: () => {
		for(let i = 0; i < flipArray.length; i++) {
			flipArray[i] = true;
		}
	}}} hidden>Flip All Down!</button>
</div>

<style>
	.gameboard {
		max-width: 100vw;
		padding: 1em;
		@media (width >= 60rem /* 768px */) {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
		}

	}
	.flippableContainer {
		display: grid;
		flex-wrap: wrap;
		width: 100%;
		justify-items: center;
		gap: 0.25em;
		flex-direction: row;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		@media (width >= 40rem /* 640px */) {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
		@media (width >= 48rem /* 768px */) {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
	}
</style>

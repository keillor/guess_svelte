<script lang='ts'>
	import FlippableCard from '$lib/gameElements/flippableCard.svelte';
	import GameNavigationButtons from '$lib/gameElements/GameNavigationButtons.svelte';
	import GameResultsModal from '$lib/gameElements/GameResultsModal.svelte';
	import Sidebar from '$lib/gameElements/Sidebar.svelte';
	import { GuessWhoGame, playerId } from '$lib/guessWho.svelte';
	import { Character } from '$lib/models/character';
	import type { CharacterSet } from '$lib/models/CharacterSet.svelte';
	import { onDestroy } from 'svelte';
	import { shortcuts } from 'svelte-keyboard-shortcuts';
	const { data } : { data: {game: GuessWhoGame, characters: CharacterSet} } = $props();
	let GuessWhoInstance = $state(data.game);
	let flipArray = $state(Array(24).fill(true));
	let remaining = $derived(
		flipArray.reduce((accumulator, value) => accumulator + (value ? 1 : 0), 0)
	);
3
	function handleFlip(index: number) {
		flipArray[index] = !flipArray[index];
	}
	const characterData : Character[] = data.characters.characters;

	onDestroy(() => {
		GuessWhoInstance.destroy();
	})
</script>

<main class='gameboard'>
	<Sidebar myCharacter={data.game.playerId === playerId.playerA ? data.game.ACharacter : data.game.BCharacter} {remaining}/>
	<div class="flippableContainer">
		{#each characterData as character, i}
			<FlippableCard {character} {handleFlip} index={i} flipped={flipArray[i]} />
		{/each}
	</div>
</main>
<GameNavigationButtons {GuessWhoInstance} {characterData} {flipArray} />
<GameResultsModal isOpen={GuessWhoInstance.drawerControl.gameCompleteModalOpen} playerWon={GuessWhoInstance.winner == GuessWhoInstance.playerId}/>

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

<script lang="ts">
	import { QNA } from '$lib/models/question';
	import { shortcuts } from 'svelte-keyboard-shortcuts';
	import AnswerQuestionDrawer from './AnswerQuestionDrawer.svelte';
	import AskQuestionDrawer from './AskQuestionDrawer.svelte';
	import FinalGuessDrawer from './FinalGuessDrawer.svelte';
	import OldQuestionDrawer from './OldQuestionDrawer.svelte';
	import { GuessWhoGame } from '$lib/guessWho.svelte';
	import type { Character } from '$lib/models/character';

	const { GuessWhoInstance, flipArray, characterData, selectedCharacter } : {GuessWhoInstance:GuessWhoGame, flipArray: Array<boolean>, characterData: Character[], selectedCharacter: Character} = $props();

	let answerDrawerOpen = $state(false);
	let mostRecentQuestion = $state('Does your character drink matcha?');
</script>

<div class="actionButtonDiv p-4">
	<button onclick={() => GuessWhoInstance.endTurn()} class={`actionButton ${GuessWhoInstance.drawerControl.navButtonDisabled.isDone ? 'actionButtonGray' : 'actionButtonPurple'}`} disabled={GuessWhoInstance.drawerControl.navButtonDisabled.isDone} tabindex="0">I'm Done</button>

	<AskQuestionDrawer {GuessWhoInstance} disabled={GuessWhoInstance.drawerControl.navButtonDisabled.askQuestion}>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div class={`actionButton ${GuessWhoInstance.drawerControl.navButtonDisabled.askQuestion ? 'actionButtonGray' : 'actionButtonPink'}`} tabindex="0">Ask Question</div>
	</AskQuestionDrawer>

	<OldQuestionDrawer disabled={GuessWhoInstance.drawerControl.navButtonDisabled.oldQuestion} qna={GuessWhoInstance.playerId ? GuessWhoInstance.AQNA : GuessWhoInstance.BQNA} bind:drawerOpen={GuessWhoInstance.drawerControl.oldQUestionDrawerOpen}>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div class={`actionButton shadow-lg ${GuessWhoInstance.drawerControl.navButtonDisabled.oldQuestion ? 'actionButtonGray' : 'actionButtonMint'}`} tabindex="0" >Old Questions</div>
	</OldQuestionDrawer>


	<FinalGuessDrawer {GuessWhoInstance} {characterData} {flipArray} disabled={GuessWhoInstance.drawerControl.navButtonDisabled.takeAGuess}>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div class={`actionButton ${GuessWhoInstance.drawerControl.navButtonDisabled.takeAGuess ? 'actionButtonGray' : 'actionButtonBlue'}`} tabindex="0">Take A Guess</div>
	</FinalGuessDrawer>

	<AnswerQuestionDrawer {GuessWhoInstance} bind:drawerOpen={GuessWhoInstance.drawerControl.answerDrawerOpen} bind:question={GuessWhoInstance.drawerControl.mostRecentQuestion} character={selectedCharacter}>d</AnswerQuestionDrawer>
</div>

<style>
	.actionButtonDiv {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		width: 100%;
		gap: 1em;
		justify-items: center;
		@media (width >= 40rem /* 640px */) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		@media (width >= 76rem /* 768px */) {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
	.actionButton {
		border-radius: var(--radius-4xl);
		padding: 0.5em;
		font-size: var(--text-3xl);
		color: var(--color-white);
		background-color: var(--color-gray-400);
		--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
		box-shadow:
			var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
			var(--tw-ring-shadow), var(--tw-shadow);
		transition: all 0.4s;
		width: 10em;
	}
	.actionButton:hover:not([data-disabled]) {
		transform: translate(0.1em, 0.1em);
		box-shadow: none;
		transition: all 0.4s;
	}
	.actionButtonPurple {
		background-color: var(--color-purple-500);
	}
	.actionButtonPink {
		background-color: var(--color-pink-300);
	}
	.actionButtonMint {
		background-color: var(--color-mint-500);
	}
	.actionButtonBlue {
		background-color: var(--color-blue-400);
	}
	.actionButtonGray {
		background-color: var(--color-gray-400);
		cursor: not-allowed;
	}
</style>

<script lang="ts">
	import { QNA } from '$lib/models/question';
	import { shortcuts } from 'svelte-keyboard-shortcuts';
	import AnswerQuestionDrawer from './AnswerQuestionDrawer.svelte';
	import AskQuestionDrawer from './AskQuestionDrawer.svelte';
	import FinalGuessDrawer from './FinalGuessDrawer.svelte';
	import OldQuestionDrawer from './OldQuestionDrawer.svelte';

	const { activeButtons, handleToastWaiting, flipArray, characterData, selectedCharacter } = $props();

	let answerDrawerOpen = $state(false);
	let oldQUestionDrawerOpen = $state(false);
	let mostRecentQuestion = $state('Does your character drink matcha?');
	let qna = $state([new QNA('Does your character drink matcha?', 'Yes'), new QNA('Are they kinda slutty?', 'YES')]);

	function testAddValue() {
		qna.push(new QNA('Test question', 'test answer'));
		oldQUestionDrawerOpen = true;
	}
</script>

<div class="actionButtonDiv p-4">
	<button class="actionButton actionButtonPurple" disabled={!activeButtons[0]} tabindex="0">I'm Done</button>

	<AskQuestionDrawer triggerWaitingToast={handleToastWaiting} disabled={!activeButtons[1]}>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div class="actionButton actionButtonPink" tabindex="0">Ask Question</div>
	</AskQuestionDrawer>

	<OldQuestionDrawer disabled={!activeButtons[2]} {qna} bind:drawerOpen={oldQUestionDrawerOpen}>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div class="actionButton actionButtonMint shadow-lg" tabindex="0">Old Questions</div>
	</OldQuestionDrawer>


	<FinalGuessDrawer {characterData} {flipArray} disabled={!activeButtons[3]}>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div class="actionButton actionButtonBlue" tabindex="0">Take A Guess</div>
	</FinalGuessDrawer>

	<AnswerQuestionDrawer disabled={false} bind:drawerOpen={answerDrawerOpen} bind:question={mostRecentQuestion} character={selectedCharacter}>d</AnswerQuestionDrawer>

	<button hidden use:shortcuts={{ keys: ['a'], type: 'callback', fn: () => {oldQUestionDrawerOpen = !oldQUestionDrawerOpen;}}}>add question and select</button>
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
		background-color: black;
		--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
		box-shadow:
			var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
			var(--tw-ring-shadow), var(--tw-shadow);
		transition: all 0.4s;
		width: 10em;
	}
	.actionButton:hover:not([disabled]) {
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
	.actionButton[disabled] {
		background-color: var(--color-gray-400);
		cursor: not-allowed;
	}
</style>

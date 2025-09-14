import { GuessWhoGame, playerId } from '$lib/guessWho.svelte';
import { GameState } from './gameState';

export class DrawerControl {
	GuessWhoInstance: GuessWhoGame;
	answerDrawerOpen = $state(false);
	oldQUestionDrawerOpen = $state(false);
	mostRecentQuestion = $state('');
	navButtonDisabled = $state<{
		isDone: boolean;
		askQuestion: boolean;
		oldQuestion: boolean;
		takeAGuess: boolean;
	}>({ isDone: false, askQuestion: false, oldQuestion: false, takeAGuess: false });

	constructor(GuessWhoInstance: GuessWhoGame) {
		this.GuessWhoInstance = GuessWhoInstance;
	}
	update() {
		if (this.GuessWhoInstance.isYourTurn()) {
			// IT IS YOUR TURN
			if (this.GuessWhoInstance.gameState == GameState.ASKING) {
				// enable all buttons.
                this.enableAllButtons();
			} else if (this.GuessWhoInstance.gameState == GameState.AWAITANSWER) {
				//  TODO: show waiting indicator on toast (waiting for player to answer)
				//  disable all buttons
                this.disableAllButtons();
			} else if (this.GuessWhoInstance.gameState == GameState.ELIMINATING) {
				// disable 'Ask Question', and 'Final Guess' Buttons
				this.disableAllButtons();
                this.navButtonDisabled.isDone = false;
                this.navButtonDisabled.oldQuestion = false;

				// open the oldQuestion drawer and show the new answer.
				this.oldQUestionDrawerOpen = true;
			} else if (this.GuessWhoInstance.gameState == GameState.END) {
				// TODO: trigger win or loss animation
                this.disableAllButtons();
			}
		} else {
			// IT IS YOUR OPPONETS TURN
			// make sure all buttons are disabled.
            this.disableAllButtons();
			if (this.GuessWhoInstance.gameState == GameState.AWAITANSWER) {
				// set most recent question set by player
				if(this.GuessWhoInstance.playerId == playerId.playerA) {
					this.mostRecentQuestion = this.GuessWhoInstance.BQNA[this.GuessWhoInstance.BQNA.length - 1].question;
				} else {
					this.mostRecentQuestion = this.GuessWhoInstance.AQNA[this.GuessWhoInstance.AQNA.length - 1].question;
				}
                this.answerDrawerOpen = true;
			} else if (this.GuessWhoInstance.gameState == GameState.FINALGUESS) {
				// TODO: trigger opponet triggered final guess toast

			} else if (this.GuessWhoInstance.gameState == GameState.END) {
				// TODO: trigger win or loss animation
			}
		}
	}

    disableAllButtons() {
        this.navButtonDisabled.askQuestion = true;
        this.navButtonDisabled.isDone = true;
        this.navButtonDisabled.oldQuestion = true;
        this.navButtonDisabled.takeAGuess = true;
    }

    enableAllButtons() {
        this.navButtonDisabled.askQuestion = false;
        this.navButtonDisabled.isDone = false;
        this.navButtonDisabled.oldQuestion = false;
        this.navButtonDisabled.takeAGuess = false;
    }
}

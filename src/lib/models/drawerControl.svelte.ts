import { GuessWhoGame, playerId } from '$lib/guessWho.svelte';
import { toast } from 'svelte-sonner';
import { GameState } from './GameState';
import ToastWait from '$lib/gameElements/ToastWait.svelte';

export class DrawerControl {
	GuessWhoInstance: GuessWhoGame;
	gameCompleteModalOpen = $state(false);
	answerDrawerOpen = $state(false);
	oldQUestionDrawerOpen = $state(false);
	mostRecentQuestion = $state('');
	navButtonDisabled = $state<{
		isDone: boolean;
		askQuestion: boolean;
		oldQuestion: boolean;
		takeAGuess: boolean;
	}>({ isDone: false, askQuestion: false, oldQuestion: false, takeAGuess: false });
	//toast notifications that cannot be swiped away.
	yourTurnToast : string | number;
	awaitAnswerToast : string | number;

	constructor(GuessWhoInstance: GuessWhoGame) {
		this.GuessWhoInstance = GuessWhoInstance;
		this.yourTurnToast = '';
		this.awaitAnswerToast = '';
	}

	handleAwaitAnswerToast() {
		this.awaitAnswerToast = toast.custom(ToastWait, {
				componentProps: {
					message: "Submitted! Waiting for opponet...",
					loading: true,
				},
				duration: Number.POSITIVE_INFINITY,
				dismissable: false,
			});
	}
	dismissAwaitAnswerToast() {
		toast.dismiss(this.awaitAnswerToast);
		this.awaitAnswerToast = '';
	}
	
	awaitYourTurn() {
		this.yourTurnToast = toast.custom(ToastWait, {
				componentProps: {
					message: "Waiting for your turn...",
					loading: true,
					dismissButton: true,
				},
				duration: Number.POSITIVE_INFINITY,
				dismissable: false,
			});
	}

	dismissAwaitYourTurnToast() {
		toast.dismiss(this.yourTurnToast);
		this.yourTurnToast = '';
	}
	update() {
		if(this.GuessWhoInstance.gameState == GameState.END) {
			this.disableAllButtons();
			this.gameCompleteModalOpen = true;
			toast.dismiss();
		}
		if (this.GuessWhoInstance.isYourTurn()) {
			// IT IS YOUR TURN
			if(this.yourTurnToast) {
				this.dismissAwaitYourTurnToast();
			}
			if (this.GuessWhoInstance.gameState == GameState.ASKING) {
				// enable all buttons.
                this.enableAllButtons();
			} else if (this.GuessWhoInstance.gameState == GameState.AWAITANSWER) {
				//  disable all buttons
                this.disableAllButtons();
				this.handleAwaitAnswerToast();
			} else if (this.GuessWhoInstance.gameState == GameState.ELIMINATING) {
				// disable 'Ask Question', and 'Final Guess' Buttons
				this.dismissAwaitAnswerToast();
				this.disableAllButtons();
                this.navButtonDisabled.isDone = false;
                this.navButtonDisabled.oldQuestion = false;

				// open the oldQuestion drawer and show the new answer.
				this.oldQUestionDrawerOpen = true;
			} else if (this.GuessWhoInstance.gameState == GameState.END) {
                this.disableAllButtons();
			}
		} else {
			if(this.yourTurnToast == '') {
				this.dismissAwaitYourTurnToast();
				this.awaitYourTurn();
			}
			// IT IS YOUR OPPONETS TURN
			// make sure all buttons are disabled.
            this.disableAllButtons();
			if (this.GuessWhoInstance.gameState == GameState.AWAITANSWER) {
				// set most recent question set by player
				console.info(this.GuessWhoInstance.toJSON());
				if(this.GuessWhoInstance.playerId == playerId.playerA) {
					this.mostRecentQuestion = this.GuessWhoInstance.AQNA[this.GuessWhoInstance.AQNA.length - 1].question;
				} else {
					this.mostRecentQuestion = this.GuessWhoInstance.BQNA[this.GuessWhoInstance.BQNA.length - 1].question;
				}
                this.answerDrawerOpen = true;
			} else if (this.GuessWhoInstance.gameState == GameState.FINALGUESS) {
				//NOTE: state not in use. Written in for clairty and expansion
			} else if (this.GuessWhoInstance.gameState == GameState.END) {
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

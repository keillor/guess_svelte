import { toast } from 'svelte-sonner';
import { db } from './db/firebaseInit';
import { Character } from './models/character';
import { QNA } from './models/question';
import {
	doc,
	getDoc,
	setDoc,
	onSnapshot,
	addDoc,
	collection,
	deleteDoc,
	updateDoc,
	arrayUnion
} from 'firebase/firestore';
import { GameState } from './models/gameState';
import { DrawerControl } from './models/drawerControl.svelte';
import ToastError from './gameElements/ToastError.svelte';
import { user } from './db/auth.svelte';

export enum playerId {
	playerA = 0,
	playerB
}

export class GuessWhoGame {
	#unsubscribe: (() => void) | null = null;
	// game settings, configuration
	gameId: string;
	characterSetId: string;

	// state variables
	gameState: GameState;
	isATurn: boolean;
	winner: playerId | null;

	// player data
	playerId: playerId;
	ACharacter: Character | null = $state(null);
	BCharacter: Character | null = $state(null);
	// Questions about 'A's characters (B asked the questions...)
	AQNA: QNA[] = $state([]);
	// Questions about 'B's characters (A asked the questions...)
	BQNA: QNA[] = $state([]);
	drawerControl: DrawerControl;
	players: string[];

	constructor(
		gameId: string,
		characterSetId: string,
		isATurn: boolean,
		playerId: playerId,
		subscribe: boolean = true
	) {
		this.gameId = gameId;
		this.characterSetId = characterSetId;
		this.playerId = $state(playerId);
		this.isATurn = $state(isATurn);
		this.gameState = GameState.INIT;
		this.winner = null;
		this.players = $state([]);
		if (subscribe) {
			this.#unsubscribe = this.subscribeToFirestoreUpdates();
		}
		this.drawerControl = new DrawerControl(this);
	}

	destroy() {
		if (this.#unsubscribe) {
			this.#unsubscribe();
		}
	}

	setSelectedCharacters(ACharacter: Character, BCharacter: Character) {
		this.ACharacter = ACharacter;
		this.BCharacter = BCharacter;
	}

	async endTurn() {
		this.isATurn = !this.isATurn;
		this.gameState = GameState.ASKING;
		try {
			await this.saveToFirestore();
		} catch {
			toast.custom(ToastError, {
				componentProps: {
					loading: false,
					message: 'Error ending turn! Please try again...'
				}
			});
		}
	}

	toJSON() {
		return {
			characterSetId: this.characterSetId,
			playerId: this.playerId,
			isATurn: this.isATurn,
			winner: this.winner,
			gameState: this.gameState,
			ACharacter: this.ACharacter !== null ? this.ACharacter.toJSON() : null,
			BCharacter: this.BCharacter !== null ? this.BCharacter.toJSON() : null,
			AQNA: this.AQNA.map((q) => q.toJSON()),
			BQNA: this.BQNA.map((q) => q.toJSON()),
			players: this.players.map((player) => player),
		};
	}

	static fromJSON(data: any): GuessWhoGame {
		const game = new GuessWhoGame(
			data.gameId,
			data.characterSetId,
			data.isATurn,
			data.playerId ? 0 : 1
		);
		game.winner = data.winner;
		game.gameState = data.gameState;
		game.ACharacter = data.ACharacter ? Character.fromJSON(data.ACharacter) : null;
		game.BCharacter = data.BCharacter ? Character.fromJSON(data.BCharacter) : null;
		game.AQNA = (data.AQNA || []).map((q: any) => QNA.fromJSON(q));
		game.BQNA = (data.BQNA || []).map((q: any) => QNA.fromJSON(q));
		game.players = data.players;
		return game;
	}

	static async createNewGameInFirestore(
		characterSetId: string,
		isATurn: boolean,
		character: Character
	): Promise<GuessWhoGame> {
		const game = new GuessWhoGame('', characterSetId, isATurn, 0, false);
		game.ACharacter = character;
		game.BCharacter = character;
		game.players.push(user.user.uid);
		const docRef = await addDoc(collection(db, 'games'), game.toJSON());
		game.gameId = docRef.id;
		return game;
	}

	async saveToFirestore() {
		console.info(this.toJSON())
		await setDoc(doc(db, 'games', this.gameId), this.toJSON());
		return true;
	}

	static async loadFromFirestore(gameId: string) {
		const snap = await getDoc(doc(db, 'games', gameId));
		if (snap.exists()) {
			let data = snap.data();
			data.gameId = snap.id;
			let game = GuessWhoGame.fromJSON(data);
			if(game.players.at(0) == user.user.uid) {
				//Player A client
				game.playerId = playerId.playerA;
			} else {
				//Player B client
				game.playerId = playerId.playerB;
			}
			return game;
		}
		return null;
	}

	/**
	 *
	 * @returns true if delete was sucsessful. false if delete failed.
	 */
	async deleteFromFirestore() {
		try {
			await deleteDoc(doc(db, 'games', this.gameId));
		} catch (e) {
			return false;
		}
		return true;
	}

	async saveJoinToFirestore() {
		const gameRef = doc(db, 'games', this.gameId);
		try {
			const result = await updateDoc(gameRef, {
				BCharacter: this.BCharacter.toJSON(),
				gameState: this.gameState,
				players: arrayUnion(user.user.uid)
			});
		} catch (e) {
			return false;
		}
		return true;
	}
	async joinGame(character: Character) {
		this.BCharacter = character;
		this.gameState = GameState.ASKING;
		this.players.push(user.user.uid);
		const result = await this.saveJoinToFirestore();
		if(result == false) {
			this.gameState == GameState.INIT;
			this.players.pop();
		}
		return result;
	}

	/**
	 *
	 * @param gameId A valid firebase doc id in the games collection.
	 * @returns true if delete was sucsessful. false if delete failed.
	 */
	static async deleteFromFirestoreStatic(gameId: string) {
		try {
			await deleteDoc(doc(db, 'games', gameId));
		} catch (e) {
			return false;
		}
		return true;
	}

	subscribeToFirestoreUpdates() {
		const unsub = onSnapshot(doc(db, 'games', this.gameId), (snap) => {
			if (snap.exists()) {
				const data = snap.data();
				this.isATurn = data.isATurn;
				this.winner = data.winner;
				this.gameState = data.gameState;
				this.ACharacter = data.ACharacter ? Character.fromJSON(data.ACharacter) : null;
				this.BCharacter = data.BCharacter ? Character.fromJSON(data.BCharacter) : null;
				this.AQNA = (data.AQNA || []).map((q: any) => QNA.fromJSON(q));
				this.BQNA = (data.BQNA || []).map((q: any) => QNA.fromJSON(q));
				this.players = data.players;
			}
			this.drawerControl.update();
		});
		return unsub;
	}

	subscribeToInitComplete() {
		const unsub = onSnapshot(doc(db, 'games', this.gameId), (snap) => {
			if (snap.exists()) {
				const data = snap.data();
				if (data.gameState == GameState.ASKING && data.players.length === 2) {
					return true;
				} else {
					return false;
				}
			}
		});
		return unsub;
	}

	async askQuestion(questionText: string) {
		const question = questionText.trim();
		const regex = /(.|\s)*\S(.|\s)*/;
		if (!regex.test(question)) {
			return { message: 'Question must not be empty' };
		}
		if (this.playerId === playerId.playerA) {
			this.BQNA.push(new QNA(question, ''));
		} else {
			console.log(this);
			this.AQNA.push(new QNA(question, ''));
		}

		this.gameState = GameState.AWAITANSWER;
		try {
			console.log(this.toJSON())
			await this.saveToFirestore();
		} catch (e) {
			console.log(e);
			return { message: 'Something went wrong! Please try again.' };
		}
		return true;
	}

	async answerQuestion(answerText: string) {
		const answer = answerText.trim();
		const regex = /(.|\s)*\S(.|\s)*/;
		if (!regex.test(answer)) {
			return { message: 'Question must not be empty' };
		}
		if (this.playerId === playerId.playerA) {
			this.AQNA[this.AQNA.length - 1].answer = answer;
		} else {
			this.BQNA[this.BQNA.length - 1].answer = answer;
		}
		try {
			this.gameState = GameState.ELIMINATING;
			await this.saveToFirestore();
			return true;
		} catch (e) {
			console.log(e);
			return { message: 'Something went wrong! Please try again.' };
		}
	}

	async takeAGuess(character: Character) {
		//player guessed correctly.
		if (character == (this.playerId == playerId.playerA ? this.BCharacter : this.ACharacter)) {
			this.winner = this.playerId == playerId.playerA ? playerId.playerA : playerId.playerB;
			this.gameState = GameState.END;
			this.saveToFirestore();
		} else {
			//player guessed incorrectly.
			this.winner = this.playerId == playerId.playerA ? playerId.playerB : playerId.playerA;
			this.gameState = GameState.END;
			try {
				await this.saveToFirestore();
			} catch (e) {
				console.log(e);
				return { message: 'Something went wrong! Please try again.' };
			}
		}
		return true;
	}

	isYourTurn() {
		if (
			(this.playerId == playerId.playerA && this.isATurn) ||
			(this.playerId == playerId.playerB && !this.isATurn)
		) {
			return true;
		}
		return false;
	}
}

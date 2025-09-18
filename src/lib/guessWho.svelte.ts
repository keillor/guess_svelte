import { toast } from "svelte-sonner";
import { db } from "./db/firebaseInit";
import { Character } from "./models/character";
import { QNA } from "./models/question";
import { doc, getDoc, setDoc, onSnapshot, FirestoreError } from 'firebase/firestore';
import { GameState } from "./models/gameState";
import { DrawerControl } from "./models/drawerControl.svelte";
import type { FirebaseError } from "firebase/app";
import ToastError from "./gameElements/ToastError.svelte";

export enum playerId {
    playerA = 0,
    playerB
}

export class GuessWhoGame {
    #unsubscribe: (() => void) | null = null;
    // game settings, configuration
    gameId: string;
    characterSetId: string;

    // game state. Determined based on gamestate. (asking | await answer | eliminating | final guess)
    // and the isATurn boolean.
    gameState: GameState;
    isATurn: boolean;
    winner: playerId | null;

    // ***player game data***
    playerId: playerId;
    ACharacter: Character | null = $state(null);
    BCharacter: Character | null = $state(null);
    // Questions about 'A's characters (B asked the questions...)
    AQNA: QNA[] = $state([]);
    // Questions about 'B's characters (A asked the questions...)
    BQNA: QNA[] = $state([]);
    drawerControl : DrawerControl = new DrawerControl(this);
    players: string[];

    constructor(gameId: string, characterSetId: string, isATurn: boolean, playerId: playerId) {
        this.gameId = gameId;
        this.characterSetId = characterSetId;
        this.playerId = $state(playerId);
        this.#unsubscribe = this.subscribeToFirestoreUpdates();
        this.isATurn = $state(isATurn);
        this.gameState = GameState.ASKING;
        this.winner = null;
        this.players = [];
    }

    destroy() {
        if(this.#unsubscribe) {
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
                    message: "Error ending turn! Please try again...",
                }
            })
        }
    }

    toJSON() {
        return {
            gameId: this.gameId,
            characterSetId: this.characterSetId,
            playerId: this.playerId,
            isATurn: this.isATurn,
            winner: this.winner,
            gameState: this.gameState,
            ACharacter: this.ACharacter !== null ? this.ACharacter.toJSON() : null,
            BCharacter: this.BCharacter !== null ? this.BCharacter.toJSON() : null,
            AQNA: this.AQNA.map(q => q.toJSON()),
            BQNA: this.BQNA.map(q => q.toJSON()),
            players: this.players
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

    async saveToFirestore() {
        await setDoc(doc(db, 'games', this.gameId), this.toJSON());
        return true;
    }

    static async loadFromFirestore(gameId: string) {
        const snap = await getDoc(doc(db, 'games', gameId));
        if (snap.exists()) {
            return GuessWhoGame.fromJSON(snap.data());
        }
        return null;
    }

    subscribeToFirestoreUpdates() {
        const unsub = onSnapshot(doc(db, 'games', this.gameId), (snap) => {
            if (snap.exists()) {
                const data = snap.data();
                this.isATurn = data.isATurn;
                this.winner = data.winner;
                this.gameState = data.gameState
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

    async askQuestion(questionText : string) {
        const question = questionText.trim();
        const regex = /(.|\s)*\S(.|\s)*/;
        if(!regex.test(question)) {
            return {message: 'Question must not be empty'};
        }
        if(this.playerId === playerId.playerA) {
            this.BQNA.push(new QNA(question, ''))
        } else {
            console.log(this)
            this.AQNA.push(new QNA(question, ''))
        }

        this.gameState = GameState.AWAITANSWER;

        try {
            await this.saveToFirestore();
        } catch (e) {
            console.log(e);
            return {message: 'Something went wrong! Please try again.'};
        }
        return true;
    }

    async answerQuestion(answerText: string) {
        const answer = answerText.trim();
        const regex = /(.|\s)*\S(.|\s)*/;
        if(!regex.test(answer)) {
            return {message: 'Question must not be empty'};
        }
        if(this.playerId === playerId.playerA) {
            this.BQNA[this.BQNA.length - 1].answer = answer;
        } else {
            this.AQNA[this.AQNA.length - 1].answer = answer;
        }
        try {
            this.gameState = GameState.ELIMINATING;
            await this.saveToFirestore();
            return true;
        } catch (e) {
            console.log(e);
            return {message: 'Something went wrong! Please try again.'};
        }
    }

    async takeAGuess(character: Character) {
            //player guessed correctly.
        if(character == (this.playerId == playerId.playerA ? this.BCharacter : this.ACharacter)) {
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
                return {message: 'Something went wrong! Please try again.'};
            }
        }
        return true;
    }

    isYourTurn() {
        if((this.playerId == playerId.playerA && this.isATurn) || (this.playerId == playerId.playerB && !this.isATurn)) {
            return true;
        }
        return false;
    }
    
}

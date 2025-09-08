import { toast } from "svelte-sonner";
import { db } from "./db/firebaseInit";
import { Character } from "./models/character";
import { QNA } from "./models/question";
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

export enum playerId {
    playerA = 0,
    playerB
}

export class GuessWhoGame {
    #unsubscribe: (() => void) | null = null;
    // game settings, configuration
    gameId: string;
    characterSetId: string;

    // ***player game data***
    playerId: playerId;
    isATurn: boolean;
    finalGuessTriggered: boolean = $state(false);
    playerTriggeredFinalGuess: playerId | null = $state(null);
    ACharacter: Character | null = $state(null);
    BCharacter: Character | null = $state(null);
    AQNA: QNA[] = $state([]);
    BQNA: QNA[] = $state([]);

    constructor(gameId: string, characterSetId: string, isATurn: boolean, playerId: playerId) {
        this.gameId = gameId;
        this.characterSetId = characterSetId;
        this.isATurn = $state(isATurn);
        this.playerId = $state(playerId);
        this.#unsubscribe = this.subscribeToFirestoreUpdates();
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

    endTurn() {
        this.isATurn = !this.isATurn;
    }

    toJSON() {
        return {
            gameId: this.gameId,
            characterSetId: this.characterSetId,
            playerId: this.playerId,
            isATurn: this.isATurn,
            finalGuessTriggered: this.finalGuessTriggered,
            playerTriggeredFinalGuess: this.playerTriggeredFinalGuess,
            ACharacter: this.ACharacter ? this.ACharacter.toJSON() : null,
            BCharacter: this.BCharacter ? this.BCharacter.toJSON() : null,
            AQNA: this.AQNA.map(q => q.toJSON()),
            BQNA: this.BQNA.map(q => q.toJSON()),
        };
    }

    static fromJSON(data: any): GuessWhoGame {
        const game = new GuessWhoGame(
            data.gameId,
            data.characterSetId,
            data.isATurn,
            data.playerId
        );
        game.finalGuessTriggered = data.finalGuessTriggered;
        game.playerTriggeredFinalGuess = data.playerTriggeredFinalGuess;
        game.ACharacter = data.ACharacter ? Character.fromJSON(data.ACharacter) : null;
        game.BCharacter = data.BCharacter ? Character.fromJSON(data.BCharacter) : null;
        game.AQNA = (data.AQNA || []).map((q: any) => QNA.fromJSON(q));
        game.BQNA = (data.BQNA || []).map((q: any) => QNA.fromJSON(q));
        return game;
    }

    async saveToFirestore() {
        try {
            await setDoc(doc(db, 'games', this.gameId), this.toJSON());
        } catch(e) {
            console.log(e);
            toast.error('Error! View console...');
        }
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
                this.finalGuessTriggered = data.finalGuessTriggered;
                this.playerTriggeredFinalGuess = data.playerTriggeredFinalGuess;
                this.ACharacter = data.ACharacter ? Character.fromJSON(data.ACharacter) : null;
                this.BCharacter = data.BCharacter ? Character.fromJSON(data.BCharacter) : null;
                this.AQNA = (data.AQNA || []).map((q: any) => QNA.fromJSON(q));
                this.BQNA = (data.BQNA || []).map((q: any) => QNA.fromJSON(q));
            }
        });
        return unsub;
    }
}

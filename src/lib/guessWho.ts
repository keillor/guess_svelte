import { Character } from "./models/character";
import { QNA } from "./models/question";

export enum playerId {
    playerA = 0,
    playerB
}

export class GuessWhoGame {
    // game settings, configuration
    gameId: string;
    characterSetId: string;

    // ***player game data***
    playerId: playerId;
    isATurn: boolean;
    finalGuessTriggered: boolean = false;
    playerTriggeredFinalGuess: playerId | null = null;
    ACharacter: Character | null = null;
    BCharacter: Character | null = null;
    AQNA: QNA[] = [];
    BQNA: QNA[] = [];

    constructor(gameId: string, characterSetId: string, isATurn: boolean, playerId: playerId) {
        this.gameId = gameId;
        this.characterSetId = characterSetId;
        this.isATurn = isATurn;
        this.playerId = playerId;
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
}

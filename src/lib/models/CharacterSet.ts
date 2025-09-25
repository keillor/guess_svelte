import type { Character } from "./character";

export class CharacterSet {
    characters: Character[];
    setName: string;

    constructor(characters: Character[], setName: string) {
        this.characters = $state(characters);
        this.setName = setName;
    }
}
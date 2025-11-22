import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { GuessWhoGame } from '$lib/guessWho.svelte.js';
import { CharacterSet } from '$lib/models/CharacterSet.svelte.js';

export async function load({ params }) {
	try {
		const game = await GuessWhoGame.loadFromFirestore(params.waitingId);
		const characters = await CharacterSet.fromFirebase(game?.characterSetId);
		//data.game.subscribeToFirestoreUpdates();
		return {
			game: game,
			characters: characters,
		};
	} catch (e) {
		goto(resolve('/404'));
	}
}

import { goto } from '$app/navigation';
import { GuessWhoGame } from '$lib/guessWho.svelte'
import { CharacterSet } from '$lib/models/CharacterSet.svelte';

export async function load({ params }) {
    try {
        const game = await GuessWhoGame.loadFromFirestore(params.gameId);
        const cards = await CharacterSet.fromFirebase(game?.characterSetId);
        return {
            game,
            cards
        }
    } catch (e) {
        goto('/404')
    }
}
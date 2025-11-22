import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { user } from '$lib/db/auth.svelte.js';
import { GuessWhoGame } from '$lib/guessWho.svelte'
import { CharacterSet } from '$lib/models/CharacterSet.svelte';

export async function load({ params }) {
    try {
        const game = await GuessWhoGame.loadFromFirestore(params.gameId);
        const cards = await CharacterSet.fromFirebase(game?.characterSetId);
        if(game?.players.includes(user.user.uid)) {
            if(game?.players.length == 1) {
                // player who created game
                goto(resolve(`/wait/${params.gameId}`));
            } else {
                // both players are present
                goto(resolve(`/play/${params.gameId}`));
            }
        }
        return {
            game,
            cards
        }
    } catch (e) {
        goto(resolve('/join'))
    }
}
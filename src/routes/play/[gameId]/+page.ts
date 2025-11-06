import { goto } from '$app/navigation';
import { user } from '$lib/db/auth.svelte';
import { GuessWhoGame } from '$lib/guessWho.svelte.js';
import { CharacterSet } from '$lib/models/CharacterSet.svelte.js';

export async function load({ params }) {
    try {
        const game = await GuessWhoGame.loadFromFirestore(params.gameId);
        if(game == null) {
            console.info('game does not exist')
            goto('/404');
            return;
        }
        const characters = await CharacterSet.fromFirebase(game?.characterSetId);
        if(game == null) {
            console.info('card does not exist')
            goto('/404');
            return;
        }
        if(!game.players.includes(user.user?.uid)) {
            console.info('player not in game')
            goto('/404');
        }
        return {
            game: game,
            characters: characters,
        }
    } catch (e) {
        console.error('whoops! looks like there was an error...')
        goto('/');
        return;
    }
}
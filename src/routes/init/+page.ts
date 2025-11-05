import { CharacterFetch } from '$lib/models/CharacterFetch.svelte';

export async function load({ url }) {
    const characterFetch = new CharacterFetch(500, 'sets');
    const results = await characterFetch.firstFetch();
    return {
        characterFetch,
        sets: results,
    };
}
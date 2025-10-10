import { goto } from '$app/navigation';
import { CharacterSet } from '$lib/models/CharacterSet.svelte.js';

export async function load({ params, url }) {
    const set = await CharacterSet.fromFirebase(params.setId)
    if(set == null) {
        console.log(set);
        console.log(params.setId);
        goto('/404');
    }
    return {
        set: set,
    };
}
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { CharacterSet } from '$lib/models/CharacterSet.svelte.js';

export async function load({params}) {
    const set = await CharacterSet.fromFirebase(params.setId);
    if(set == null) {
        goto(resolve('/404'));
    }
    return {
        set: set,
    }
}
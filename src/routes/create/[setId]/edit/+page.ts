import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { user } from '$lib/db/auth.svelte.js';
import { CharacterSet } from '$lib/models/CharacterSet.svelte.js';

export async function load({params}) {
    const set = await CharacterSet.fromFirebase(params.setId);
    if(set === null) {
        goto(resolve('/404'));
    }
    if(user.user.uid != set.userId) {
        //if you are not the owner, redirect to the view page.
        goto(resolve(`/set/${params.setId}`));
    }
    return {
        set: set,
    }
}
import { goto } from "$app/navigation";
import { CharacterSet } from "$lib/models/CharacterSet.svelte";

export async function load({ params }) {
    const set = await CharacterSet.fromFirebase(params.setId)
    if(set == null) {
        goto('/404');
    }
    return {
        set: await CharacterSet.fromFirebase(params.setId),
    }
}
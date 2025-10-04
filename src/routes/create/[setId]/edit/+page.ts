import { goto } from '$app/navigation';
import { user } from '$lib/db/auth.svelte.js';
import ToastError from '$lib/gameElements/ToastError.svelte';
import { CharacterSet } from '$lib/models/CharacterSet.svelte.js';
import { toast } from 'svelte-sonner';

export async function load({params}) {
    const set = await CharacterSet.fromFirebase(params.setId);
    if(set === null) {
        goto('/404');
    }
    if(user.user.uid != set.userId) {
        goto(`/set/${params.setId}`);
        toast.custom(ToastError, {
            componentProps: {
                loading: false,
                message: 'You do not have permission to edit this set.'
            }
        })
    }
    return {
        set: set,
    }
}
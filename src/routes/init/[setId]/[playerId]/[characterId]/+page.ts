import { goto } from '$app/navigation';

export async function load({ params }) {
    if(params.playerId !== '0' && params.playerId !== '1') {
        goto('/404');
    }
    return {
        playerId: Number(params.playerId),
        characterId: params.characterId,
        setId: params.setId,
    }
}
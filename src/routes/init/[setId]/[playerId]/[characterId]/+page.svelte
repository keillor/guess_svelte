<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

    const { data } = $props();

    console.log(data);
</script>

<div class='flex flex-col items-center p-3'>
    <h1 class='text-center text-2xl bg-pink-500 w-fit p-3 rounded-2xl'>Waiting Room</h1>
</div>
<div>
    set: {data.setId}
</div>

<div>
    who will go first: {data.playerId ? 'Player B' : 'Player A'}
</div>

<div>
    your secret character: {data.characterId}
</div>
<Button variant='outline' class='bg-blue-600 hover:bg-blue-800 border-blue-500' onclick={() => navigator.clipboard.writeText('TODO')}>Copy Link</Button>
<Button variant='outline' class='bg-pink-500 hover:bg-pink-800 border-pink-500' onclick={() => history.back()}>Cancel Game</Button>

<ul>
    <li>
        <input type='checkbox'/>
        TODO: reroute once second player is here...
    </li>
    <li>
        <input type='checkbox'/>
        TODO: generate link to give to other player
    </li>
</ul>
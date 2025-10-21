<script lang='ts'>
	import ViewaleCard from '$lib/gameElements/ViewaleCard.svelte';

    const { data } = $props();
</script>
<h1>
    Join Game
</h1>

<p>Pick your character</p>
{#each data.cards?.characters as character}
<ViewaleCard {character}/>
{/each}
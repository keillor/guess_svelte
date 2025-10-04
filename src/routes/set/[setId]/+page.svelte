<script lang='ts'>
	import { user } from '$lib/db/auth.svelte';
	import SetDeleteConfirmation from '$lib/gameElements/view/SetDeleteConfirmation.svelte';
	import ViewaleCard from '$lib/gameElements/ViewaleCard.svelte';

    const { data } = $props();
</script>
<div class='p-4'>
	<div class='text-center'>
		<h1 class='text-3xl font-bold'>Set: <span>{data.set.setName}</span></h1>
	</div>
    <div class='grid grid-cols-2 md:flex justify-center justify-items-center gap-5'>
		<!-- TODO: just play with set link in the line below -->
        <a href='/' class='bg-mint-500 hover:bg-mint-800 transition-all p-2 rounded-2xl text-xl w-40 outline-1 text-center cursor-default'>Play</a>
        <a href={`/create/${data.set.docId}/copy`} class='bg-purple-500 hover:bg-purple-800 transition-all p-2 rounded-2xl text-xl w-40 outline-1 text-center cursor-default'>Copy</a>
        {#if data.set.userId == user.user.uid}
		<SetDeleteConfirmation setId={data.set?.docId}>
            <div class='bg-pink-500 hover:bg-pink-800 transition-all p-2 rounded-2xl text-xl w-40 outline-1'>Delete</div>
		</SetDeleteConfirmation>
            <a href={`/create/${data.set.docId}/edit`} class='bg-blue-600 hover:bg-blue-800 transition-all p-2 rounded-2xl text-xl w-40 outline-1 text-center cursor-default'>Edit</a>
        {/if}
    </div>
	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-10 justify-items-center p-2">
		{#each data.set.characters as character, index}
			<ViewaleCard {character}/>
		{/each}
	</div>
</div>
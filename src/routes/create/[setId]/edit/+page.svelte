<script lang='ts'>
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import EditableCard from "$lib/gameElements/editableCard.svelte";
    let { data } = $props();
</script>
<div class='p-4'>
	<div class='flex flex-row justify-center'>
		<h1 class='text-3xl font-bold'>Edit Character Set</h1>
	</div>
	
	<form onsubmit={async (e) => await data.set.handleUpdate(e)}>
		<div class='flex flex-col md:w-md gap-2 justify-content-center'>
			<Label for='setName'>Set Name</Label>
			<Input id='setName' bind:value={data.set.setName}/>
			<button disabled={data.set.submitted !== ''} class='outline-1 rounded-sm w-full bg-mint-500 hover:bg-mint-800 hover:text-white transition-colors disabled:bg-gray-500'>Save Changes</button>
		</div>
	</form>
	
	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 w-full justify-items-center">
		{#each data.set.characters as _, index}
			<EditableCard characterData={data.set.characters} {index}/>
		{/each}
	</div>
</div>



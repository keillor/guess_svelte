<script lang='ts'>
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import EditableCard from "$lib/gameElements/editableCard.svelte";
	import { CharacterSet } from "$lib/models/CharacterSet.svelte";
	import { CreateCharacter } from "$lib/models/CreateCharacter.svelte";
	import { generateName } from "$lib/utils/randomName";
    let rawCharacters : CreateCharacter[] = [];

    for(let i = 0; i < 24; i++) {
        rawCharacters.push(new CreateCharacter(generateName(), 'https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg'));
    }

	const characterSet : CharacterSet = new CharacterSet(rawCharacters, '');

</script>
<div class='p-4'>
	<div class='flex flex-row justify-center'>
		<h1 class='text-3xl font-bold'>Create Character Set</h1>
	</div>
	
	<form onsubmit={async (e) => await characterSet.handleSubmit(e)}>
		<div class='flex flex-col md:w-md gap-2 justify-content-center'>
			<Label for='setName'>Set Name</Label>
			<Input id='setName' bind:value={characterSet.setName}/>
			<button disabled={characterSet.submitted !== ''} class='outline-1 rounded-sm w-full bg-pink-300 hover:bg-pink-500 hover:text-white transition-colors disabled:bg-gray-500'>Save</button>
		</div>
	</form>
	
	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 w-full justify-items-center">
		{#each characterSet.characters as _, index}
			<EditableCard characterData={characterSet.characters} {index}/>
		{/each}
	</div>
</div>



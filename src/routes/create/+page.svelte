<script lang='ts'>
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import EditableCard from "$lib/gameElements/editableCard.svelte";
	import { CreateCharacter } from "$lib/models/CreateCharacter.svelte";

    let setName = $state('');

    let characterData = $state<CreateCharacter[]>([]);
	let dict = $state<Record<string, any>>({});

    for(let i = 0; i < 24; i++) {
        characterData.push(new CreateCharacter('', 'https://images.pexels.com/photos/4016579/pexels-photo-4016579.jpeg'))
    }
	

	function handleSubmit(e: SubmitEvent, setName: string, characterData: CreateCharacter[]) {
		e.preventDefault();
	}
</script>
<div class='flex flex-row justify-center'>
    <h1 class='text-3xl font-bold'>Create Character Set</h1>
</div>

<form onsubmit={(e) => handleSubmit(e, setName, characterData)}>
	<div class='flex flex-col md:w-md gap-2 justify-content-center'>
		<Label for='setName'>Set Name</Label>
		<Input id='setName' bind:value={setName}/>
		<button class='outline-1 rounded-sm w-full bg-mint-500 hover:bg-mint-800 hover:text-white transition-colors'>Save</button>
	</div>
</form>

<div class='text-gray-500 italic'>
	Please note: Each character must have a unique name.
</div>

<div class='flippableContainer'>
    {#each characterData as _, index}
        <EditableCard {characterData} {index}/>
    {/each}
</div>


<style>
    .flippableContainer {
		display: grid;
		flex-wrap: wrap;
		width: 100%;
		justify-items: center;
		gap: 1em;
		flex-direction: row;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		@media (width >= 40rem /* 640px */) {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
		@media (width >= 48rem /* 768px */) {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
	}
</style>



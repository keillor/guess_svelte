<script lang='ts'>
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import CreateInstructions from "$lib/gameElements/create/CreateInstructions.svelte";
	import EditableCard from "$lib/gameElements/editableCard.svelte";
	import ToastWait from "$lib/gameElements/ToastWait.svelte";
	import { CreateCharacter } from "$lib/models/CreateCharacter.svelte";
	import { toast } from "svelte-sonner";

    let setName = $state('');
	let message = $state('');
	let submitted = $state(false);

    let characterData = $state<CreateCharacter[]>([]);

    for(let i = 0; i < 24; i++) {
        characterData.push(new CreateCharacter('', 'http://localhost'));
    }

	function handleSubmit(e: SubmitEvent, setName: string, characterData: CreateCharacter[]) {
		e.preventDefault();
		submitted = true;
		toast.custom(ToastWait, {
			componentProps: {
				loading: true,
				message: 'Submitting data...'
			}
		})
		if(setName.trim() == '') {
			message = 'Set name must must not be empty.';
			submitted = false;
			return;
		}
		if(namesPresent(characterData) == false) {
			message = 'All characters must have non-empty names.';
			submitted = false;
			return;
		}
		message = '';
	}

	function namesPresent(characterData: CreateCharacter[]) {
		for(let character of characterData) {
			if(character.name.trim() == '') {
				return false;
			}
		}
	}

	
</script>
<div class='flex flex-row justify-center'>
    <h1 class='text-3xl font-bold'>Create Character Set</h1>
</div>

<form onsubmit={(e) => handleSubmit(e, setName, characterData)}>
	<div class='flex flex-col md:w-md gap-2 justify-content-center'>
		<Label for='setName'>Set Name</Label>
		<Input id='setName' bind:value={setName}/>
		{#if message != ''}
		<p>{message}</p>
		{/if}
		<button disabled={submitted} class='outline-1 rounded-sm w-full bg-pink-300 hover:bg-pink-500 hover:text-white transition-colors disabled:bg-gray-500'>Save</button>
	</div>
</form>
<CreateInstructions />

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



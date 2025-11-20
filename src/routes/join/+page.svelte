<script lang='ts'>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import ToastError from '$lib/gameElements/ToastError.svelte';
	import { toast } from 'svelte-sonner';

	let gameId = $state('');

	async function handlePaste(e: SubmitEvent) {
		e.preventDefault();
		try {
			const clipboard = await navigator.clipboard.readText();
			const regex =
				/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
			if (!regex.test(clipboard)) {
				gameId = clipboard;
			}
			gameId = clipboard.substring(clipboard.lastIndexOf('/') + 1, clipboard.length);
			return;
		} catch (e) {
			toast.custom(ToastError, {
				componentProps: {
					message: 'Error pasting from clipboard',
					loading: false
				}
			});
		}
	}

	function handleJoin(e: SubmitEvent) {
		e.preventDefault();
		if(gameId) {
			goto(`/join/${gameId}`);
		} else {
			toast.custom(ToastError, {
				componentProps: {
					loading: false,
					message: 'Please enter a valid Game ID...	'
				}
			})
		}
	}
</script>

<div class="m-3 flex flex-col items-center">
	<h1 class="w-fit rounded-2xl bg-purple-500 p-3 text-2xl text-white">Join A Game</h1>
	<h2>Please enter a game ID to join a game.</h2>
	<h3 class='text-gray-600 italic'>
		Looking to create a game?
		<a class="link" href="/init">Click here</a>
	</h3>
</div>

<div class="flex flex-col items-center">
	<div class="flex w-full flex-col gap-3 sm:max-w-md">
		<form onsubmit={(e) => handleJoin(e)}>
			<Label for="gameId">Game ID:</Label>
			<Input id="gameId" bind:value={gameId} />
			<div class="flex flex-row justify-around">
				<Button
					type='button'
					variant="outline"
					class="w-1/2 border-pink-500 bg-pink-500 hover:bg-pink-800"
					onclick={(e) => handlePaste(e)}>Paste</Button
				>
				<Button
					variant="outline"
					type='submit'
					class="w-1/2 border-blue-600 bg-blue-600 hover:bg-blue-800"
					>Join</Button
				>
			</div>
		</form>
	</div>
</div>

<style>
	.link {
		position: relative;
		}
	.link:after {
		content: '';
		position: absolute;
		width: 0;
		bottom: -0.25em;
		height: 3px;
		display: block;
		margin-top: 5px;
		right: 0;
		background: #fff;
		transition: width 0.2s ease;
		-webkit-transition: width 0.2s ease;
	}

	.link:hover:after {
		width: 100%;
		left: 0;
		background: #fff;
	}
</style>

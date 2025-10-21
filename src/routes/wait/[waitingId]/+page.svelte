<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	import ToastWait from '$lib/gameElements/ToastWait.svelte';
	import ViewaleCard from '$lib/gameElements/ViewaleCard.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { toast } from 'svelte-sonner';
	import ToastError from '$lib/gameElements/ToastError.svelte';
	import { goto } from '$app/navigation';

	const { data } = $props();

	async function handleCopyLink(isLink: boolean) {
		let failed = false;
		if (isLink) {
			const host = window.location.host;
			const result = navigator.clipboard.writeText(`${host}/join/${data.game.gameId}`);
			await result
				.then(() => {})
				.catch(() => {
					//write failed.
					failed = true;
				});
		} else {
			// is just lobby code
			const result = navigator.clipboard.writeText(data.game.gameId);
			await result
				.then(() => {})
				.catch(() => {
					//write failed.
					failed = true;
				});
		}
		if (failed) {
			toast.custom(ToastError, {
				componentProps: {
					message: 'Failed to copy to clipboard',
					loading: false
				},
				duration: 3000
			});
			return;
		}
		toast.custom(ToastWait, {
			componentProps: {
				message: isLink ? 'Invite link coppied to clipboard' : 'Game ID coppied to clipboard',
				loading: false
			},
			duration: 3000
		});
	}

    async function handleCancel() {
        const deleted = await data.game?.deleteFromFirestore();
        if(deleted) {
            toast.custom(ToastWait, {
                componentProps: {
                    message: 'Game deleted. Returning to home...',
                    loading: false,
                },
                duration: 3000
            })
            setTimeout(() => {
                goto('/');
            }, 3000);
        } else {
            toast.custom(ToastError, {
                componentProps: {
					message: 'Error deleting game!',
					loading: false
				}
            })
        }
    }

</script>

<div class="m-3 flex flex-col items-center">
	<h1 class="w-fit rounded-xl bg-pink-500 p-3 text-2xl text-white">Waiting Room</h1>
</div>
<div>
	Room Id: {page.params.waitingId}
</div>

<div>
	who will go first: {data.game?.isATurn ? 'Player A' : 'Player B'}
</div>

<div>
	
</div>

<Card.Root>
	<Card.Header
		>Game ID: {page.params.waitingId}
		<Card.Description
			>Give this link or lobby code to your opponet. The page will refresh when they are loaded into
			the game.</Card.Description
		>
	</Card.Header>
	<Card.Content>
        <div>
            <Button
                variant="outline"
                class="border-blue-500 bg-blue-600 hover:bg-blue-800"
                onclick={() => handleCopyLink(true)}>Copy Link</Button
            >
            <Button
                variant="outline"
                class="border-purple-500 bg-purple-500 hover:bg-purple-800"
                onclick={() => handleCopyLink(false)}>Copy Code</Button
            >
            <Button
                variant="outline"
                class="border-pink-500 bg-pink-500 hover:bg-pink-800"
                onclick={async () => handleCancel()}>Cancel Game</Button
            >
        </div>
	</Card.Content>
</Card.Root>

your secret character:
<ViewaleCard character={data.game?.ACharacter} />
<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Shortcuts } from 'svelte-keyboard-shortcuts';
	import { toast, Toaster } from 'svelte-sonner';
	import { login, user } from '$lib/db/auth.svelte';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import ToastError from '$lib/gameElements/ToastError.svelte';
	import ToastWait from '$lib/gameElements/ToastWait.svelte';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
	let errorToastId : number | string = '';
	onMount(() => {
		window.addEventListener('offline', () => {
			if(errorToastId === '') {
				errorToastId = toast.custom(ToastError, {
					componentProps: {
						loading: true,
						message: 'Connection lost! Attempting to reconnect...'
					},
					dismissable: false,
					duration: Number.POSITIVE_INFINITY
				})
			}
		});
		window.addEventListener('online', () => {
			if(errorToastId !== '') {
				toast.dismiss(errorToastId);
				errorToastId = '';
				toast.custom(ToastWait, {
					componentProps: {
						message: 'Connection restored!',
						loading: false
					},
					duration: 3000,
				})
			}
		});
	});

	let { children } = $props();
</script>

<Shortcuts options={{ generateKbd: false }} />
<Toaster richColors />
<svelte:head>
	<title>Guest Who</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if user.user === null}
	<div class="flex h-screen w-full flex-col items-center justify-center gap-3">
		<h1 class="rounded-2xl bg-purple-500 p-3 text-3xl text-white">To continue, please sign in.</h1>
		<button onclick={login} aria-label="Continue With Google">
			<img src="./google_continue.svg" alt="Continue with Google" />
		</button>
	</div>
{:else}
	{@render children?.()}
{/if}

<script lang="ts">
	import { app } from '$lib/db/firebaseInit';
	import {
		getAuth,
		GoogleAuthProvider,
		onAuthStateChanged,
		signInWithPopup,
		type User
	} from 'firebase/auth';
	import { slide } from 'svelte/transition';

	const provider = new GoogleAuthProvider();
	const auth = $state(getAuth(app));
	let user = $state<User | null>(null);
	onAuthStateChanged(auth, (u) => {
		if (u) {
			//user signed in
			user = u;
		} else {
			//user signed out
			user = null;
		}
	});

	async function signIn() {
		try {
			const result = await signInWithPopup(auth, provider);
			//user = result.user;

			// handle user info
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.customData?.email;
			const credential = GoogleAuthProvider.credentialFromError(error);
			// handle error
		}
	}
</script>

{#key user}
	<div transition:slide>
		{#if user === null}
			<button onclick={signIn} aria-label="Continue With Google" class='p-3'>
                <img src='./google_continue.svg' alt='Continue with Google'/>
            </button>
		{:else}
			<div>
				Hi {auth.currentUser?.displayName?.split(' ')[0]}!
			</div>
			<div>
				<button onclick={() => console.log(user)}>log user</button>
				<button
					onclick={async () => auth.signOut()}
					class="rounded-2xl bg-pink-500 p-3 shadow-2xl transition-all hover:bg-pink-800 hover:text-white"
					>log out</button
				>
			</div>
		{/if}
	</div>
{/key}

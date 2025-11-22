<script lang="ts">
	import { asset } from '$app/paths';
import { login, logout, user } from '$lib/db/auth.svelte';
	import { slide } from 'svelte/transition';
</script>

{#key user}
	<div transition:slide>
		{#if user.user === null}
			<button onclick={login} aria-label="Continue With Google" class='p-3'>
                <img src={asset('/google_continue.svg')} alt='Continue with Google'/>
            </button>
		{:else}
			<div>
				Hi {user.user.displayName?.split(' ')[0]}!
			</div>
			<div>
				<button onclick={() => console.log(user)}>log user</button>
				<button
					onclick={logout}
					class="rounded-2xl bg-pink-500 p-3 shadow-2xl transition-all hover:bg-pink-800 hover:text-white"
					>log out</button
				>
			</div>
		{/if}
	</div>
{/key}

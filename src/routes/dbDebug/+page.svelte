<script lang="ts">
	import { user } from "$lib/db/auth.svelte";
	import { GuessWhoGame, playerId } from "$lib/guessWho.svelte";

    // $STATE() MANGEMENT CALLS
    //let isATurn = $state<{isATurn: boolean | null}>({isATurn: true});

    let GuessWhoInstance = new GuessWhoGame('myGame', '', true, playerId.playerA);
</script>
<div>
    <div class='bg-red-200'>
        <h2 class='text-2xl underline'>Auth Details</h2>
        <p>Name: {user.user?.displayName}</p>
        <p>email: {user.user?.email}</p>
        <p>Firebase ID: {user.user?.uid}</p>
    </div>
    <div class='bg-green-200 flex-col'>
        <h2 class='text-2xl'>firebase ('myGame')</h2>
        <p>isATurn: {GuessWhoInstance.isATurn}</p>
        <button onclick={() => console.log(GuessWhoInstance.isATurn)} class='bg-orange-300 active:bg-orange-500 rounded-2xl p-2'>print(GuessWhoInstance.isATurn)</button>
    </div>
    <p>Static Text</p>
</div>
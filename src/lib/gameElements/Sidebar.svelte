<script lang='ts'>
	import { Character } from "$lib/models/character";
	import { crossfade, fly, slide } from "svelte/transition";
	import FlippableCard from "./flippableCard.svelte";

    const { dummyCharacter, remaining }: {
        dummyCharacter: Character, remaining: any
    } = $props();
</script>
<div class="sidebar">
		<div class='yourCharacterDiv'>
            <FlippableCard character={dummyCharacter} handleFlip={() => {null}} flipped={true} index={0}/>
            Your character
		</div>
		<div class='remainingDiv'>
            <div class='remainingNum shadow-2xl'>
                    {#key remaining}
                        <p transition:slide>{remaining}</p>
                    {/key}
                </div>
			<div class='remainingText'>Remaining Characters</div>
		</div>
	</div>

<style>
    .sidebar {
        color: var(--color-white);
		background-color: var(--color-pink-500);
		border-radius: var(--radius-lg);
		display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: calc(var(--spacing) * 2);
        @media (width >= 60rem /* 768px */) {
			flex-direction: column;
		}
	}
    .yourCharacterDiv {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .remainingDiv {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .remainingText {
        text-align: center;
        text-wrap-mode: nowrap;
    }
    .remainingNum {
        text-align: center;
        border-radius: 100%;
        width: min-content;
        min-width: 2em;
        aspect-ratio: 1/1;
        background-color: var(--color-blue-500);
        font-size: var(--text-6xl) /* 1.875rem = 30px */;
        padding: calc(var(--spacing) * 3);
        transition-property: background-color;
        transition-duration: 0.4s;
    }
</style>
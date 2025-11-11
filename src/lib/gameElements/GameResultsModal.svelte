<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	let { isOpen = $bindable(), playerWon = $bindable() } = $props();

	const starColors = 	['pink-500', 'pink-800', 'purple-500', 'purple-800', 'blue-600', 'blue-800'];
	const starValues = 	['top-5 left-15', 'left-70 bottom-2', 'left-30 bottom-8', 'top-5 left-60' , 'left-5 bottom-0', 'left-40 bottom-20'];

	const stars = starColors.map((v, i) => {
		return {
			color: v,
			LRUD: starValues[i],
			speed: (1.2 + (i * 0.4)),
		};
	})
</script>

<AlertDialog.Root bind:open={isOpen}>
	<AlertDialog.Trigger class={buttonVariants({ variant: 'outline' })}>
		Show Dialog
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>The results are in...</AlertDialog.Title>
			<AlertDialog.Description>
				{#if playerWon}
				<div class='relative'>
					<h2 class="winner">
						<span>You</span>
						<span>Win</span>
					</h2>
					{#each stars as star, i}
						<svg
							class={`absolute ${star.LRUD} star`}
							style={`--delay: {i * 0.12}s; --starcolor: var(--color-${star.color}); --speed: ${star.speed}s`}
							viewBox="0 0 500 500"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
						>
							<path
								id="Path"
								class='star'
								fill-rule="evenodd"
								stroke="none"
								d="M 250 13 C 250 13 200.092514 118.916443 159.504471 159.504486 C 118.916435 200.092529 13 250 13 250 C 13 250 118.916435 299.907471 159.504471 340.495544 C 200.092514 381.083557 250 487 250 487 C 250 487 299.907471 381.083557 340.495514 340.495544 C 381.083557 299.907471 487 250 487 250 C 487 250 381.083557 200.092529 340.495514 159.504486 C 299.907471 118.916443 250 13 250 13 Z"
							/>
						</svg>
					{/each}
				</div>
				{:else}
					<h2 class="loser">you lose!</h2>
				{/if}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<!-- TODO: implement WINNER / LOSER animation -->

<style>
	.winner {
		font-size: 5rem;
	}
	.star {
		max-width: 2em;
		aspect-ratio: 1/1;
		padding: none;
		scale: 100%;
		animation: starShrink var(--speed) ease-in-out infinite forwards;
		animation-delay: var(--delay, 0s);
		will-change: transform, opacity;
		fill: var(--starcolor)
	}

	@keyframes starShrink {
		0% {
			opacity: 0.7;
			scale: 80%;
			rotate: 3deg;
		}
		50% {
			opacity: 1;
			scale: 100%;
			rotate: -3deg;
		}
		100% {
			opacity: 0.7;
			scale: 80%;
			rotate: 3deg;
		}
	}
</style>

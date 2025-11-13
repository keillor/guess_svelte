<script lang="ts">
	import { gsap, SplitText } from '$lib/gsap/gsapInit';
	import { onMount } from 'svelte';

	onMount(() => {
		if (animationComplete) {
			console.warn('animation already triggered.');
			return;
		} else {
			animationComplete = true;
		}
		const splitWinText = new SplitText('#winText', { type: 'chars' });
		gsap.set('#winText', { visibility: 'visible' });
		winnerTimeline
			.from(splitWinText.chars, {})
	});

	let animationComplete = false;
	let winnerTimeline = gsap.timeline();
</script>

<div class="relative bg-white">
	<h3 id="winText" class="w-min text-nowrap">You Loose!</h3>
</div>

<style>
	#winText {
		visibility: hidden;
		font-size: 5rem;
		line-height: var(--tw-leading, var(--text-2xl--line-height) /* calc(2 / 1.5) ≈ 1.333333 */);
	}
</style>

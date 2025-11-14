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
		const splitLostText = new SplitText('#lostText', { type: 'words, chars' });
		gsap.set('#lostText', { visibility: 'visible' });
		winnerTimeline
			.from(splitLostText.chars, {
                autoAlpha: 0,
                xPercent: 100,
                stagger: {
                    each: 0.05,
                    from: 'end',
                }
            }).set(splitLostText.chars, {
                transformOrigin: '50% 75%'
            }).to(splitLostText.chars, {
                rotate: "random(-30,30)",
                stagger: {
                    each: 0.1,
                    from: 'random',
                },
                ease: 'bounce.out'
            }).set(splitLostText.chars.at(7), {
                transformOrigin: '50% 75%'
            })
            .to(splitLostText.chars.at(7), {
                rotate: -180,
                //y: 40,
                ease: 'elastic.out',
                duration: 1.8,
            }).to(splitLostText.chars, {
                rotate: 0,
                y:0,
                ease: 'bounce.out',
                onComplete: () => splitLostText.revert(),
            })
	});

	let animationComplete = false;
	let winnerTimeline = gsap.timeline();
</script>

<div class="relative bg-white">
	<h3 id="lostText" class="w-min text-nowrap">You Lost!</h3>
</div>

<style>
	#lostText {
		visibility: hidden;
		font-size: 5rem;
		line-height: var(--tw-leading, var(--text-2xl--line-height) /* calc(2 / 1.5) ≈ 1.333333 */);
	}
</style>

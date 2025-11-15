<script lang="ts">
	import { gsap, SplitText } from '$lib/gsap/gsapInit';
	import { onMount } from 'svelte';
	import { bounceIn } from 'svelte/easing';

	onMount(() => {
		if (animationComplete) {
			console.warn('animation already triggered.');
			return;
		} else {
			animationComplete = true;
		}
		const splitWinText = new SplitText('#winText', { type: 'chars' });
		gsap.set('#winText', { visibility: 'visible' });
		gsap.set(splitWinText.chars.at(6), {
			autoAlpha: 0,
			transformOrigin: '50% 30%',
		})
		gsap.set(splitWinText.chars.at(6), {
			autoAlpha: 0,
			rotate: -180
		})
		winnerTimeline
			.from(splitWinText.chars.filter((_ , i) => i < 6), {
				autoAlpha: 0,
				rotation: 'random(-50,50)',
				rotateX: -180,
				yPercent: 'random([100,-100])',
				stagger: {
					each: 0.1,
					from: 'start'
				},
				/* onComplete: () => {
					splitWinText.revert();
				} */
			}).to(splitWinText.chars.at(6), {
				autoAlpha: 1,
				rotate: 0,
				ease: 'bounce.out'
			}).to(splitWinText.chars.filter(( _ , i ) => i < 6), {
				x: -12,
				ease: 'back.out',
				stagger: {
					each: 0.05,
					from: 'end'
				}
			}, '<').to(splitWinText.chars.filter(( _ , i ) => i < 6), {
				x: 0,
				ease: 'bounce.out',
				stagger: {
					each: 0.02,
					from: 'start'
				}
			})
			.from('.star', {
				y: -10
			})
			.to(
				'.star',
				{
					autoAlpha: 1,
					stagger: {
						each: 0.05,
						from: 'random'
					}
				},
			)
			.to('.star', {
				opacity: 0.7,
				scale: 0.7,
				rotationZ: 'random(-30, 30)',
				ease: 'expo.inOut',
				stagger: {
					each: 0.1,
					repeat: -1,
					yoyo: true
				},
				duration: 'random(0.8, 1)'
			});
	});

	let animationComplete = false;
	let winnerTimeline = gsap.timeline();

	const starColors = ['pink-500', 'pink-800', 'purple-500', 'purple-800', 'blue-600', 'blue-800'];
	const starValues = [
		'top-5 left-15',
		'left-70 bottom-2',
		'left-30 bottom-8',
		'top-5 left-60',
		'left-5 bottom-0',
		'left-40 bottom-20'
	];
	const stars = starColors.map((v, i) => {
		return {
			color: v,
			LRUD: starValues[i],
			speed: 1.2 + i * 0.4
		};
	});
</script>

<div class="relative bg-white">
	<h3 id="winText" class="w-min text-nowrap">You Win!</h3>
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
				class="star"
				fill-rule="evenodd"
				stroke="none"
				d="M 250 13 C 250 13 200.092514 118.916443 159.504471 159.504486 C 118.916435 200.092529 13 250 13 250 C 13 250 118.916435 299.907471 159.504471 340.495544 C 200.092514 381.083557 250 487 250 487 C 250 487 299.907471 381.083557 340.495514 340.495544 C 381.083557 299.907471 487 250 487 250 C 487 250 381.083557 200.092529 340.495514 159.504486 C 299.907471 118.916443 250 13 250 13 Z"
			/>
		</svg>
	{/each}
</div>

<style>
	#winText {
		visibility: hidden;
		font-size: 5rem;
		line-height: var(--tw-leading, var(--text-2xl--line-height) /* calc(2 / 1.5) ≈ 1.333333 */);
	}
	.outline {
		border: dashed 2px;
		border-color: black;
	}
	.star {
		scale: 100%;
		opacity: 0;
		visibility: hidden;
		max-width: 2em;
		aspect-ratio: 1/1;
		padding: none;
		/* animation: starShrink var(--speed) ease-in-out infinite forwards;
		animation-delay: var(--delay, 0s); */
		will-change: transform, opacity;
		fill: var(--starcolor);
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

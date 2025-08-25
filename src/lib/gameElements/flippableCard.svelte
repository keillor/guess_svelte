<script lang="ts">
	import type { Character } from '$lib/models/character';

	//let flipped = $state(true);
	let {
		character,
		handleFlip,
		flipped,
		index
	}: {
		character: Character;
		handleFlip: Function;
		flipped: Boolean;
		index: number;
	} = $props();
</script>

<button
	class="card"
	style:transform={flipped ? 'rotateY(0)' : ''}
	style:--bg-1="var(--color-white)"
	onclick={() => handleFlip(index)}
>
	<div class="paddin">
		<img
			class="characterImage self-center shadow-2xl"
			src={character.url.href}
			alt={`character ${character.name}`}
		/>
		<span class=" characterName">
			{#if character.name.length < 10}
				{character.name}
			{:else}
				{character.name.slice(0,7)}...
			{/if}
		</span>
	</div>
	<div class="back">
		<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
			<path
				id="path2"
				fill="var(--color-purple-800)"
				stroke="none"
				d="M 200.358795 248.138687 L 184.528946 248.138687 C 184.225418 230.29805 184.548935 211.454895 194.391006 195.865967 C 207.387024 175.281723 222.199448 153.486023 221.924835 127.993652 C 221.753387 112.077637 214.089188 93.612671 197.148132 90.141815 C 186.063477 87.870819 170.901093 87.588531 164.277832 97.59137 C 158.721634 105.982666 176.580261 111.259094 179.272888 120.333008 C 191.671173 162.114166 136.228226 172.420364 124.816589 138.850769 C 118.529869 120.357147 127.574478 100.035156 142.888397 89.080383 C 185.638535 58.499176 271.006195 67.686157 276.715057 118.653778 C 282.10553 166.778748 241.646957 186.347855 214.090347 210.746033 C 202.377151 221.116714 199.880875 234.985428 200.358795 248.138687 Z M 192.278976 264.837769 C 212.133514 264.567535 228.152466 285.11322 223.19368 304.470001 C 218.526215 322.689697 197.369629 333.428253 180.076752 326.136627 C 162.931778 318.907379 155.090668 296.25766 165.022751 280.381134 C 170.855103 271.058075 181.158005 264.989136 192.278976 264.837769 Z"
			/>
		</svg>
	</div>
</button>

<style>

	.characterName {
		font-size: var(--text-2xl) /* 1.875rem = 30px */;
    	line-height: var(--tw-leading, var(--text-3xl--line-height));
		color: var(--color-black);
		/* text-underline-offset: 0.05em;
		text-decoration-line: underline; */

	}
	.characterImage {
		aspect-ratio: 1/1;
		object-fit: cover;
		border-radius: 1em;
		user-drag: none;
		-webkit-user-drag: none;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}
	.spacer{
		flex-grow: 1;
	}
	.card {
		/* border: solid black 0.5px; */
		position: relative;
		aspect-ratio: 2.5 / 3;
		font-size: 0.5rem;
		height: 18em;
		background: var(--bg-1);
		border-radius: 1em;
		transform: rotateY(180deg);
		transition: transform 0.4s;
		transform-style: preserve-3d;
		padding: 0;
		user-select: none;
		cursor: pointer;
		box-shadow: var(--shadow-lg)
	}

	.paddin,
	.back {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		backface-visibility: hidden;
		border-radius: 2em;
		border: 1px solid var(--fg-2);
		box-sizing: border-box;
		padding: 1em;
	}

	.front {
		text-overflow: clip;
		overflow: hidden;
		text-wrap-mode: nowrap;
		white-space: initial;
		text-align: left;
	}

	.back {
		transform: rotateY(180deg);
	}
</style>

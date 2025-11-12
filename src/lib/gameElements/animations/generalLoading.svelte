<script>
	import { fade } from "svelte/transition";

</script>
<div transition:fade={{ duration: 100}} class="absolute top-0 left-0 z-50 flex flex-row justify-center items-center h-screen w-screen bg-black/40 transition-colors">
	<div class="containerCard aspect-square h-40 w-40 rounded-2xl bg-white mask-cover shadow-2xl">
		<svg class="question" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
			<path
				class="questionPath"
				id="path2"
				d="M 200.358795 248.138687 L 184.528946 248.138687 C 184.225418 230.29805 184.548935 211.454895 194.391006 195.865967 C 207.387024 175.281723 222.199448 153.486023 221.924835 127.993652 C 221.753387 112.077637 214.089188 93.612671 197.148132 90.141815 C 186.063477 87.870819 170.901093 87.588531 164.277832 97.59137 C 158.721634 105.982666 176.580261 111.259094 179.272888 120.333008 C 191.671173 162.114166 136.228226 172.420364 124.816589 138.850769 C 118.529869 120.357147 127.574478 100.035156 142.888397 89.080383 C 185.638535 58.499176 271.006195 67.686157 276.715057 118.653778 C 282.10553 166.778748 241.646957 186.347855 214.090347 210.746033 C 202.377151 221.116714 199.880875 234.985428 200.358795 248.138687 Z M 192.278976 264.837769 C 212.133514 264.567535 228.152466 285.11322 223.19368 304.470001 C 218.526215 322.689697 197.369629 333.428253 180.076752 326.136627 C 162.931778 318.907379 155.090668 296.25766 165.022751 280.381134 C 170.855103 271.058075 181.158005 264.989136 192.278976 264.837769 Z"
			/>
		</svg>
	</div>
</div>

<style>
	.questionPath {
		fill: white;
	}
	.question {
		animation-delay: 2s;
		animation: infinite questionRotate ease-in-out 1.25s;
	}

	@keyframes questionRotate {
		0% {
			transform: rotateX(0deg);
		}
		25% {
			transform: rotateX(180deg);
		}
		50% {
			transform: rotateZ(180deg);
		}
		75% {
			transform: rotateY(0deg);
		}
		100% {
			transform: rotateX(0deg);
		}
	}

	.containerCard {
		background: linear-gradient(
        45deg,
        var(--color-pink-500) 16.666%, 
        var(--color-pink-800) 16.666%, 
        var(--color-pink-800) 33.333%, 
        var(--color-purple-800) 33.333%, 
        var(--color-purple-800) 50%, 
        var(--color-purple-500) 50%, 
        var(--color-purple-500) 66.666%, 
        var(--color-blue-600) 66.666%, 
        var(--color-blue-600) 83.333%, 
        var(--color-blue-800) 83.333%);;
		background-size: 150% 150%;
		animation: gradientMove 10s ease infinite;
	}

	@keyframes gradientMove {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>

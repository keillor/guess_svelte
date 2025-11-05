<script>
	import { logout } from "$lib/db/auth.svelte";

</script>
<main>
	<div class="logoHolder">
		<img class="logo" src="/logo.png" alt="Guest Who logo" />
	</div>
	<p class="subtitle">a guessing game</p>

	<div class="navButtonDiv">
		<a href="/init">
			<button class="navButtons">Create Game</button>
		</a>
		<a href='/join'>
			<button class="navButtons">Join Game</button>
		</a>
		<a href="/create">
			<button class="navButtons">Edit Characters</button>
		</a>
		<button class="navButtons" onclick={logout}>Sign Out</button>
	</div>

	<footer>
		Made With 💜 by <a class="ghLink" href="https://www.github.com/keillor">KJ</a> -
		<a class="ghLink" href="https://github.com/keillor/guess_svelte">Source Code</a>
	</footer>
</main>

<style>
	main {
		height: 100%;
	}

	.logo {
		width: 100%;
		max-width: 100em;
	}

	.logoHolder {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.navButtonDiv {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 3em;
		height: 100%;
		@media (width >= 60rem /* 768px */) {
			flex-direction: row;
		}
	}

	.subtitle {
		text-align: center;
		font-style: italic;
		font-size: 2em;
		color: var(--color-white);
		padding-bottom: 1em;
	}

	footer {
		font-size: 2em;
		position: fixed;
		bottom: 0px;
		width: 100%;
		text-align: center;
		background-color: var(--color-blue-400);
		color: var(--color-black);
	}
	.ghLink:hover {
		text-decoration: underline;
	}

	.navButtons {
		background-color: var(--color-purple-500);
		color: var(--color-white);
		width: 8em;
		font-size: 2em;
		border-radius: var(--radius-3xl);
		padding: 0.5em;
	}
</style>

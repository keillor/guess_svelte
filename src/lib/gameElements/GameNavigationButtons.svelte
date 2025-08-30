<script lang='ts'>
    const { activeButtons } = $props();
</script>

<div class='actionButtonDiv'>
    <button class='actionButton' disabled={!activeButtons[0]}>
        I'm Done
    </button>

    <button class='actionButton' disabled={!activeButtons[1]}>
        Ask Question
    </button>
    
    <button class='actionButton' disabled={!activeButtons[2]}>
        Old Questions
    </button>
    
    <button class='actionButton' disabled={!activeButtons[3]}>
        Take A Guess
    </button>
</div>


<style>
    .actionButtonDiv {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        width: 100%;
        gap: 1em;
        justify-items: center;
		@media (width >= 40rem /* 640px */) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		@media (width >= 76rem /* 768px */) {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
    }
    .actionButton {
        border-radius: var(--radius-4xl);
        padding: 0.5em;
        font-size: var(--text-3xl);
        color: var(--color-white);
        background-color: black;
        --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    transition: all 0.4s;
    width: 10em;
    }
    .actionButton:hover:not([disabled]) {
        transform: translate(0.1em, 0.1em);
        box-shadow: none;
        transition: all 0.4s;
    }
    .actionButton:nth-child(4n + 1) {
        background-color: var(--color-purple-500);
    }
    .actionButton:nth-child(4n + 2) {
        background-color: var(--color-pink-300);
    }
    .actionButton:nth-child(4n + 3) {
        background-color: var(--color-mint-500);
    }
    .actionButton:nth-child(4n + 4) {
        background-color: var(--color-blue-400);
    }
    .actionButton[disabled] {
        background-color: var(--color-gray-400);
        cursor: not-allowed;
    }
</style>
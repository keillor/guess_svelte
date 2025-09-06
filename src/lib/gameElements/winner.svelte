<script>
  // State variables using Svelte 5 runes
  let winnerSound;
  let showWin = $state(false);
  const winText = "YOU WIN!";

  function playAudio() {
    if (winnerSound) {
      winnerSound.currentTime = 0; // Rewind to start
      winnerSound.play().catch(error => {
        console.error("Audio playback was blocked by the browser:", error);
      });
    }
  }

  function triggerWinAnimation() {
    showWin = true;
    playAudio();
  }
</script>

<div class="relative w-full h-full flex items-center justify-center bg-gray-900 overflow-hidden">
  <div class="you-win-container">
    {#each winText.split('') as letter, i}
      <span 
        class="animated-letter" 
        style="animation-delay: {i * 0.1}s;"
        class:show={showWin}
      >
        {letter === ' ' ? '&nbsp;' : letter}
      </span>
    {/each}
  </div>

  <button 
    onclick={triggerWinAnimation}
    class="absolute bottom-10 px-8 py-4 bg-gradient-to-r from-green-500 to-lime-600 text-white font-bold text-xl rounded-full shadow-lg hover:scale-105 transition-transform duration-300 transform"
  >
    Simulate Win
  </button>
  
  <!-- Use bind:this to get a reference to the DOM element in Svelte 5 -->
  <audio bind:this={winnerSound} src="./winner.mp3" preload="auto"></audio>
</div>

<style>  
  .you-win-container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.5rem;
    perspective: 1000px;
    filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
  }

  .animated-letter {
    opacity: 0;
    transform: scale(0) rotateY(180deg);
    animation: none;
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  }

  .animated-letter.show {
    animation: fly-in 1.5s forwards cubic-bezier(0.68, -0.55, 0.27, 1.55);
    opacity: 1;
  }

  /* Keyframes for the grand animation */
  @keyframes fly-in {
    0% {
      opacity: 0;
      transform: translateY(-500px) rotateY(180deg) scale(0);
      text-shadow: 0 0 10px rgba(255, 215, 0, 0);
    }
    50% {
      opacity: 1;
      transform: translateY(0) rotateY(0) scale(1.2);
      text-shadow: 0 0 50px rgba(255, 215, 0, 0.8);
    }
    100% {
      transform: scale(1);
      filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
    }
  }

  .animated-letter.show {
    animation-name: fly-in, pulse-glow;
    animation-duration: 1s, 2s;
    animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55), ease-in-out;
    animation-fill-mode: forwards;
    animation-iteration-count: 1, infinite;
  }

  @keyframes pulse-glow {
    0%, 100% {
      filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
    }
    50% {
      filter: drop-shadow(0 0 30px rgba(255, 215, 0, 1));
    }
  }

  @media (max-width: 600px) {
    .you-win-container {
      font-size: 3rem;
    }
    .action-button {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }
  }
</style>

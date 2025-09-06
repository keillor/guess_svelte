<script>
  let loserSound;
  let showLose = $state(false);
  const loseText = "YOU LOSE";

  function playAudio() {
    if (loserSound) {
      loserSound.currentTime = 0; // Rewind to start
      loserSound.play().catch(error => {
        console.error("Audio playback was blocked by the browser:", error);
      });
    }
  }

  function triggerLoseAnimation() {
    showLose = true;
    playAudio();
  }
</script>

<div class="relative w-full h-full flex items-center justify-center bg-gray-900 overflow-hidden">
  <div class="you-lose-container">
    {#each loseText.split('') as letter, i}
      <span 
        class="animated-letter" 
        style="animation-delay: {i * 0.1}s;"
        class:show={showLose}
      >
        {letter === ' ' ? '&nbsp;' : letter}
      </span>
    {/each}
  </div>

  <button 
    onclick={triggerLoseAnimation}
    class="absolute bottom-10 px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-xl rounded-full shadow-lg hover:scale-105 transition-transform duration-300 transform"
  >
    Simulate Loss
  </button>
  
  <audio bind:this={loserSound} src="./loose.mp3" preload="auto"></audio>
</div>

<style>
  .you-lose-container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.5rem;
    filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.5));
  }

  .animated-letter {
    opacity: 0;
    transform: translateY(-50px);
    animation: none;
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  }

  .animated-letter.show {
    animation: fade-fall 1.5s forwards ease-in-out;
    opacity: 1;
  }

  @keyframes fade-fall {
    0% {
      opacity: 0;
      transform: translateY(-50px) scale(1.2);
    }
    50% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(100px) scale(0.8);
    }
  }
  
  .animated-letter.show {
    animation-name: fade-fall, subtle-glow;
    animation-duration: 1.5s, 2s;
    animation-timing-function: ease-in-out, ease-in-out;
    animation-fill-mode: forwards;
    animation-iteration-count: 1, infinite;
  }

  @keyframes subtle-glow {
    0%, 100% {
      filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.5));
    }
    50% {
      filter: drop-shadow(0 0 20px rgba(255, 0, 0, 0.8));
    }
  }

  @media (max-width: 600px) {
    .you-lose-container {
      font-size: 3rem;
    }
    .action-button {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }
  }
</style>

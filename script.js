// Welcome intro and short page handoff.
const introScreen = document.getElementById('intro-screen');
const introEnter = document.getElementById('intro-enter');
const loadingScreen = document.getElementById('loading');

if (introScreen && introEnter) {
  document.body.classList.add('intro-active');
  introEnter.addEventListener('click', () => {
    introScreen.classList.add('is-leaving');
    window.setTimeout(() => {
      introScreen.remove();
      document.body.classList.remove('intro-active');
      if (loadingScreen) {
        loadingScreen.classList.add('is-visible');
        window.setTimeout(() => loadingScreen.classList.remove('is-visible'), 650);
      }
      document.querySelectorAll('.reveal').forEach((element) => element.classList.add('active'));
      document.getElementById('hero-title')?.focus?.();
    }, 700);
  }, { once: true });
}

// Typing effect
const introText = 'Web Learner | Future Game Developer | Student from Medan';
const typingElement = document.getElementById('typing');
if (typingElement) {
  let characterIndex = 0;
  const typeNextCharacter = () => {
    if (characterIndex >= introText.length) return;
    typingElement.textContent += introText.charAt(characterIndex++);
    window.setTimeout(typeNextCharacter, 65);
  };
  typeNextCharacter();
}

// Audio starts only after an explicit user action, as required by browsers.
const bgm = document.getElementById('bgm');
const musicToggle = document.getElementById('musicToggle');
if (bgm && musicToggle) {
  const musicIcon = musicToggle.querySelector('.music-icon');
  const musicText = musicToggle.querySelector('.music-text');
  bgm.volume = 0.28;

  const updateMusicState = (playing) => {
    musicToggle.classList.toggle('playing', playing);
    musicToggle.setAttribute('aria-pressed', String(playing));
    musicToggle.setAttribute('aria-label', playing ? 'Matikan musik' : 'Nyalakan musik');
    if (musicIcon) musicIcon.textContent = playing ? '♫' : '♪';
    if (musicText) musicText.textContent = playing ? 'Musik menyala' : 'Musik mati';
  };

  musicToggle.addEventListener('click', async () => {
    if (bgm.paused) {
      try {
        await bgm.play();
      } catch {
        updateMusicState(false);
        if (musicText) musicText.textContent = 'Audio tidak tersedia';
      }
    } else {
      bgm.pause();
    }
  });
  bgm.addEventListener('play', () => updateMusicState(true));
  bgm.addEventListener('pause', () => updateMusicState(false));
  bgm.addEventListener('error', () => {
    updateMusicState(false);
    if (musicText) musicText.textContent = 'Audio tidak tersedia';
    musicToggle.disabled = true;
  });
  updateMusicState(false);
}

// Reveal content when it enters the viewport.
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('active'));
}

// Gentle pointer interaction for the hero card.
const heroBox = document.querySelector('.hero-box');
if (heroBox && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    heroBox.style.setProperty('--pointer-x', `${x * 8}px`);
    heroBox.style.setProperty('--pointer-y', `${y * 8}px`);
  }, { passive: true });
}

// Mini game: catch the moving star.
const gameBoard = document.getElementById('game-board');
const targetStar = document.getElementById('target-star');
const gameStart = document.getElementById('game-start');
const gameMessage = document.getElementById('game-message');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const bestElement = document.getElementById('best-score');
let score = 0;
let timeLeft = 20;
let gameTimer;
let bestScore = 0;
try { bestScore = Number(sessionStorage.getItem('best-star-score') || 0); } catch { bestScore = 0; }
if (bestElement) bestElement.textContent = String(bestScore);

function moveTarget() {
  const padding = 18;
  const maxX = gameBoard.clientWidth - targetStar.offsetWidth - padding;
  const maxY = gameBoard.clientHeight - targetStar.offsetHeight - padding;
  targetStar.style.left = `${padding + Math.random() * Math.max(0, maxX)}px`;
  targetStar.style.top = `${padding + Math.random() * Math.max(0, maxY)}px`;
}
function endGame() {
  window.clearInterval(gameTimer);
  targetStar.style.display = 'none';
  gameMessage.textContent = `Waktu habis — skor kamu ${score}`;
  gameMessage.style.display = 'grid';
  gameStart.textContent = 'Main lagi';
  if (score > bestScore) {
    bestScore = score;
    try { sessionStorage.setItem('best-star-score', String(bestScore)); } catch { /* Storage can be unavailable in private browsing. */ }
    bestElement.textContent = String(bestScore);
  }
}
if (gameBoard && targetStar && gameStart && gameMessage && scoreElement && timeElement) {
  gameStart.addEventListener('click', () => {
    window.clearInterval(gameTimer);
    score = 0;
    timeLeft = 20;
    scoreElement.textContent = String(score);
    timeElement.textContent = String(timeLeft);
    gameMessage.style.display = 'none';
    targetStar.style.display = 'block';
    moveTarget();
    gameStart.textContent = 'Sedang bermain';
    gameStart.disabled = true;
    gameTimer = window.setInterval(() => {
      timeLeft -= 1;
      timeElement.textContent = String(timeLeft);
      if (timeLeft <= 0) {
        gameStart.disabled = false;
        endGame();
      }
    }, 1000);
    gameStart.disabled = false;
  });
  targetStar.addEventListener('click', () => {
    score += 1;
    scoreElement.textContent = String(score);
    moveTarget();
  });
}

// Active menu
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar a').forEach((link) => {
  if (link.getAttribute('href') === currentLocation) link.classList.add('active');
});

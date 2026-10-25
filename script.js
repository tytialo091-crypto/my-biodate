// Loading screen
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  if (loading) {
    setTimeout(() => {
      loading.style.opacity = '0';
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500);
    }, 1500);
  }
});

// Typing effect
const text = "Web Learner | Future Game Developer | Student from Medan";
let i = 0;
const typingElement = document.getElementById("typing");

if (typingElement) {
  function typing() {
    if (i < text.length) {
      typingElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 70);
    }
  }
  typing();
}

// Music Player
const bgm = document.getElementById('bgm');
const musicToggle = document.getElementById('musicToggle');

if (bgm && musicToggle) {
  const musicIcon = musicToggle.querySelector('.music-icon');
  const musicText = musicToggle.querySelector('.music-text');
  
  bgm.volume = 0.3;
  let isMusicPlaying = false;
  
  function updateMusicIcon(playing) {
    if (playing) {
      musicIcon.textContent = '🔊';
      musicText.textContent = 'Music On';
      musicToggle.classList.add('playing');
    } else {
      musicIcon.textContent = '🔈';
      musicText.textContent = 'Music Off';
      musicToggle.classList.remove('playing');
    }
  }
  
  bgm.play().then(() => {
    isMusicPlaying = true;
    updateMusicIcon(true);
  }).catch(() => {
    isMusicPlaying = false;
    updateMusicIcon(false);
    musicToggle.classList.add('pulse-animation');
  });
  
  document.body.addEventListener('click', function playFirstTime() {
    if (!isMusicPlaying && bgm.paused) {
      bgm.play().then(() => {
        isMusicPlaying = true;
        updateMusicIcon(true);
        musicToggle.classList.remove('pulse-animation');
      }).catch(e => console.log('Gagal play:', e));
    }
  }, { once: true });
  
  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (bgm.paused) {
      bgm.play().then(() => {
        isMusicPlaying = true;
        updateMusicIcon(true);
        musicToggle.classList.remove('pulse-animation');
      });
    } else {
      bgm.pause();
      isMusicPlaying = false;
      updateMusicIcon(false);
    }
  });
  
  bgm.addEventListener('ended', () => {
    bgm.currentTime = 0;
    bgm.play();
  });
}

// Scroll Reveal
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  window.dispatchEvent(new Event('scroll'));
});

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
let bestScore = Number(sessionStorage.getItem('best-star-score') || 0);
if (bestElement) bestElement.textContent = bestScore;

function moveTarget() {
  const padding = 18;
  const maxX = gameBoard.clientWidth - targetStar.offsetWidth - padding;
  const maxY = gameBoard.clientHeight - targetStar.offsetHeight - padding;
  targetStar.style.left = `${padding + Math.random() * Math.max(0, maxX)}px`;
  targetStar.style.top = `${padding + Math.random() * Math.max(0, maxY)}px`;
}
function endGame() {
  clearInterval(gameTimer);
  targetStar.style.display = 'none';
  gameMessage.textContent = `Waktu habis — skor kamu ${score}`;
  gameMessage.style.display = 'grid';
  gameStart.textContent = 'Main lagi';
  if (score > bestScore) { bestScore = score; sessionStorage.setItem('best-star-score', bestScore); bestElement.textContent = bestScore; }
}
if (gameBoard && targetStar && gameStart) {
  gameStart.addEventListener('click', () => {
    clearInterval(gameTimer); score = 0; timeLeft = 20;
    scoreElement.textContent = score; timeElement.textContent = timeLeft;
    gameMessage.style.display = 'none'; targetStar.style.display = 'block'; moveTarget();
    gameStart.textContent = 'Sedang bermain';
    gameTimer = setInterval(() => { timeLeft -= 1; timeElement.textContent = timeLeft; if (timeLeft <= 0) endGame(); }, 1000);
  });
  targetStar.addEventListener('click', () => { score += 1; scoreElement.textContent = score; moveTarget(); });
}

// Active Menu
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar a').forEach(link => {
  if (link.getAttribute('href') === currentLocation) {
    link.classList.add('active');
  }
});

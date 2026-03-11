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

// Active Menu
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar a').forEach(link => {
  if (link.getAttribute('href') === currentLocation) {
    link.classList.add('active');
  }
});

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

// Particles
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  
  const particles = Array.from({length: 50}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.5 + 1,
    dx: (Math.random() - 0.5) * 0.15,
    dy: (Math.random() - 0.5) * 0.15,
    opacity: Math.random() * 0.4 + 0.2
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(30, 144, 255, ${p.opacity})`;
      ctx.fill();
      
      p.x += p.dx;
      p.y += p.dy;
      
      if (p.x > canvas.width) p.x = 0;
      if (p.x < 0) p.x = canvas.width;
      if (p.y > canvas.height) p.y = 0;
      if (p.y < 0) p.y = canvas.height;
    });
    
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    resizeCanvas();
  });
}

// Active Menu
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar a').forEach(link => {
  if (link.getAttribute('href') === currentLocation) {
    link.classList.add('active');
  }
});

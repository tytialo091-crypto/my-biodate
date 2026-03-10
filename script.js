// Loading screen
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  if (loading) {
    // Kasih waktu buat load BGM
    setTimeout(() => {
      loading.style.opacity = '0';
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500);
    }, 1500); // Loading lebih lama biar BGM siap
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

// ========== MUSIC PLAYER ==========
const bgm = document.getElementById('bgm');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = musicToggle?.querySelector('.music-icon');

let isMusicPlaying = false;

if (bgm && musicToggle) {
  // Set volume (70% biar ga terlalu keras)
  bgm.volume = 0.4;
  
  // Cek apakah BGM bisa autoplay
  bgm.play().then(() => {
    // Berhasil autoplay
    isMusicPlaying = true;
    updateMusicIcon(true);
  }).catch(error => {
    // Autoplay diblokir browser, tunggu interaksi user
    console.log('Autoplay diblokir, tunggu interaksi user');
    isMusicPlaying = false;
    updateMusicIcon(false);
    
    // Kasih tau user buat klik
    if (musicToggle) {
      musicToggle.classList.add('pulse-animation');
    }
  });
  
  // Fungsi update icon
  function updateMusicIcon(playing) {
    if (playing) {
      musicIcon.textContent = '🔊';
      musicToggle?.classList.remove('paused');
      musicToggle?.classList.add('playing');
    } else {
      musicIcon.textContent = '🔈';
      musicToggle?.classList.add('paused');
      musicToggle?.classList.remove('playing');
    }
  }
  
  // Play setelah user klik di mana aja (first interaction)
  document.body.addEventListener('click', function playFirstTime() {
    if (!isMusicPlaying && bgm.paused) {
      bgm.play().then(() => {
        isMusicPlaying = true;
        updateMusicIcon(true);
        musicToggle?.classList.remove('pulse-animation');
      }).catch(e => console.log('Gagal play:', e));
    }
  }, { once: true });
  
  // Toggle music dengan tombol
  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (bgm.paused) {
      bgm.play().then(() => {
        isMusicPlaying = true;
        updateMusicIcon(true);
      });
    } else {
      bgm.pause();
      isMusicPlaying = false;
      updateMusicIcon(false);
    }
  });
  
  // Handle ketika musik selesai (loop otomatis)
  bgm.addEventListener('ended', () => {
    bgm.currentTime = 0;
    bgm.play();
  });
}

// ========== SCROLL REVEAL ==========
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
});

// Trigger reveal untuk elemen yang sudah terlihat saat load
document.addEventListener('DOMContentLoaded', () => {
  window.dispatchEvent(new Event('scroll'));
});

// ========== PARTICLE BACKGROUND ==========
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
      
      // Wrap around edges
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

// ========== ACTIVE MENU ==========
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar a').forEach(link => {
  if (link.getAttribute('href') === currentLocation) {
    link.classList.add('active');
  }
});

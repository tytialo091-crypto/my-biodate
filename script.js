// Loading screen
window.onload = () => {
  document.getElementById("loading").style.display = "none";
};

// Typing effect
const text = "Web Learner | Future Game Developer | Student from Medan";
let i = 0;
function typing() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 50);
  }
}
typing();

// Play music after first click
document.body.addEventListener("click", () => {
  document.getElementById("bgm").play();
}, { once: true });

// Scroll reveal animation
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      el.classList.add("active");
    }
  });
});

// Particle background
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() * 0.5,
    dy: Math.random() * 0.5
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "cyan";
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x > canvas.width) p.x = 0;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(animate);
  }

  animate();
}

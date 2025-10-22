// === CLICK SOUND + OPEN LINK ===
function playClickAndOpen(url) {
  const click = document.getElementById("click-sound");
  click.currentTime = 0;
  click.play();

  setTimeout(() => {
    window.open(url, "_blank"); // new tab
  }, 150); // lil delay for sound
}

// === PARTICLE BACKGROUND ===
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

class Particle {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  const numberOfParticles = 70;
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 3 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 1.5;
    const speedY = (Math.random() - 0.5) * 1.5;
    particlesArray.push(new Particle(x, y, size, speedX, speedY));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animate);
}

init();
animate();

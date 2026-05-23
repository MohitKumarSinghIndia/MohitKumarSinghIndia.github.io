const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

if (window.lucide) {
  window.lucide.createIcons();
}

const canvas = document.querySelector("#heroCanvas");
const ctx = canvas.getContext("2d");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let width = 0;
let height = 0;
let animationFrame = 0;

const nodes = Array.from({ length: 42 }, (_, index) => ({
  x: Math.random(),
  y: Math.random(),
  z: Math.random() * 0.8 + 0.2,
  hue: index % 3,
  speed: Math.random() * 0.003 + 0.001,
}));

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawScene(time = 0) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#111113";
  ctx.fillRect(0, 0, width, height);

  const centerX = width * 0.68;
  const centerY = height * 0.47;
  const radius = Math.min(width, height) * 0.42;

  ctx.lineWidth = 1.4;
  nodes.forEach((node, index) => {
    if (!prefersReducedMotion.matches) {
      node.y += node.speed;
      if (node.y > 1.1) node.y = -0.1;
    }

    const orbit = time * 0.00018 + index * 0.58;
    const x = centerX + Math.cos(orbit) * radius * node.z + (node.x - 0.5) * 120;
    const y = centerY + Math.sin(orbit * 0.82) * radius * 0.48 + (node.y - 0.5) * height * 0.75;
    const size = 8 + node.z * 16;
    const colors = ["#ff6a00", "#f5f5f5", "#6b625b"];

    ctx.globalAlpha = 0.08 + node.z * 0.22;
    ctx.strokeStyle = colors[node.hue];
    ctx.fillStyle = colors[node.hue];
    ctx.beginPath();
    ctx.roundRect(x - size / 2, y - size / 2, size, size, 4);
    if (index % 4 === 0) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  });

  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = "#ff6a00";
  for (let i = 0; i < nodes.length - 1; i += 2) {
    const a = nodes[i];
    const b = nodes[i + 1];
    ctx.beginPath();
    ctx.moveTo(centerX + (a.x - 0.5) * width * 0.5, centerY + (a.y - 0.5) * height * 0.55);
    ctx.lineTo(centerX + (b.x - 0.5) * width * 0.5, centerY + (b.y - 0.5) * height * 0.55);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  if (!prefersReducedMotion.matches) {
    animationFrame = requestAnimationFrame(drawScene);
  }
}

resizeCanvas();
drawScene();
window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  drawScene();
});

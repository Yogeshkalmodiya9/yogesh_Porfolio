// Premium portfolio interactions for Yogesh Kalmodiya.
const loader = document.getElementById("loader");
const header = document.getElementById("siteHeader");
const progress = document.getElementById("scrollProgress");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeButtons = document.querySelectorAll(".theme-toggle");
const typingText = document.getElementById("typingText");
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");
const particleField = document.getElementById("particleField");
const profileOrbit = document.getElementById("profileOrbit");
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const roles = [
  "AI Engineer",
  "Machine Learning Engineer",
  "Python Developer",
  "Web Developer",
  "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 650);
});

document.getElementById("year").textContent = new Date().getFullYear();

function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);

  themeButtons.forEach((button) => {
    const icon = button.querySelector(".theme-icon");
    const label = button.querySelector(".theme-label");
    if (icon) icon.textContent = theme === "light" ? "☀" : "☾";
    if (label) label.textContent = theme === "light" ? "Light" : "Dark";
    button.setAttribute("aria-label", `Switch to ${theme === "light" ? "dark" : "light"} theme`);
  });
}

const savedTheme = localStorage.getItem("portfolio-theme");
setTheme(savedTheme === "light" ? "light" : "dark");

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  });
});

function typeRole() {
  const currentRole = roles[roleIndex];
  typingText.textContent = currentRole.slice(0, charIndex);

  if (!deleting && charIndex < currentRole.length) {
    charIndex += 1;
    setTimeout(typeRole, 72);
    return;
  }

  if (!deleting && charIndex === currentRole.length) {
    deleting = true;
    setTimeout(typeRole, 1200);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeRole, 38);
    return;
  }

  deleting = false;
  roleIndex = (roleIndex + 1) % roles.length;
  setTimeout(typeRole, 220);
}

typeRole();

function createParticles() {
  const count = window.innerWidth < 720 ? 24 : 48;
  particleField.innerHTML = "";

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${8 + Math.random() * 11}s`;
    particle.style.animationDelay = `${Math.random() * -12}s`;
    particle.style.setProperty("--drift", `${Math.random() * 160 - 80}px`);
    particleField.appendChild(particle);
  }
}

createParticles();
window.addEventListener("resize", createParticles);

function handleScroll() {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;

  progress.style.width = `${scrolled}%`;
  header.classList.toggle("scrolled", scrollTop > 24);
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("visible");

  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    document.querySelectorAll(".nav-links a").forEach((link) => link.classList.remove("active"));
    if (activeLink) activeLink.classList.add("active");
  });
}, { rootMargin: "-45% 0px -45% 0px" });

document.querySelectorAll("main section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

document.addEventListener("pointermove", (event) => {
  const { clientX, clientY } = event;

  cursorDot.style.transform = `translate(${clientX}px, ${clientY}px)`;
  cursorRing.animate({
    transform: `translate(${clientX - 17}px, ${clientY - 17}px)`
  }, {
    duration: 420,
    fill: "forwards",
    easing: "cubic-bezier(.2,.8,.2,1)"
  });

  if (profileOrbit && window.innerWidth > 720) {
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    profileOrbit.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
});

document.querySelectorAll("a, button, .tilt-card").forEach((element) => {
  element.addEventListener("pointerenter", () => cursorRing.classList.add("active"));
  element.addEventListener("pointerleave", () => cursorRing.classList.remove("active"));
});

document.querySelectorAll(".magnetic").forEach((element) => {
  element.addEventListener("pointermove", (event) => {
    if (window.innerWidth < 720) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    element.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });

  element.addEventListener("pointerleave", () => {
    element.style.transform = "";
  });
});

document.querySelectorAll(".ripple").forEach((element) => {
  element.addEventListener("click", (event) => {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple-circle";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (window.innerWidth < 900) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Message prepared. Please connect by email for direct delivery.";
  form.reset();
});

"use strict";

const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.nav-links');
function closeNavigation() {
  navigation.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
}
navToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeNavigation();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeNavigation();
    navToggle.focus();
  }
});
window.matchMedia('(min-width: 601px)').addEventListener('change', closeNavigation);
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('Mohitkumarsingh.india@gmail.com');
    status.textContent = 'Email address copied. Let’s make something great.';
    document.querySelector('#copy-email').textContent = 'Copied!';
  } catch {
    status.textContent = 'Select the email address above to copy it, or click it to open your email app.';
  }
});

if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(link => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-15% 0px -60% 0px', threshold: 0});
  ['intro', 'projects', 'services', 'about', 'contact'].forEach(id => observer.observe(document.getElementById(id)));
}

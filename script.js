const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuButton.innerHTML = `<i class="fa-solid ${open ? 'fa-xmark' : 'fa-bars'}"></i>`;
});

navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open menu');
  if (menuButton) menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
}));

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Show the hero as soon as the page opens, even when motion is reduced.
requestAnimationFrame(() => document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible')));

// Let the small data marker travel down the page's route as the reader scrolls.
const flightSignal = document.querySelector('.flight-signal');
const updateFlightSignal = () => {
  if (!flightSignal) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  flightSignal.style.setProperty('--flight-y', `${progress * Math.max(0, window.innerHeight * 0.68 - 25)}px`);
};
window.addEventListener('scroll', updateFlightSignal, { passive: true });
window.addEventListener('resize', updateFlightSignal);
updateFlightSignal();

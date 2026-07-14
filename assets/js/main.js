const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const lightbox = document.querySelector('#lightbox');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const image = lightbox.querySelector('img');
    const caption = lightbox.querySelector('p');
    image.src = item.dataset.full;
    image.alt = item.querySelector('img').alt;
    caption.textContent = item.dataset.caption || '';
    lightbox.showModal();
  });
});

lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});

document.querySelector('#year').textContent = new Date().getFullYear();

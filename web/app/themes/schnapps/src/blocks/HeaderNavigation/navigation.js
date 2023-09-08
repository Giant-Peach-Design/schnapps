import { animate, stagger, timeline } from 'motion';

const Navigation = () => {
  const navEl = document.querySelector('.nav');

  if (!navEl) {
    return;
  }

  document.addEventListener('nav:toggle', (e) => {
    if (e.detail) {
      // open
      openNav();
    } else {
      // close
      closeNav();
    }
  });

  const openNav = () => {
    timeline([
      [navEl, { x: 0 }, { duration: 0.5, easing: [0.25, 0.1, 0.25, 1] }],
    ]);
  };

  const closeNav = (duration = 0.5) => {
    timeline([
      [
        navEl,
        { x: '100%' },
        { duration: duration, easing: [0.25, 0.1, 0.25, 1] },
      ],
    ]);
  };

  closeNav(0);
};

export default Navigation;

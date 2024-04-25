import { animate, stagger, timeline } from 'motion';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import throttle from 'lodash.throttle';

const Navigation = () => {
  const navBar = document.getElementById('page-navbar');
  const navEl = document.getElementById('page-navbar-sidebar');
  const navItemEls = navEl?.querySelectorAll('.nav-item-js');

  /* Button nav trigger */
  document.addEventListener('nav:toggle', (e) => {
    if (e.detail) {
      openNav();
    } else {
      closeNav();
    }
  });

  /* Navbar hide on scroll */
  let lastScrollTop = 0;
  window.addEventListener('scroll', throttle( () => {
    const scrollTop = window.scrollY;

    /* After 60px translate/top / hide on scroll down */
    if (scrollTop >= 60) {
      navBar.classList.add('nav-is-sticky');

      if (scrollTop >= lastScrollTop) {
        navBar.classList.remove('!transform-none');
        navBar.classList.add('-translate-y-full');

      } else {
        /* Show on scroll up */
        navBar.classList.add('!transform-none');
      }

      lastScrollTop = scrollTop;
    } else {
      navBar.classList.remove('nav-is-sticky');
      navBar.classList.remove('!transform-none');            
      navBar.classList.remove('-translate-y-full');
    }
  }, 100));

  const openNav = () => {
    disableBodyScroll(navEl);

    timeline([
      [navEl, { x: 0 }, { duration: 0.5, easing: [0.25, 0.1, 0.25, 1] }],
      [
        navItemEls,
        { opacity: 1 },
        { duration: 0.3, delay: stagger(0.1), easing: [0.25, 0.1, 0.25, 1], at: '-0.2' },
      ],
    ]);
  };

  const closeNav = (duration = 0.3) => {
    enableBodyScroll(navEl);

    timeline([
      [
        navEl,
        { x: '100%' },
        { duration: duration, easing: [0.25, 0.1, 0.25, 1] },
      ],
      [
        navItemEls,
        { opacity: 0 },
        {
          duration: duration,
          easing: [0.25, 0.1, 0.25, 1],
        },
      ],
    ]);
  };

  closeNav(0);
};

export default Navigation;

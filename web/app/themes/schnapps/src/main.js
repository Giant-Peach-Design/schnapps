import Alpine from 'alpinejs';
import './main.css';

window.Alpine = Alpine;

Alpine.start();

const domReady = () => {
  const banner = document.querySelectorAll('.banner');

  if (banner.length) {
    import('./blocks/banner/banner.js').then(({ default: Banner }) => {
      Banner();
    });
  }
};

document.addEventListener('DOMContentLoaded', domReady);

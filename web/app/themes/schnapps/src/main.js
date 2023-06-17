import './main.css';

const domReady = () => {
  const banner = document.querySelectorAll('.banner');

  if (banner.length) {
    import('./blocks/banner/banner.js').then(({ default: Banner }) => {
      Banner();
    });
  }
};

document.addEventListener('DOMContentLoaded', domReady);

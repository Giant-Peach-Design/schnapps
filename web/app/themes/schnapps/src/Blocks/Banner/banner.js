import BlazeSlider from 'blaze-slider';
import 'blaze-slider/dist/blaze.css';

const Banner = () => {
  const banner = document.querySelectorAll('.banner');

  if (banner.length) {
    banner.forEach((item) => {
      const slider = new BlazeSlider(item, {
        all: {
          enableAutoplay: true,
          autoplayInterval: 2000,
          transitionDuration: 1000,
          transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
          slidesToShow: 1,
        },
      });
    });
  }
};

export default Banner;

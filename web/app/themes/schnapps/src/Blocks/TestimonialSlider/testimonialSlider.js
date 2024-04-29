import Flickity from 'flickity';
import 'flickity-fade';
import 'flickity/dist/flickity.min.css';

const TestimonialSlider = (parentNode) => {
  console.log(Flickity);

  let flkty = new Flickity( parentNode.querySelector('.gp-testimonial-slider'), {
    wrapAround: true,
    draggable: false,
    loop: true,
    autoPlay: false,
    pageDots: false,
    prevNextButtons: false,
    fade: true,
    adaptiveHeight: true
  });

  parentNode.querySelector('.slider-next').addEventListener('click', e => {
    e.preventDefault();
    flkty.next();
  });
  parentNode.querySelector('.slider-prev').addEventListener('click', e => {
    e.preventDefault();
    flkty.previous();
  });
};

export default TestimonialSlider;
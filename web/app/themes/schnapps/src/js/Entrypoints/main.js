import 'vite/modulepreload-polyfill';
import Alpine from 'alpinejs';
import { inView } from 'motion';
import { Slider } from '../components/Slider';
import { OffCanvas } from '../components/OffCanvas/index.js';
import { OffCanvasInner } from '../components/OffCanvas/inner.js';
import '../components/alpine-device.js';
import '../components/header.js';
import '../components/cart.js';
import '../components/QuantityAdjuster/index.js';

Alpine.magic('money', (el, { Alpine }) => {
  return (cents, format) => {
    if (format) {
      format = '£{{' + format + '}}';
    }

    if (typeof cents == 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || '£{{amount}}';

    function defaultOption(opt, def) {
      return typeof opt == 'undefined' ? def : opt;
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultOption(precision, 2);
      thousands = defaultOption(thousands, ',');
      decimal = defaultOption(decimal, '.');

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents = parts[1] ? decimal + parts[1] : '';

      return dollars + cents;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  };
});

window.Alpine = Alpine;
Alpine.start();

const domReady = () => {
  const blocks = document.querySelectorAll('.in');

  inView(
    blocks,
    (target) => {
      target.classList.add('is-visible');

      return () => {
        target.classList.remove('is-visible');
      };
    },
    { margin: '0px 0px -15% 0px' },
  );
};

document.addEventListener('DOMContentLoaded', domReady);

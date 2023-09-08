/** @type {import('tailwindcss').Config} */

const margins = (columns = 12) => {
  const obj = {};

  for (let i = 1; i <= columns; i += 1) {
    obj[`${i}/${columns}`] = `${(i / columns) * 100}%`;
    obj[`-${i}/${columns}`] = `-${(i / columns) * 100}%`;
  }

  return obj;
};

module.exports = {
  content: [
    './templates/**/*.{html,php,twig,js}',
    './parts/**/*.{html,php,twig,js}',
    './blocks/**/*.{html,php,twig,js}',
    './src/**/*.{html,php,twig,js}',
    './patterns/**/*.{html,php,twig,js}',
    './src/**/*.js',
    '../../../../vendor/giantpeach/**/*.php',
  ],
  safelist: [
    'prose-invert',
    'prose-sm',
    'prose-lg',
    'prose-xl',
    'prose-2xl',
    'prose-3xl',
    'bg-white',
    'bg-primrose',
    {
      pattern: /hidden/,
      variants: ['md', 'lg', 'xl'],
    },
    {
      pattern: /block/,
      variants: ['md', 'lg', 'xl'],
    },
    {
      pattern: /justify-(start|end|center|between|around|evenly)/,
      variants: ['md', 'lg', 'xl'],
    },
    {
      pattern: /items-(start|end|center|baseline|stretch)/,
      variants: ['md', 'lg', 'xl'],
    },
  ],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        primary: { DEFAULT: '#AEA0FD' },
        secondary: { DEFAULT: '#D8FF85' },
      },
      container: {
        center: true,
        padding: '1rem',
      },
      screens: {
        '3xl': '1920px',
      },
      spacing: {
        ...margins(),
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

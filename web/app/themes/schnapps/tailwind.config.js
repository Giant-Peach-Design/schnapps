/** @type {import('tailwindcss').Config} */
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
  safelist: ['prose-invert', 'prose-sm', 'prose-lg', 'prose-xl', 'prose-2xl'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

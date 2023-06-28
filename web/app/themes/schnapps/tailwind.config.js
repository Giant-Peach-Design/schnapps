/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.{html,php,twig,js}',
    './parts/**/*.{html,php,twig,js}',
    './blocks/**/*.{html,php,twig,js}',
    './src/blocks/**/*.{html,php,twig,js}',
    './src/Blocks/**/*.{html,php,twig,js}',
    './patterns/**/*.{html,php,twig,js}',
    './src/**/*.js',
  ],
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

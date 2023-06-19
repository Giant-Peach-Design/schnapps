/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.{html,php,js}',
    './parts/**/*.{html,php,js}',
    './blocks/**/*.{html,php,js}',
    './src/blocks/**/*.{html,php,js}',
    './src/Blocks/**/*.{html,php,js}',
    './patterns/**/*.{html,php,js}',
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
  plugins: [],
};

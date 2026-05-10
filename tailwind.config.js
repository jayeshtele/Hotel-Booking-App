/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          50: '#f5f7fb',
          100: '#e8edf5',
          200: '#ced8e8',
          300: '#a9b8cf',
          400: '#8091ad',
          500: '#586780',
          600: '#3f4c62',
          700: '#263143',
          800: '#172235',
          900: '#0d1726',
        },
        coral: {
          50: '#fff0f2',
          100: '#ffe2e7',
          200: '#ffc9d2',
          300: '#ff9aad',
          400: '#ff6380',
          500: '#ff385c',
          600: '#e51f48',
          700: '#bf1238',
        },
        ocean: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#0f9f9a',
          600: '#0f766e',
          700: '#115e59',
        },
        marigold: {
          100: '#fff1c2',
          300: '#ffd56a',
          400: '#f6b83f',
          600: '#b76e10',
        },
      },
      boxShadow: {
        soft: '0 20px 60px rgba(13, 23, 38, 0.12)',
        glow: '0 18px 40px rgba(15, 118, 110, 0.18)',
      },
      backgroundImage: {
        'mesh-subtle':
          'radial-gradient(circle at top left, rgba(255, 56, 92, 0.12), transparent 30%), radial-gradient(circle at right, rgba(15, 159, 154, 0.16), transparent 32%)',
      },
    },
  },
  plugins: [],
};

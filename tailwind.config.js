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
          50: '#030304',
          100: '#0a0b0f',
          200: '#15171d',
          300: '#232631',
          400: '#535c70',
          500: '#8d96aa',
          600: '#adb5c7',
          700: '#cfd6e4',
          800: '#e9edf5',
          900: '#f8fafc',
        },
        coral: {
          50: '#2a0811',
          100: '#4a101c',
          200: '#75172a',
          300: '#b82042',
          400: '#e42b50',
          500: '#ff385c',
          600: '#ff6b86',
          700: '#ff9daf',
        },
        ocean: {
          50: '#061b1a',
          100: '#0a2c2a',
          200: '#0d4945',
          300: '#126b64',
          400: '#159487',
          500: '#20b8aa',
          600: '#0f766e',
          700: '#8ef4ea',
        },
        marigold: {
          100: '#2c2108',
          300: '#ffd56a',
          400: '#f6b83f',
          600: '#f8d27a',
        },
      },
      boxShadow: {
        soft: '0 20px 70px rgba(0, 0, 0, 0.42)',
        glow: '0 18px 48px rgba(32, 184, 170, 0.22)',
      },
      backgroundImage: {
        'mesh-subtle':
          'radial-gradient(circle at top left, rgba(255, 56, 92, 0.18), transparent 28%), radial-gradient(circle at right, rgba(32, 184, 170, 0.16), transparent 34%), linear-gradient(135deg, #030304 0%, #0a0b0f 100%)',
      },
    },
  },
  plugins: [],
};

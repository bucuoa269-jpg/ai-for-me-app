/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 温暖米白 + 苹果风黑灰 + 轻蓝紫科技感 + 少量金色机会点缀
        cream: '#FBFAF7',
        ink: {
          DEFAULT: '#1d1d1f',
          soft: '#3a3a3c',
          mute: '#6e6e73',
        },
        iris: {
          50: '#f3f2ff',
          100: '#e9e7ff',
          200: '#d6d2ff',
          300: '#b8b0ff',
          400: '#9a8cff',
          500: '#7c6bf5',
          600: '#6a55e0',
          700: '#5843bd',
        },
        gold: {
          400: '#f6c560',
          500: '#e8a93c',
          600: '#c98a22',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',
          '"Noto Sans SC"',
          '"Microsoft YaHei"',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(17,17,26,0.04), 0 8px 24px rgba(17,17,26,0.06)',
        lift: '0 2px 6px rgba(17,17,26,0.06), 0 16px 40px rgba(17,17,26,0.10)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(60% 70% at 20% 10%, rgba(124,107,245,0.18) 0%, rgba(124,107,245,0) 60%), radial-gradient(50% 60% at 90% 0%, rgba(246,197,96,0.16) 0%, rgba(246,197,96,0) 55%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease both',
      },
    },
  },
  plugins: [],
};

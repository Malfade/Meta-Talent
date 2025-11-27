/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6C6CFF',
          secondary: '#FF7A18',
          dark: '#0B0D21',
          surface: '#F6F8FF',
        },
        muted: '#697187',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient':
          'linear-gradient(135deg, rgba(108,108,255,0.18), rgba(255,122,24,0.18))',
        'cta-gradient': 'linear-gradient(120deg, #6C6CFF 0%, #FF7A18 100%)',
      },
      boxShadow: {
        glass: '0 20px 40px rgba(13, 15, 35, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};

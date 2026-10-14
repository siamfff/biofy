/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#000000',
          soft: '#000000',
          card: '#0A0A0A',
          elevated: '#141414',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          soft: 'rgba(255, 255, 255, 0.04)',
          strong: 'rgba(255, 255, 255, 0.16)',
        },
        brand: {
          DEFAULT: '#00AAFF',
          soft: '#38BDF8',
          deep: '#0088CC',
        },
        accent: {
          DEFAULT: '#00AAFF',
          soft: '#38BDF8',
          deep: '#0088CC',
        },
        muted: '#8B8B95',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(0, 170, 255, 0.55)',
        'glow-accent': '0 0 40px -8px rgba(0, 170, 255, 0.55)',
        card: '0 4px 24px -8px rgba(0, 0, 0, 0.9)',
        soft: '0 2px 12px -4px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0088CC 0%, #00AAFF 100%)',
        'gradient-brand-soft':
          'linear-gradient(135deg, rgba(0,136,204,0.20) 0%, rgba(0,170,255,0.20) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        float: 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
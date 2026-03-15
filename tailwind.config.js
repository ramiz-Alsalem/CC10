/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#050810',
          dark: '#0a0f1e',
          navy: '#0d1530',
          blue: '#1a2744',
          accent: '#00d4ff',
          green: '#00ff88',
          purple: '#7c3aed',
          pink: '#ff0080',
          yellow: '#ffe600',
          muted: '#8892a4',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
        body: ['Syne', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        float: 'float 4s ease-in-out infinite',
        'matrix-rain': 'matrixRain 10s linear infinite',
        'border-glow': 'borderGlow 2s ease-in-out infinite',
        'text-flicker': 'textFlicker 4s linear infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 20px #00d4ff',
          },
          '50%': {
            boxShadow: '0 0 10px #00d4ff, 0 0 30px #00d4ff, 0 0 50px #00d4ff',
          },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: '#00d4ff' },
          '50%': { borderColor: '#00ff88' },
        },
        textFlicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'cyber-grid': `linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px), 
                       linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px)`,
        'hero-gradient':
          'radial-gradient(ellipse at center top, rgba(0,212,255,0.15) 0%, rgba(5,8,16,0) 70%)',
        'card-gradient':
          'linear-gradient(135deg, rgba(13,21,48,0.8) 0%, rgba(10,15,30,0.9) 100%)',
      },
    },
  },
  plugins: [],
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: '#22C55E',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        
        // Background Colors
        background: '#0B1F17',
        surface: '#0F2A20',
        card: '#1A3329',
        hover: '#234036',
        
        // Text Colors
        'text-primary': '#FFFFFF',
        'text-secondary': '#94A3B8',
        
        // Accent Colors
        accent: {
          red: '#EF4444',
          yellow: '#F59E0B',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          green: '#10B981',
          orange: '#F97316',
        },
        
        // Border Colors - FIXING THE CRASH HERE
        border: {
          DEFAULT: '#1A3329', // Same as card
          light: '#234036',   // Same as hover
          primary: '#22C55E', // Primary color for borders
          accent: '#3B82F6',  // Blue accent
          danger: '#EF4444',  // Red for errors
          warning: '#F59E0B', // Yellow for warnings
        },
      },
      
      // Extend existing borderColor to include our custom borders
      borderColor: ({ theme }) => ({
        ...theme('colors'),
        DEFAULT: theme('colors.border.DEFAULT', 'currentColor'),
      }),
      
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'progress': 'progress 1s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'progress': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      // Extend spacing for custom sizes
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      // Border radius extensions
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // Box shadow extensions
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-inset': 'inset 0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-primary': '0 0 30px rgba(34, 197, 94, 0.5)',
      },
      
      // Extend opacity
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
        '85': '0.85',
      },
      
      // Background image extensions
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
        'gradient-surface': 'linear-gradient(135deg, #0F2A20 0%, #0B1F17 100%)',
        'gradient-card': 'linear-gradient(135deg, #1A3329 0%, #0F2A20 100%)',
        'gradient-glow': 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0) 100%)',
      },
      
      // Z-index extensions
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Transition extensions
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'size': 'width, height',
        'transform-shadow': 'transform, box-shadow',
      },
      
      // Min/Max width/height
      minWidth: {
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minHeight: {
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
      },
    },
  },
  plugins: [],
};

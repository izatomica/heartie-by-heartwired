/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        burgundy: {
          DEFAULT: '#7A2D4D',
          dark: '#5E2239',
          light: '#9A4D6D',
        },
        teal: {
          DEFAULT: '#2D8A8A',
          dark: '#1B6B6B',
          light: '#4BA3A3',
        },
        // Soft Accent Colors
        'dusty-pink': {
          DEFAULT: '#D07080',
          light: '#F0D5D8',
        },
        cream: {
          DEFAULT: '#FCF7F1',
          dark: '#F5F0EB',
        },
        // Funnel Stage Colors
        funnel: {
          awareness: '#A8D5E5',
          consideration: '#9DCDB5',
          conversion: '#E8C86B',
          retention: '#C5C0E8',
        },
        // Text Colors
        text: {
          primary: '#1A1A1A',
          secondary: '#5A5A5A',
          muted: '#8A8A8A',
          inverse: '#FFFFFF',
        },
        // Semantic Colors
        success: {
          DEFAULT: '#5A9A6B',
          light: '#E5F0E8',
        },
        warning: {
          DEFAULT: '#D4A84B',
          light: '#FDF6E3',
        },
        error: {
          DEFAULT: '#C06070',
          light: '#F8E8EB',
        },
        info: {
          DEFAULT: '#4BA3A3',
          light: '#E5F2F2',
        },
        // UI Element Colors
        border: {
          DEFAULT: '#DDD8CC',
          focus: '#1B6B6B',
        },
        card: '#FFFFFF',
        input: '#FFFFFF',
        // Layer Colors
        layer: {
          1: {
            brand: '#7A2D4D',
            bg: 'rgba(122, 45, 77, 0.08)',
          },
          2: {
            marketing: '#1B6B6B',
            bg: 'rgba(27, 107, 107, 0.08)',
          },
          3: {
            plan: '#5A9A6B',
            bg: 'rgba(90, 154, 107, 0.08)',
          },
        },
      },
      fontFamily: {
        headline: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Open Sans"', 'sans-serif'],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(26, 26, 26, 0.04)',
        'sm': '0 2px 4px rgba(26, 26, 26, 0.06)',
        'md': '0 4px 8px rgba(26, 26, 26, 0.08)',
        'lg': '0 8px 16px rgba(26, 26, 26, 0.10)',
        'xl': '0 16px 32px rgba(26, 26, 26, 0.12)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '350ms',
      },
    },
  },
  plugins: [],
}

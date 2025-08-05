import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'soft': '12px',
        'soft-sm': '8px', 
        'soft-lg': '16px',
      },
      fontSize: {
        'title-lg': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }], // 36px
        'title-md': ['2rem', { lineHeight: '2.25rem', fontWeight: '700' }], // 32px
        'title-sm': ['1.75rem', { lineHeight: '2rem', fontWeight: '600' }], // 28px
        'body-lg': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        'body-md': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        'body-sm': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }], // 12px
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        'vgreen-primary': 'hsl(var(--vgreen-primary))',
        'vgreen-secondary': 'hsl(var(--vgreen-secondary))',
        'vgreen-accent': 'hsl(var(--vgreen-accent))',
        'vinfast-red': 'hsl(var(--vinfast-red))',
        'success': 'hsl(var(--success))',
        'warning': 'hsl(var(--warning))',
        'lime-light': 'hsl(var(--lime-light))',
        'spring-light': 'hsl(var(--spring-light))',
        // Banana Green Color Palette
        'banana-green': {
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#3f6212',
          900: '#365314',
          950: '#1a2e05',
        },
        'lime-banana': '#9ACD32',
        'yellow-green': '#ADFF2F',
        'chartreuse': '#7FFF00',
        // Typography colors
        'text-title': '#1B4B33',
        'text-body': '#3B5C45', 
        'text-light': '#6B8E6F',
        // Dark green shades for text
        'green-dark': {
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
          950: '#1B4B33', // Main title color
        },
        'green-muted': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#3B5C45', // Main body text color
          900: '#1f2937',
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;



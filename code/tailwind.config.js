/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral-1': 'var(--colorNeutralBackground1)',
        'neutral-2': 'var(--colorNeutralBackground2)',
        'neutral-3': 'var(--colorNeutralBackground3)',
        'neutral-stroke-1': 'var(--colorNeutralStroke1)',
        'neutral-stroke-2': 'var(--colorNeutralStroke2)',
        'neutral-foreground-1': 'var(--colorNeutralForeground1)',
        'neutral-foreground-2': 'var(--colorNeutralForeground2)',
        'neutral-foreground-3': 'var(--colorNeutralForeground3)',
        'neutral-foreground-disabled': 'var(--colorNeutralForegroundDisabled)',
        'brand-stroke': 'var(--colorBrandStroke1)',
        'brand-background': 'var(--colorBrandBackground)',
      },
    },
  },
  plugins: [],
} 
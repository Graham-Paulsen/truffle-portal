/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'oxford-blue': '#131A30',
        'electric-indigo': '#7300E2',
        'veronica': '#A123E7',
        'phlox': '#DB00FF',
        'cyclamen': '#FF6AA1',
        'lavender': '#E5DEED',
        'platinum': '#EAEAEA',
        'sunset': '#FFD899',
        'orange-peel': '#FFA20D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        atlia: {
          navy:    '#1F3864',
          blue:    '#2E75B6',
          light:   '#D6E4F0',
          green:   '#70AD47',
          yellow:  '#FFC000',
          red:     '#C00000',
          gray:    '#F5F7FA',
          muted:   '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

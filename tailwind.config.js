/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom_orage': '#FF902A',
        'custom_brown': '#2F2105',
        'custom_peach': '#F9D9AA',
        'custom_bg': '#F6EBDA',
        'custom_light_gray': '#7E7D7A'
      },
    },
  },
  plugins: [],
}
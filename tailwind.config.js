/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        "blackColor": "#232321",
        "blueColor": "#4A69E2",
        "whiteColor": "#FAFAFA"
      },
      gridTemplateColumns: {
        "card": 'repeat(auto-fill, minmax(300px, 1fr))',
      }
    },
  },
  plugins: [],
  important: true
}


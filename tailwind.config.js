/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },

    extend: {
      colors: {
        "@sura-primary": "#333333",
        "@sura-border": "#999999",
        "@sura-text": "#999999",
      },
    },
  },
  plugins: [],
};

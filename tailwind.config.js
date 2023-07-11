/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },

    extend: {
      colors: {
        "@sura-primary": "#1C2331",
        "@sura-border": "#BEC7DA",
        "@sura-light": "#bebebe",
        "@sura-text": "#999999",
      },
    },
  },
  plugins: [],
};

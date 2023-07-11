/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },

    extend: {
      colors: {
        "@sura-primary": "#111827",
        "@sura-border": "#d1d5db",
        "@sura-light": "#bebebe",
        "@sura-text": "#999999",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/screens/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },

    extend: {
      colors: {
        "@sura-primary-900": "#1C2331",
        "@sura-primary-800": "#303643",
        "@sura-primary-700": "#444A55",
        "@sura-primary-600": "#595D67",
        "@sura-primary-500": "#6D7179",
        "@sura-primary-400": "#80838A",
        "@sura-primary-300": "#A9ABB0",
        "@sura-primary-200": "#D2D2D4",
        "@sura-primary-100": "#E0E1E1",
        "@sura-primary-100": "#f2f2f2",
        "@sura-light": "#bebebe",
        "@sura-text": "#999999",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF7F3F",
        secondary: "#000",
        main_background: "#ecf0f4",
      },
      boxShadow: {
        "3xl":"4px 4px 8px 0 rgba(0, 0, 0, 0.2), 4px 6px 20px 0 rgba(0, 0, 0, 0.19)",
      },
    },
  },
  plugins: [],
};

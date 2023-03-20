/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [
  //   "./pages/**/*.{js,ts,jsx,tsx}",
  //   "./components/**/*.{js,ts,jsx,tsx}",
  // ],
  content: ["./pages/*.{html,js,tsx,jsx,ts}", "./components/*.{html,js,tsx,jsx,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};

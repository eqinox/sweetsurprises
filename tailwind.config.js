/** @type {import('tailwindcss').Config} */

module.exports = {
  // content: [
  //   "./pages/**/*.{js,ts,jsx,tsx}",
  //   "./components/**/*.{js,ts,jsx,tsx}",
  // ],
  content: [
    "./pages/*.{html,js,tsx,jsx,ts}",
    "./components/*.{html,js,tsx,jsx,ts}",
  ],
  theme: {
    extend: {
      width: {
        128: "32rem",
      },
      height: {
        128: "32rem",
      },
      backgroundImage: {
        "gradientCustom":
          "linear-gradient(90deg, hsla(281, 100%, 48%, 1) 0%, hsla(295, 70%, 54%, 1) 39%, hsla(303, 64%, 58%, 1) 63%, hsla(316, 100%, 66%, 1) 100%)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

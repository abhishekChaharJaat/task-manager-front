/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true, // Centers the container by default
        padding: "2rem", // Adds default padding on all screen sizes
      },
      colors: {
        primary: "#213cc1", // Custom primary color
      },
    },
  },
  plugins: [],
};

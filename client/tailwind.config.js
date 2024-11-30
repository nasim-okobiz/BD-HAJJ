/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        primary: "#DB9E30",
        secondary: "#262222",
        semisecondary: "#0161ae",
      },
      fontFamily: {
        philo: ["Philosopher", "sans-serif"],
      },
      textShadow: {
        custom: "1px 0px 5px #fff",
      },
      keyframes: {
        bounceIn: {
          "0%": { opacity: "0", transform: "translateY(-100%)" },
          "50%": { opacity: "1", transform: "translateY(0)" },
          "100%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        bounceIn: "bounceIn 1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};



import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      container: {
        screens: {
          "2xl": "1440px",
          xl: "1280px",
          lg: "1024px",
          md: "768px",
          sm: "640px",
          xs: "480px",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        primary: "rgb(243 244 246)",
        "primary-dark": "rgb(10 10 10)",
        secondary: "rgb(209 213 219)",
        "secondary-dark": "rgb(64 64 64)",
        text: "#171717",
        "text-dark": "rgb(64 64 64)",
        gray: {
          950: "rgb(10 10 10)",
          800: "rgb(64 64 64)",
          200: "rgb(209 213 219)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

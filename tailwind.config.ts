import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        "warm-white": "var(--warm-white)",
        charcoal: "var(--charcoal)",
        taupe: "var(--taupe)",
        gold: "var(--gold)",
        "light-gold": "var(--light-gold)",
        border: "var(--border)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-jost)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

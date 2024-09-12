// import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
    },
    container: {
      center: true,
      padding: '1rem 2rem',
      screens: {
        'lg': '1250px',
      },
    },
  },
  plugins: [],
};
export default config;

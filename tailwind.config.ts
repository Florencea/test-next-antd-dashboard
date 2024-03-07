import { geekblue } from "@ant-design/colors";
import type { Config } from "tailwindcss";

export default {
  important: "#__next",
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: geekblue[5],
      },
    },
  },
  plugins: [],
} satisfies Config;

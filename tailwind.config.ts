import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("preline/plugin")],
} satisfies Config;

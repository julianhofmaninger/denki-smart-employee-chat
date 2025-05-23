
import { colors } from "./src/theme/colors";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: colors
    },
  },
  plugins: [],
}
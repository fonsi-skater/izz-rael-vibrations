import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // IZZ-RAEL Vibrations brand palette (matches reference theme + logo)
        brand: {
          lime: "#D6F13A",   // primary CTA color
          dark: "#141414",   // navbar / dark pill / text
          orange: "#E8811A", // secondary accent, matches the logo
          panel: "#F3F4EE",  // soft off-white card background
        },
      },
      backgroundImage: {
        "app-gradient":
          "linear-gradient(160deg, #E9EDEA 0%, #C9D2CC 45%, #93A29A 100%)",
      },
      borderRadius: {
        card: "1.75rem",
        pill: "999px",
      },
      boxShadow: {
        panel: "0 8px 30px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;

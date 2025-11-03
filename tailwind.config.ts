import type { Config } from "tailwindcss";

const config: Config = {
  // ⬇️ Fix: använd en sträng, inte en array med ett element
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink:   { 900:"#0F0F10", 700:"#1C1C1C", 600:"#2A2A2B", 500:"#3B3B3C" },
        grayx: { 50:"#F7F8FA", 100:"#EFF1F4", 200:"#E5E7EB", 300:"#D1D5DB", 600:"#6B7280" },
        brand: {
          primary:"#2F80ED",
          accent:"#2CCAA5",
          text:"#1C1C1C",
          muted:"#F3F4F6",
          warn:"#F59E0B",
          danger:"#EF4444",
          ok:"#22C55E",
        },
      },
      boxShadow: {
        card: "0 1px 0 rgba(16,24,40,.04), 0 1px 2px rgba(16,24,40,.06)",
      },
      borderRadius: { xl: "12px", lg2: "10px" },
    },
  },
  plugins: [],
};

export default config;

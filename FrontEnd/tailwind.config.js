/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ".75rem",
      "2xl": "2rem",
      xl: "1.5rem",
      s: "1.1rem",
    },
    extend: {
      screens: {
        "sm-h": { raw: "(min-height: 640px)" },
        "md-h": { raw: "(min-height: 768px)" },
        "lg-h": { raw: "(min-height: 1024px)" },
        "xl-h": { raw: "(min-height: 1280px)" },
      },
      backgroundImage: {
        customimage: "url('/qmm6mqqdw3k41.jpg')",
      },
      colors: {
        midnight: "#192734",
        darker: "#15202B",
        convention_green: "#00FF00",
        even_darker: "#0d131a",
      },
    },
  },
  plugins: [],
};

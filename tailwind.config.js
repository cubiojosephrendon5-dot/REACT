/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FCFAF4",
        forest: "#2D5D46",
        cream: "#FFEDD6",
        bronze: "#AE7533",
        sage: "#94A591",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(45, 93, 70, 0.12)",
        soft2: "0 18px 60px rgba(45, 93, 70, 0.16)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      backgroundImage: {
        "sign-in-image": "url('/sign-in-image.jpg')",
        "sign-up-image": "url('/sign-up-image.jpg')",
      },
      colors: {
        dark: {
          0: "#C1C2C5",
          1: "#A6A7AB",
          2: "#909296",
          3: "#5C5F66",
          4: "#373A40",
          5: "#2C2E33",
          6: "#25262B",
          7: "#1A1B1E",
          8: "#141517",
          9: "#101113",
        },
      },
    },
  },
  plugins: [],
};

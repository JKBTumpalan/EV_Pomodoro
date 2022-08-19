module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 4s linear infinite",
        "bounce-pulse": "bounce 1s linear infinite, pulse 1s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      borderColor: ["active"],
    },
  },
  plugins: [],
};

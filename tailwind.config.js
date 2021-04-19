module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      backgroundImage: theme => ({
        "darthmaul": "url('/src/dist/avatars/avatarDarthMaul.svg')"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

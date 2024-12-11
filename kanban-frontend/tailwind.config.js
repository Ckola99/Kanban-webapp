/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'plus-jakarta': ["Plus Jakarta Sans"],
      },
      colors: {
        'primary-blue': "#635FC7",
        'secondary-blue': "#ABA4FF",
        'primary-black': "#000112",
        'secondary-black': "#20212C",
        'primary-gray': "#2B2C37",
        'secondary-gray': "#3E3F4E",
        "tertiary-gray": "#828FA3",
        "primary-light-gray": "#E4EBFA",
        "secondary-light-gray": "#F4F7FD",
        "red": "#EA5555",
        "secondary-red": "#FF9898"
      },
    },
  },
  plugins: [],
}

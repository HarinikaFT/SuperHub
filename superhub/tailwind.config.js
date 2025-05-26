// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {  colors: {
        contrast1: '#000000',
        contrast2: '#FFFFFF',
        text: '#666666',
        border: '#E3E3E3',
        primary: '#AD1FFF',
        primary_bg: '#E7BDFF',
        bg:'#FAFAFA'
      },
    },
  },
  plugins: [],
}

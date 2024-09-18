/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      lineClamp: {
        3: '3',
      },
      fontSize: {
        // Кастомные размеры для иконок
        'icon-sm': '1.5rem',
        'icon-md': '3rem',
        'icon-lg': '5rem',
        'icon-xl': '8rem',
        'icon-2xl': '12rem',
      },
      screens: {
        '3xl': '1600px',
        '4xl': '1920px',
        '5xl': '2240px',
        '6xl': '2560px',
        '7xl': '2880px',
        '8xl': '3200px',
        '9xl': '3520px',
        '10xl': '3840px', // 4K
        '11xl': '4160px',
        '12xl': '4480px',
        '13xl': '4800px',
        '14xl': '5120px',
        '15xl': '7680px', // 8K
      },
      colors: {
        // Дополнительные цвета (если понадобятся)
        'custom-gray': '#767676',
        'icon-hover': '#555555',
      },
    },
  },
  plugins: [],
}

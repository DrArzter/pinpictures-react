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
        // Custom icon sizes
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
      maxWidth: {
        'xss': '20rem',      // 320px
        'xdd': '24rem',      // 384px
        'xii': '28rem',      // 448px
        'xuu': '32rem',      // 512px
        'xkk': '36rem',      // 576px
        'xlll': '40rem',      // 640px
        '2xll': '48rem',     // 768px
        '3xll': '56rem',     // 896px
        '4xll': '64rem',     // 1024px
        '5xll': '72rem',     // 1152px
        '6xll': '80rem',     // 1280px
        '7xll': '88rem',     // 1408px
        'full': '100%',     // Full width
        'min': 'min-content',
        'max': 'max-content',
      },
      colors: {
        // Additional colors if needed
        'lightModeText': '#333333',
        'lightModeSecondaryText': '#555555',
        'darkModeText': '#f2f2f2',
        'darkModeSecondaryText': '#767676',

        'ACDC': '#ACACAC',

        'lightModeBackground': '#FFFF',
        'lightModeSecondaryBackground': '#e5e5e5',
        'darkModeBackground': '#333333',
        'darkModeSecondaryBackground': '#555555',

        'custom-gray': '#767676',
        
        'icon-hover': '#555555'
      },
      backgroundImage: {
        'bananaStyle': "url(https://storage.yandexcloud.net/pinpictures/otherImages/%D0%91%D0%B0%D0%BD%D0%B0%D0%BD%D1%8B.jpg)",
      },
    },
  },
  plugins: [],
}

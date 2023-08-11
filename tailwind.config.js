/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Add additional column definitions
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
        15: 'repeat(15, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'xs': "475px",
        '2xs': "375px",
        '3xs': "275px",
        'mdlg': "896px",
      },
      fontSize: {
        '2xs': '.725rem',
        '3xs': '.600rem',
      },
      fontFamily: {
        // logohead: ['var(--font-sen)'],
      },
      colors: {
        myblue: '#36A2EB',
        myotherblue: '#3C91E6',
        myorange: '#FFBA08',
        myyelloworange: '#FFD166',
        myyellow: '#FFEE88',
        mybrightorange: '#FE9000',
        mybrightyellow: '#FFDD4A',
        mylightblue: '#5ADBFF',
        mymidblue: '#3C6997',
        mydarkblue: '#094074',
        mybiege: '#E6C79C',

      }
    },
  },
  plugins: [],
}

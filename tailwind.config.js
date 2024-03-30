/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // plugins: [require("daisyui"), ['prettier-plugin-tailwindcss']],
  plugins: ['prettier-plugin-tailwindcss'],
  daisyui: {
    themes: [
        {
          mytheme: {
             "primary": "#ffd166",
             "secondary": "#3c91e6",         
             "accent": "#f59e0b",        
             "neutral": "#4b5d67",      
             "base-100": "#f5f5f5",      
             "info": "#42a9e0",       
             "success": "#4caf50",       
             "warning": "#ffc107",       
             "error": "#d32f2f",
          },
        },
      ],
  },
  theme: {
    extend: {
      gridTemplateColumns: {
        // Add additional column definitions
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
        15: 'repeat(15, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
        17: 'repeat(17, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
        19: 'repeat(19, minmax(0, 1fr))',
        20: 'repeat(20, minmax(0, 1fr))',
        21: 'repeat(21, minmax(0, 1fr))',
        22: 'repeat(22, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
        '11': 'repeat(11, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
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
        myorange: '#FFD166',
        myotherorange: '#FFBA08',
        myyelloworange: '#FFD166',
        myyellow: '#FFEE88',
        mybrightorange: '#FE9000',
        mybrightyellow: '#FFDD4A',
        mylightblue: '#5ADBFF',
        mymidblue: '#3C6997',
        mydarkblue: '#094074',
        mybiege: '#E6C79C',
        mydarktext: '#222222'

      }
    },
  },
  plugins: [],
}






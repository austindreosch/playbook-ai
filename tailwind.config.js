/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
        {
          mytheme: {
             "primary": "#ffd166",
             "secondary": "#3c91e6",         
             "accent": "#ef8354",        
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'xs': "475px",
        '2xs': "375px",
        'mdlg': "896px",
      },
      fontSize: {
        '2xs': '.725rem',
      },
      fontFamily: {
        // logohead: ['var(--font-sen)'],
      },
      colors: {
        myblue: '#3C91E6',
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






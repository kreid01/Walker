/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./screens/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        arcade: ["Space Mono"]
      }
    },
  },
  plugins: [],
  safelist: [
    'h-[80px]',
    'h-[90px]',
    'h-[100px]',
    'h-[110px]',
    'h-[120px]',
    'h-[140px]',
    'h-[150px]',
    'h-[160px]',
    'h-[170px]',
    'h-[180px]',
    'w-[80px]',
    'w-[90px]',
    'w-[100px]',
    'w-[110px]',
    'w-[120px]',
    'w-[140px]',
    'w-[150px]',
    'w-[160px]',
    'w-[170px]',
    'w-[180px]',
  ]
};

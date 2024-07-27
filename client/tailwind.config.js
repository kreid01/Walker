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
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-violet-500',
    'bg-yellow-500',
    'bg-orange-500',
    'bg-brown-500',
    'border-yellow-500',
    'border-orange-500',
    'border-brown-500',
    'border-blue-500',
    'border-green-500',
    'border-red-500',
    'border-indigo-500',
    'border-teal-500',
    'border-violet-500',
    'border-pink-500',
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

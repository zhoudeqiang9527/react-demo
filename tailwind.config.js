/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 浅色模式颜色
        'light-bg': '#ffffff',
        'light-text': '#333333',
        'light-primary': '#3b82f6',
        'light-secondary': '#64748b',
        // 深色模式颜色
        'dark-bg': '#1e293b',
        'dark-text': '#f8fafc',
        'dark-primary': '#60a5fa',
        'dark-secondary': '#94a3b8',
      },
    },
  },
  darkMode: 'class', // 使用class策略进行深色模式切换
  plugins: [],
}
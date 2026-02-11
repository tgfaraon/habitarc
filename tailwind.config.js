module.exports = {
  darkMode: "class",

  content: ["./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  safelist: [

    // GREEN 
    "bg-green-100", "text-green-700",
    "bg-green-900", "text-green-200",
    "bg-green-500",

    // BLUE 
    "bg-blue-100", "text-blue-700",
    "bg-blue-900", "text-blue-200",
    "bg-blue-500",

    // YELLOW 
    "bg-yellow-100", "text-yellow-700",
    "bg-yellow-900", "text-yellow-200",
    "bg-yellow-500",

    // PURPLE 
    "bg-purple-100", "text-purple-700",
    "bg-purple-900", "text-purple-200",
    "bg-purple-500",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // primary 
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      }, borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 2px 6px rgba(0,0,0,0.06)",
        cardHover: "0 4px 12px rgba(0,0,0,0.08)",
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
      },
    },
  },

  plugins: [],
};
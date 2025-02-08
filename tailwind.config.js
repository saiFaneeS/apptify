/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#007FFF",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontSize: {
        xs: "clamp(0.75rem, 0.5vw + 0.7rem, 0.775rem)",
        sm: "clamp(0.875rem, 0.5vw + 0.82rem, 0.915rem)",
        base: "clamp(1rem, 0.5vw + 0.94rem, 1.05rem)",
        lg: "clamp(1.125rem, 0.5vw + 1.06rem, 1.175rem)",
        xl: "clamp(1.25rem, 0.5vw + 1.18rem, 1.3rem)",
        "2xl": "clamp(1.5rem, 0.75vw + 1.2em, 1.62rem)",
        "3xl": "clamp(1.875rem, 0.9vw + 1.2rem, 2.1rem)",
        "4xl": "clamp(2.25rem, 1.2vw + 2rem, 2.5rem)",
        "5xl": "clamp(3rem, 2vw + 2.6rem, 3.3rem)",
        "6xl": "clamp(3.75rem, 2.5vw + 3.2rem, 4.1rem)",
        "7xl": "clamp(4.5rem, 3vw + 3.8rem, 4.8rem)",
        "8xl": "clamp(6rem, 3.5vw + 5.1rem, 6.4rem)",
        "9xl": "clamp(8rem, 4vw + 6.8rem, 8.5rem)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};

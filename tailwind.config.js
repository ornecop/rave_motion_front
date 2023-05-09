/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "640px",
            md: "768px",
            lg: "960px",
            xl: "1200px",
        },
        fontFamily: {
            sans: ["Montserrat", "sans-serif"],
        },
        extend: {
            colors: {
                primary: "#020617",
                secondary: "#0f172a",
                secondaryBorder: "#1e293b",
            },
        },
    },
    plugins: [],
};

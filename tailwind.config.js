/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
        },
        fontFamily: {
            sans: ["Montserrat", "sans-serif"],
        },
        extend: {
            colors: {
                text: "#FFFFFF",
                primary: "#020617",
                secondary: "#0f172a",
                secondaryBorder: "#1e293b",
                textLight: "#DBDBDB",
                primaryLight: "#FAFAFA",
                secondyLight: "#FFFFFF",
                secondaryBorderLight: "#000000",
            },
        },
    },
    plugins: [],
};

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        extend: {
            colors: {
                "main-blue": "#C3D8FE",
                "button-blue": "#265673",
                "button-hover-blue": "#4F7A94",
            },
            screens: {
                xs: "475px",
                xxs: { min: "250px", max: "675px" },
            },
        },
    },
    variants: {},
    plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#001F3F', // Navy Blue
                accent: '#D4AF37', // Gold
                surface: '#F3F4F6', // Light Gray/White
                success: '#10B981',
                danger: '#EF4444',
            },
            fontFamily: {
                sans: ['Montserrat', 'Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

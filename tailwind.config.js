/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                customBlue: '#008291',
            },
            backgroundImage: {
                landing: "url('/src/assets/images/landing.png')",
                small_landing: "url('/src/assets/images/small_landing.png')",
                background_logo: "url('/src/assets/images/background_logo.png')",
            }
        },
    },
    plugins: [],
}

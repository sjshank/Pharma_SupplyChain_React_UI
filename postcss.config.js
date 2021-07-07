const tailwindcss = require("tailwindcss");
const purgecss = require('@fullhuman/postcss-purgecss')
module.exports = {
    plugins: [
        tailwindcss("./tailwind.js"),
        require('tailwindcss'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require("autoprefixer"),
        purgecss({
            content: [
                './src/**/*.{js,jsx,ts,tsx}',
                './**/*.html'
            ]
        })
    ]
};

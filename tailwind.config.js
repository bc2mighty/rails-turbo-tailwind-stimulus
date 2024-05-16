module.exports = {
    content: [
      './app/helpers/**/*.rb',
      './app/javascript/**/*.js',
      './app/views/**/*',
    ],
    theme: {
      extend: {},
    },
    plugins: [
        require('flowbite/plugin'),
    ],
    content: [
        './node_modules/flowbite/**/*.js',
    ]
}
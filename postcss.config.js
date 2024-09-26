module.exports = {
  plugins: [
    require('postcss-import'), // This will combine all your CSS files
    require('@fullhuman/postcss-purgecss')({
      content: [
        './views/**/*.hbs',  // Change this to match your template engine (e.g., .pug, .html)
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
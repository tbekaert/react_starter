module.exports = ctx => {
  let isProd = process.env.NODE_ENV === 'production';
  console.log(`PostCSS env: ${process.env.NODE_ENV}`);

  return {
    plugins: [
      require('postcss-inline-svg')(),
      isProd && require('postcss-normalize')({ browsers: ['last 3 versions'] }),
      isProd && require('css-mqpacker')({
        sort: require('sort-css-media-queries')
      }),
      isProd && require('postcss-cleaner')({
        sources: ['public/index.html', 'src/**/*.js'],
        ignore: [/js-/, /isvg/]
      })
    ].filter(p => p)
  };
};

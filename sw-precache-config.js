module.exports = {
  swFilePath: 'build/service-worker.js',
  stripPrefix: 'build/',
  staticFileGlobs: [
    'build/*.html',
    'build/manifest.json',
    'build/static/**/!(*map*)'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  navigateFallback: 'index.html',
  runtimeCaching: [
    {
      urlPattern: /\.(jpg|png|jpeg|gif)$/,
      handler: 'fastest'
    },
    {
      urlPattern: /https?:\/\/images.+/,
      handler: 'fastest'
    }
  ],
  verbose: process.env.REACT_APP_HOST_ENV === 'staging'
};

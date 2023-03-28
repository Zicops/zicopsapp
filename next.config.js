const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.resolve.extensions = ['.jsx', '.js', '.json', '.wasm'];

    config.resolve.fallback = {
      ...config.resolve.fallback,
      // your aliases
      'react/jsx-runtime': 'react/jsx-runtime.js',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js'
    };

    // // makes styles folder accessible with ~
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   scss: path.resolve(__dirname, 'styles')
    // };

    return config;
  },
  // adds base.scss to every other files automatically so you don't have to import it
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'styles')],
    prependData: `@import "~styles/base.scss";`
  },
  images: {
    domains: ['storage.googleapis.com']
  },
  async rewrites() {
    return [
      {
        source: '/homepage',
        destination: '/static/index.html'
      }
    ];
  }
};

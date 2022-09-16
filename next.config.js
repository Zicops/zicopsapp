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
    return config;
  },
  images: {
    domains: ['storage.googleapis.com']
  }
};
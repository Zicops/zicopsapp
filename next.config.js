module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.resolve.extensions = ['.jsx', '.js', '.json', '.wasm'];
    return config;
  },
  images: {
    domains: ['storage.googleapis.com']
  }
};

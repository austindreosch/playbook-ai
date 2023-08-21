/** @type {import('next').NextConfig} */

module.exports = {
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.node$/,
        loader: 'node-loader',
      });
  
      return config;
    },
  };

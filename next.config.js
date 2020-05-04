require('dotenv').config();
const withCSS = require('@zeit/next-css');
const webpack = require('webpack');

const apiKey = process.env.SHOPIFY_API_KEY;

module.exports = withCSS({
  serverRuntimeConfig: {
    // Will only be available on the server side
    API_KEY: apiKey
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_KEY: apiKey // Pass through env variables
  },
  webpack: (config) => {
    const env = { API_KEY: apiKey };
    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  }
});

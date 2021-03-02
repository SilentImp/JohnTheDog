/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.extensions = [...config.resolve.extensions, '.jsx'];
    config.resolve.alias = {
      ...config.resolve.alias,
      public: path.resolve(__dirname, './public'),
      components: path.resolve(__dirname, './components'),
      contexts: path.resolve(__dirname, './contexts'),
      styles: path.resolve(__dirname, './styles'),
      configs: path.resolve(__dirname, './configs'),
      constants: path.resolve(__dirname, './constants'),
      utils: path.resolve(__dirname, './utils')
    };
    return config
  },
};

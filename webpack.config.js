// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path');
require('dotenv').config();

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const TARGET_ENTRY = process.env.TARGET_ENTRY || 'createSession';

const config = {
  entry: `./src/lambda_functions/${TARGET_ENTRY}.js`,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${TARGET_ENTRY}.js`,
    clean: true,
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['**/*.LICENSE.txt'],
      protectWebpackAssets: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  return config;
};

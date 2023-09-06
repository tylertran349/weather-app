const path = require(`path`);
const webpack = require('webpack');

module.exports = {
  entry: `./src/index.js`,
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  output: {
    filename: `main.js`,
    path: path.resolve(__dirname, `dist`),
  },
  resolve: {
    fallback: {
      "fs": false,
      "crypto": false,
      "process": require.resolve("process/browser")
    }
  },
};
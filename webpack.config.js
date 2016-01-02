const webpack = require('webpack');
const packageJson = require('./package.json');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const vendors = Object.getOwnPropertyNames(packageJson.dependencies);

module.exports = {
  context: __dirname,
  target: 'web',

  devtool: 'inline-source-map',

  devServer: {
    contentBase: 'public'
  },

  entry: {
    vendor: [
      'rx',
      '@cycle/core',
      '@cycle/dom'
    ],
    app: [
      './src/index.jsx'
    ]
  },
  output: {
    path: '../public',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js', minCHunks: Infinity }),
    new CommonsChunkPlugin({ name: 'common', filename: 'common.js', minChunks: 2, chunks: ['app', 'vendor'] })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: /src/,
        loader: 'babel',
      }
    ]
  }
};
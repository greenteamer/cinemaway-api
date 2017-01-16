/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const env = process.env;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker')


module.exports = {
  debug: true,
  devtool: 'eval-source-map',
  entry: {
    bundle: ['babel-polyfill', './src/main'],
  },
  // entry: [
  //   'webpack-dev-server/client?http://localhost:8080',
  //   'webpack/hot/only-dev-server',
  //   './src/main'
  // ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/static/',
  },
  // output: {
  //   path: path.resolve('./dist/'),
  //   filename: '[name]-[hash].js',
  //   publicPath: 'http://localhost:8080/static/dist/', // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
  // },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: 'url?limit=8192'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader'),
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader'),
      },
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(), // don't reload if there is an error
    // new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin('[name].css'),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
    }),
  ],
};

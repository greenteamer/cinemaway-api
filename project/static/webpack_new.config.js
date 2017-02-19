/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const env = process.env;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker')


module.exports = {
  // debug: true,
  // devtool: "cheap-eval-source-map",
  // devtool: "inline-source-map",
  entry: {
    bundle: [
      "babel-polyfill",
      "whatwg-fetch",
      './src/main',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            [ "es2015", { modules: false } ],
            "stage-0",
            "react",
          ],
          plugins: [
            "transform-async-to-generator",
            "transform-decorators-legacy",
          ]
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: 'url?limit=8192'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'sass-loader' ]
        }),
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'sass-loader' ]
        }),
      },
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(), // don't reload if there is an error
    // new BundleTracker({filename: './webpack-stats.json'}),
    // new webpack.NamedModulesPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //   debug: true,
    // }),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        // mangle: {
        //     screw_ie8: true,
        //     keep_fnames: true
        // },
        compress: {
            screw_ie8: true
        },
        comments: false
    }),
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

// Example webpack configuration with asset fingerprinting in production.
'use strict';

var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');

// must match config.webpack.dev_server.port
var devServerPort = 3808;

// set NODE_ENV=production on the environment to add asset fingerprints
var production = process.env.NODE_ENV === 'production';

var config = {
  entry: {
    'application': './webpack/application.js'
  },


  output: {
    // Build assets directly in to public/webpack/, let webpack know
    // that all webpacked assets start with webpack/

    // must match config.webpack.output_dir
    path: path.join(__dirname, '..', 'public', 'webpack'),
    publicPath: '/webpack/',

    filename: production ? '[name]-[chunkhash].js' : '[name].js'
  },
   module: {
     loaders: [
     {
       test: /\.css$/,
       loader: 'style-loader!css-loader'
     },
     {
       test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
       loader: "file"
     },
     {
       test: /\.(woff|woff2)$/,
       loader:"url?prefix=font/&limit=5000"
     },
     {
       test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
       loader: "url?limit=10000&mimetype=application/octet-stream"
     },     
     {
       test: /\.html$/,
       loader: "html-loader",
       options: {
         minimize: true
       }
     },
     {
       test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
       loader: "url?limit=10000&mimetype=image/svg+xml"
     }
     ]
   },

  resolve: {
    modules: [
      path.join(__dirname, '..', 'webpack'),
      "node_modules"
    ]
  },

  plugins: [
    // must match config.webpack.manifest_filename
    new StatsPlugin('manifest.json', {
      // We only need assetsByChunkName
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
    })]
};

if (production) {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  );
} else {
  config.devServer = {
    port: devServerPort,
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
  config.output.publicPath = '//localhost:' + devServerPort + '/webpack/';
  // Source maps
  config.devtool = 'cheap-module-eval-source-map';
}

module.exports = config;

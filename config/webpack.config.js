/***
 * Excerpted from "Rails, Angular, Postgres, and Bootstrap, Second Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/dcbang2 for more book information.
***/
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
    rules: [
      { 
        test: /\.css$/, 
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]

      },
      { 
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader" 
      },
      { 
        test: /\.(woff|woff2)$/,
        use:"url-loader?prefix=font/&limit=5000" 
      },
      { 
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/octet-stream" 
      },
      { 
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=image/svg+xml" 
      },

      // existing loader configuration
      {
        test: /\.html/,
        use: "raw-loader"
      }
    ]
  },

  // rest of the configuration...


  resolve: {
    modules: [
      path.join(__dirname, '..', 'webpack'),
      "node_modules"
    ]
  },

  performance: {
    hints: false
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
    new webpack.optimize.DedupePlugin()
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

var webpack = require('webpack')
var path = require('path')

var nodeExternals = require('webpack-node-externals')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var autoprefixer = require('autoprefixer')

var config = require('../../config')

module.exports = [
  /* Server build
   * Note target, externals, no json-loader
   */
  {
    name: 'Server',
    target: 'node',
    entry: './app.js',
    output: {
      path: path.join(__dirname, '..', '..', 'build'),
      filename: 'app.js'
    },
    resolve: {
      root: path.join(__dirname, '..', '..'),
      moduleDirectories: ['node_modules'],
      extensions: ['', '.js', '.jsx', '.json']
    },
    externals: [nodeExternals()],
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['react', 'es2015', 'stage-0']
          }
        },
        {
          test: /\.(css|scss)/,
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[path][name]__[local]--[hash:base64:5]!scss-loader'
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          loader: 'url-loader'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ],
    postcss: function () {
      return [autoprefixer]
    }
  },
  /* Client build
   * Note json-loader, uglifyJsPlugin, commonsChunkPlugin
   */
  {
    name: 'Client',
    entry: {
      bundle: './lib/client'
    },
    output: {
      path: path.join(__dirname, '..', '..', 'public/assets'),
      filename: '[name].js'
    },
    resolve: {
      root: path.join(__dirname, '..', '..'),
      moduleDirectories: ['node_modules'],
      extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['react', 'es2015', 'stage-0']
          }
        },
        {
          test: /\.(css|scss)/,
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[path][name]__[local]--[hash:base64:5]!scss-loader'
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          loader: 'url-loader'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
          'DEPLOYMENT_URL_MAPPING': JSON.stringify(config.deploymentURLMapping)
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      // new webpack.optimize.CommonsChunkPlugin('common.js', ['bundle']),
      new CopyWebpackPlugin([
        {context: 'assets', from: '**/*'}
      ])
    ],
    postcss: function () {
      return [autoprefixer]
    }
  }
]

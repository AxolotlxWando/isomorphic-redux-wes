
var webpack = require('webpack')
var path = require('path')

var optimize = webpack.optimize
var CopyWebpackPlugin = require('copy-webpack-plugin')
var autoprefixer = require('autoprefixer')

var config = require('../../config')

module.exports = {
  entry: {
    bundle: './lib/client/'
  },
  output: {
    path: path.join(__dirname, '..', '..', 'public', 'assets'),
    filename: '[name].js',
    publicPath: 'http://localhost:' + config.devPort + '/assets/'
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
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'stage-0', 'es2015'],
          plugins: [[
            'react-transform',
            {
              transforms: [{
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react']
              }]
            }
          ]]
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(css|scss)/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path][name]__[local]--[hash:base64:5]!scss-loader'
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
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new optimize.OccurenceOrderPlugin(),
    new optimize.CommonsChunkPlugin('common.js', ['bundle']),
    new CopyWebpackPlugin([
      { context: 'assets', from: '**/*' }
    ])
  ],
  postcss: function () {
    return [autoprefixer]
  },
  devtool: 'source-map',
  devServer: {
    port: config.devPort,
    contentBase: 'http://localhost:' + config.port
  }
}

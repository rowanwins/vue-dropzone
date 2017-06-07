var path = require('path')
var webpack = require('webpack')

module.exports = {
  resolveLoader: {
    root: path.join(__dirname, '../node_modules'),
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  module: {
    loaders: [
    {
      test: /\.vue$/,
      loader: 'vue'
    },
    {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loader: 'style!css!autoprefixer'
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }
    ]
  }
}

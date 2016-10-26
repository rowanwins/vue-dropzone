var path = require('path');
var webpack = require('webpack');
var config = require('./base');

module.exports = Object.assign({}, config, {
    entry: './dev/index.js',
    output: {
      path: path.resolve(__dirname, '../dev'),
      publicPath: '/dev/',
      filename: 'bundle.js'
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true
    },
    devtool: '#eval-source-map'
});

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vuejs.github.io/vue-loader/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
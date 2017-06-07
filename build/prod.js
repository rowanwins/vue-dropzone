var path = require('path')
var config = require('./base');
var webpack = require('webpack')

module.exports = Object.assign({}, config, {
    entry: './src/index.vue',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'vue2-dropzone.js',
      library: ['vue2-dropzone'],
      libraryTarget: 'umd'
    },
    devtool: false,
    plugins: [
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
    ]
});
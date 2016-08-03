var path = require('path')
var webpack = require('webpack')
var config = require('./webpack.config.js')

delete config.devtool;
delete config.watch;
delete config.plugins;
delete config.vue.loaders;

config.entry = {
    Dropzone: ['./src/Dropzone.vue']
};

config.plugins = [

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
];

config.output = {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js',
    library: ['Keen', '[name]'],
    libraryTarget: 'umd'
};

module.exports = config;

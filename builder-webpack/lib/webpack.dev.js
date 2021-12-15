const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');
const webpack = require('webpack');
const devConfig = {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        static: {

        },
        hot: true,
        stats: 'errors-only'
    },
    devtool: 'cheap-source-map'
}

module.exports = merge(baseConfig, devConfig);
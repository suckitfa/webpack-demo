const baseConfig = require('./webpack.base');
const webpack = require('webpack');
const merge = require('webpack-merge');

const prodConfig = {
    plugins: {}
}
module.exports = merge(prodConfig, baseConfig);
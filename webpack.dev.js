const path = require('path');
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const getAbsolutePath = function(filePath) {
    return path.resolve(__dirname, filePath);
}

module.exports = {
    entry: {
        app: './src/index.js',
        search: './src/search.js'
    },
    output: {
        filename: "[name].js",
        // 必须是绝对路径
        path: getAbsolutePath('dist'),

    },
    mode: "development",
    module: {
        rules: [{
                test: /.js$/,
                use: 'babel-loader'
            }, {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|gif|jpeg|jpg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240
                    }
                }]
            },
            {
                test: /.(woff|woff2|eot|ott|tff)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    devServer: {
        static: {
            directory: getAbsolutePath('dist')
        },
        port: 9999,
        hot: true,
        stats: 'error-only'
    }
}
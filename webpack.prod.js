const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getAbsolutePath = function(filePath) {
    return path.resolve(__dirname, filePath);
}

module.exports = {
    entry: {
        app: './src/index.js',
        search: './src/search.js'
    },
    output: {
        filename: "[name]_[chunkhash:8].js",
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
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }, {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|gif|jpeg|jpg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 10240,
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            },
            // {
            //     test: /.(png|gif|jpeg|jpg)$/,
            //     use: [{
            //         loader: 'url-loader',
            //         options: {
            //             limit: 10240
            //         }
            //     }]
            // },
            {
                test: /.(woff|woff2|eot|ott|tff)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 10240,
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        // 将css提取成独立的文件
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        // css压缩
        new CssMinimizerWebpackPlugin({
            test: /\.css$/ig,
        }),
        // html 两个页面 search index
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/search.html'),
            filename: 'search.html',
            chunks: ['search'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        })
    ],
    devServer: {
        static: {
            directory: getAbsolutePath('dist')
        },
        port: 9999,
        hot: true,
    }
}
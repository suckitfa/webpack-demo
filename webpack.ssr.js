const glob = require('glob')
const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    // 所有页面的入口index.js
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.js'))
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index\.js/)
        const pageName = match && match[1];
        if (pageName) {
            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: `src/${pageName}/index.html`,
                    filename: `${pageName}.html`,
                    chunks: [pageName],
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
            );
        }
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMPA();
const getAbsolutePath = function(filePath) {
    return path.resolve(__dirname, filePath);
}

module.exports = {
    entry,
    output: {
        filename: "[name]-srr.js",
        // 必须是绝对路径
        path: getAbsolutePath('dist'),
        libraryTarget: 'umd'

    },
    mode: "none",
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
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => {
                                    require('autoprefixer')({
                                        browsers: ['last 2 version', '>1%', 'ios 7']
                                    })
                                }
                            }
                        }
                    }
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
        // new HtmlWebpackExternalsPlugin({
        //     externals: [{
        //             module: 'react',
        //             entry: 'https://now8.gtimg.com/now/lib/16.2.0/react.min.js',
        //             global: 'React'
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://now8.gtimg.com/now/lib/16.2.0/react-dom.min.js',
        //             global: 'ReactDOM'
        //         }
        //     ]
        // })
    ].concat(htmlWebpackPlugins),
    devServer: {
        static: {
            directory: getAbsolutePath('dist')
        },
        port: 9999,
        hot: true,
    },
    devtool: 'eval'
}
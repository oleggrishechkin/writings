const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        app: path.resolve('src', 'index.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve('build'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve('src')],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                exclude: /\.module\.css$/i,
                include: [path.resolve('src')],
                use: [
                    process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.module\.css$/i,
                include: [path.resolve('src')],
                use: [
                    process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    process.env.NODE_ENV === 'production' ? '[hash:base64]' : '[path][name]__[local]'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
                    {
                        loader: path.resolve('svgLoader.js')
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    optimization: {
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
        splitChunks: {
            chunks: 'all',
            name: false
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`
        }
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: path.resolve('public'), to: path.resolve('build') }]
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        ...(process.env.NODE_ENV === 'production'
            ? [
                  new MiniCssExtractPlugin({
                      filename: '[name].[hash].css'
                  })
              ]
            : []),
        new HtmlWebpackPlugin({
            template: path.resolve('public', 'index.html')
        })
    ],
    devServer: {
        compress: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        hot: true,
        open: true,
        useLocalIp: true
    },
    stats: 'errors-only'
};

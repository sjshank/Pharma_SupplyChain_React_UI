const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require("@gfx/zopfli");

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: __dirname + '/build',
        publicPath: './',
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js'
    },
    devtool: false,
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            // minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                    name: 'vendors',
                    chunks: 'all',
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                    compress: {
                        inline: false
                    }
                }
            })
        ]
    },
    plugins: [
        new CompressionPlugin({
            compressionOptions: {
                numiterations: 15,
            },
            algorithm(input, compressionOptions, callback) {
                return zopfli.gzip(input, compressionOptions, callback);
            },
            test: /\.ts(\?.*)?$/i,
            minRatio: 0.8,
            threshold: 8192,
            exclude: /.map$/
        }),
    ],
});
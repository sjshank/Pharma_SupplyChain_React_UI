const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    // fallback: {
    //   "os": false, "https": false, "http": false, "crypto": false, "stream": false, "assert": false, util: require.resolve('util/'),
    //   assert: require.resolve('assert/'),
    //   stream: require.resolve('stream-browserify'),
    //   zlib: require.resolve('browserify-zlib'),
    //   "buffer": require.resolve("buffer/")
    // },
  },
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [{
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/preset-env",
              "@babel/preset-react",
              {
                "plugins": [
                  "@babel/plugin-proposal-object-rest-spread",
                  "@babel/plugin-proposal-export-default-from",
                  "@babel/plugin-proposal-export-namespace-from",
                  [
                    "@babel/plugin-proposal-class-properties",
                    {
                      "loose": false
                    }
                  ]
                ]
              }
            ]
          }
        }
      ]
    },
    {
      test: /\.css$/i,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            url: true,
            import: true,
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            modules: {
              localIdentName: "[name]_[local]___[hash:base64:5]",
            }
          }
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              strictMath: true,
              sourceMap: true,
            },
          },
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|jpg)$/i,
      loader: 'url-loader',
    },
    {
      test: /\.(png|svg|jpe?g|gif|woff|woff2|eot|ttf|otf|jpg)$/,
      use: [
        'file-loader',
      ],
    },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ inject: true, template: path.resolve(__dirname, 'public', 'index.html') }),
  ]
};
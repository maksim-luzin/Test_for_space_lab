'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rimraf = require('rimraf');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  context: path.join(__dirname, 'src'),

  entry: { index: './index' },

  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    library: '[name]',
    assetModuleFilename: 'images/[name][ext]'
  },
  mode: devMode ? 'development' : 'producrion',

  plugins: [
    {
      apply: (compiler) => {
        !devMode && rimraf.sync(compiler.options.output.path)
      }
    },
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: devMode,
      title: 'HTML and CSS'
    }),
    new webpack.HotModuleReplacementPlugin({}),
  ],
  resolve: {
    extensions: [' ', '.js', '.scss'],
  },
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|jfif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,


        type: 'asset/resource',
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'src'),
    host: 'localhost',
    port: 3000,
    hot: true,
    inline: true
  },

  mode: NODE_ENV == 'production' ? 'production' : 'none'
};

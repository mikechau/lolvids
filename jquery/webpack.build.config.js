var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.base.config');
var CleanPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var buildDate = (new Date());

var config = _.merge(
  webpackConfig({
    hot: false,
    build: true,
    plugins: [
      new CleanPlugin(['build']),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new ExtractTextPlugin('[name]-[hash].css'),
      new webpack.NoErrorsPlugin(),
      new HtmlWebpackPlugin({
        title: 'lolvids powered by jquery',
        description: 'lolvids example application using jquery',
        filename: '../index.html',
        minify: {
          collapseWhitespace: true
        },
        inject: false,
        template: './templates/prod/index.html',
        buildDate: {
          unix: buildDate.getTime(),
          string: buildDate.toString(),
          date: buildDate.toDateString()
        }
      }),
      new StatsPlugin(path.join(__dirname, 'build', 'stats.json'), {
        chunkModules: true,
        exclude: [
          /node_modules[\\\/]react(-router)?[\\\/]/
        ]
      })
    ],
    eslintrcPath: './_prod.eslintrc'
  }),
  {
    output: {
      publicPath: 'assets/',
      filename: '[name]-[hash].js'
    },
    cache: false,
    debug: false,
    devtool: false
  }
);

module.exports = config;

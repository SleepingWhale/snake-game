const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist')
};

const config = {
  context: paths.src,
  entry: {
    app: './index'
  },
  output: {
    path: paths.dist,
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: [
              {
                loader: 'typings-for-css-modules-loader?modules&namedExport&camelCase',
                options: {
                  modules: true,
                  namedExport: true
                }
              }
            ]
          })
      }
    ]
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /css\.d\.ts$/
    ]),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new ExtractTextPlugin({filename: 'style.css'})
  ]
};

module.exports = config;

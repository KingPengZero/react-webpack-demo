const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CommCfg = require('./wepback.common.config.js');

const devConfig = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '..', 'src/index.js')
    ]
  },
  output: {
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader', options: {
              sourceMap: true, modules: true,
              localIdentName: '[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader', options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 11111,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    host: '0.0.0.0'
  },
  // plugins: [
  //   new webpack.LoaderOptionsPlugin({
  //     options: {
  //       postcss: [
  //         autoprefixer(),
  //       ]
  //     }
  //   })
  // ]
};

const mergeCfg = merge({
  customizeArray(a, b, key) {
    /*entry.app不合并，全替换*/
    if (key === 'entry.app') {
      return b;
    }
    return undefined;
  }
})(CommCfg, devConfig);

module.exports = mergeCfg;

const commonConfig = require('./webpack.common.js');
const {merge} = require('webpack-merge')
const webpack = require('webpack')
const path = require('path') // webpack内置模块

const devConfig = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'app'),
    },
    open: true,
    port: 8081,
    allowedHosts: 'all',
    // hotOnly: true,   // 即使html不生效，我也不让它刷新页面
  },
  optimization: {
    usedExports: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  target: 'web',
}

module.exports = merge(commonConfig, devConfig);

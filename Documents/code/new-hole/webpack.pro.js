const commonConfig = require('./webpack.common.js');
const {merge} = require('webpack-merge')
const path = require('path') // webpack内置模块

const proConfig = {
  mode: "production",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'app'),
    },
    open: true,
    port: 8080,
    // hotOnly: true,   // 即使html不生效，我也不让它刷新页面
  },
}

module.exports = merge(commonConfig, proConfig);

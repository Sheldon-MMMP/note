const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path') // webpack内置模块
const appRoot = process.cwd() // 命令行运行的根目录
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const resolveApp = (resolvePath) => {
  return path.resolve(appRoot, resolvePath) // 获取指定目录的完整绝对路径
}

module.exports = {
  entry: './src/main.js', // 默认是此目录，如若文件名称或者入口变更可修改
  output: {
    path: resolveApp('dist'),
    filename: './js/[name].[hash:6].js',
    chunkFilename: './js/[name].chunk.[hash:4].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json', '...'],
    alias: {
      '@': resolveApp('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: false, // css不使用esModule，直接输出
              importLoaders: 1 // 使用本loader前使用1个其他处理器
            }
          },
        ],
        sideEffects: true // 希望保留副作用。
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@import "@/assets/styles/global.scss";`,
              sassOptions: {
                includePaths: [__dirname]
              },
            },
          }
        ]
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        type: 'asset', // webpack5使用内置静态资源模块，且不指定具体，根据以下规则使用
        generator: {
          filename: 'img/[name].[hash:6][ext]' // ext本身会附带点，放入img目录下
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 超过10kb的进行复制，不超过则直接使用base64
          }
        }
      },
      {
        test: /\.(ttf|woff?|woff2?|eot|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name]_[hash:6][ext]' // 放入font目录下
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/, // 过滤掉node_modules目录，只使用而已
        use: {
          loader: 'babel-loader', options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        } // js、jsx使用bable-loader处理
      }
    ]
  },
  optimization: {
    chunkIds: 'deterministic', // 文件名称尽可能短，也会是序号类型
    splitChunks: {
      chunks: 'all',
      minSize: 200000, // 拆分的每个包不小于20kb
      maxSize: 9000000, // 体积大于设置的值的包要去拆分开包
      minChunks: 1, // 包如果要拆分，则必须要至少引用一次
      cacheGroups: {
        syVendors: {
          test: /[\\/]node_modules[\\/]/, // 对目录内文件进行单独打包拆分，且放入一个文件中 vender
          filename: 'js/[id]_verdor.js', // 最终名字
          priority: -10 // 都满足时候的优先级，越高月用
        }
      }
    }
  },
  performance: {
    hints: false, // 枚举
    maxAssetSize: 200000, // 整数类型（以字节为单位）
    maxEntrypointSize: 400000, // 整数类型（以字节为单位）
    assetFilter: function (assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  plugins: [
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin({ // css单独拆分为文件
      filename: 'css/[name].[hash:6].css'
    }),
    new VueLoaderPlugin(),
    new WindiCSSWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'public',
        to: 'public',
        globOptions: {
          ignore: ['**/index.html']
        }
      }]
    }),
  ]
}

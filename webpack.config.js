const path            = require('path');

var webpack           = require('webpack');
var Ex                = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置，dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的方法
var getHtmlConfig     = function(name){
  return {
    template: './src/view/'+name+'.html',
    filename: 'view/'+name+'.html',
    inject  : true,
    hash    : true,
    chunks  : ['commons',name]
  }
}
var config            = {
  entry: {
  	// 'common' : ['./src/page/common/index.js'],
  	'index' : ['./src/page/index/index.js'],
  	'login' : ['./src/page/login/index.js'],
  },
  output: {
    filename: 'js/[name].js',
    publicPath: '/dist',//没有这个，dev-server界面不会跟着一起发生变化
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader: ['style-loader','css-loader']
        // loader: Ex.extract('style-loader', 'css-loader')  // 单独打包出CSS，这里配置注意下
        use:Ex.extract({
          use: 'css-loader',
          fallback: 'style-loader'
          // publicPath: '../'
        })//不再需要style-loader
      },
      { 
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
        loader: 'url-loader?limit=100&name=/resource/[name].[ext]' 
      }
    ]
  },
  plugins: [
    // 把CSS单独打包到文件里
    new Ex('css/[name].css'),
    // html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login'))
    // 独立通用模块js/base.js,然而webpack4以上被弃用
    // new webpack.optimize.CommonsChunkPlugin({
    //   name : 'commons',
    //   filename : 'js/base.js'
    // })
  ],
  // 提取公共代码
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //     	commons: {
  //         // test: "common",
  //     	  name: "commons",
  //         chunks: "initial",
  //         minSize: 0
  //         // minChunks: 2
  //     	}
  //     }
  //   }
  // }
  // externals : {
  // 	'jquery' : 'window.jQuery'
  // }
};

module.exports = config;
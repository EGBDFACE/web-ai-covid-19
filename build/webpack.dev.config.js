const webpack = require('webpack');
// const path = require('path');
// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//     template:'!!ejs-loader!./template.html',
// //     filename:'dist/index.html'
// });
const merge = require('webpack-merge');
const commonConfig = require('./webpack.base.config.js');

// commonConfig.devServer = {
//     // contentBase: path.join(__dirname,'./dist'),
//     // publicPath:'/dist/', 
//     hot:true,
//     // inline:true,
//     historyApiFallback:true //解决二级路由下刷新页面显示异常问题
// }
// commonConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
// commonConfig.plugins.push(HtmlWebpackPluginConfig);
// config.plugins.push(new HtmlWebpackPlugin());
module.exports = merge(commonConfig,{
    //entry: './src/index.tsx',
    mode: 'development',
    devServer:{
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://ai-ct-covid.team/',
                pathRewrite: {'^api': ''},
                changeOrigin: true, // target 是域名时需要这个参数
                secure: false // 设置支持 https 协议的代理
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
})
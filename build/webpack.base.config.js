const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const px2rem = require('postcss-plugin-px2rem');

const px2remOpts = {
    rootValue: 76,
    minPixelValue: 1
};
module.exports = {
    entry: './src/index.tsx',
    output:{
        path : path.resolve(__dirname,'../dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        // library: 'my-library',
        // libraryTarget: 'umd'
        // publicPath: '/dist/'
    },
    devtool:'source-map',
    // devtool: 'cheap-module-eval-source-map', //dev
    // devtool:'cheap-module-source-map', //prod 
    resolve:{
        extensions:['.ts','.tsx','.js','.json'],
        alias: {
            '@': path.resolve(__dirname,'src/'),
            'src': path.resolve(__dirname,'src/'),
            // 'src': '../src',
            // 'LoadingMask': '../src/components/shared/Mask/LoadingMask',
        },
        plugins: [new TsconfigPathsPlugin()]
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                loader:'ts-loader',
                exclude:/node_modules/
            },
            {
                enforce:'pre',
                test:/\.js$/,
                loader:'source-map-loader'
            },
            {
                test: /\.(css|sass|scss)$/,
                // include:[path.join(__dirname,'./../','src')],
                // loader: 'style-loader!css-loader!sass-loader!postcss-loader'
                use: [
                    'style-loader',// 把css-loader输出的CSS交给style-loader处理，转换成通过脚本加载的JavaScript代码；
                    'css-loader',  // 把sass-loader输出的CSS交给css-loader处理，找出CSS中依赖的资源、压缩CSS等；
                    'sass-loader', // SCSS源代码会先交给sass-loader把SCSS转换成CSS；
                    'postcss-loader'
                    // {loader: 'style-loader'},
                    // {loader: 'css-loader'},
                    // {loader: 'sass-loader'},
                    // {loader: 'px2rem-loader',options: {
                    //     remUni: 76,
                    //     remPrecision: 8
                    // }}
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            // }
            },
            // {
            //     test:/\.svg$/,
            //     use: [{
            //         loader: '@svgr/webpack',
            //     }],
            // },
            {
                test:/\.(txt)$/,
                // test: /\.(json|txt)$/
                use:[{
                    loader: 'file-loader',
                    options: {}
                }]
            }
            ,
            {
                test: /\.json$/,
                use: [{
                    loader: 'file-loader'
                }],
                type: "javascript/auto"
            }
        ]
    },
    // postcss: [px2rem(px2remOpts)],
    // externals:{
    //     'react':'React',
    //     'react-dom':'ReactDom'
    // },
    plugins:[
        new HtmlWebpackPlugin({
            template: '!!ejs-loader!./build/index.html'
        }),
        // px2rem(px2remOpts),
    ],
    // node:{
    //     fs: "empty",
    //     child_process: "empty",
    //     net: "empty",
    //     // aws-sdk: "emtry",
    //     tls: "empty"
    // },
    // externals:{
    //     "node-hid": 'commonjs node-hid',
    //     "usb": 'commonjs usb'
    // }
}


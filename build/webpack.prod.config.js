const merge = require('webpack-merge');
const commonConfig = require('./webpack.base.config.js');

module.exports = merge (commonConfig, {
    mode: 'production',
    plugins: [
        // bug in window10
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // })
    ]
})
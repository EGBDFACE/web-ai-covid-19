module.exports = {
    plugins: {
        "postcss-plugin-px2rem" : {
            rootValue: 76,
            // rootValue: 140,
            unitPrecision: 5,
            propWhiteList: [],
            propBlackList: [],
            exclude:false,
            selectorBlackList: [],
            ignoreIdentifier: false,
            replace: true,
            mediaQuery: false,
            minPixelValue: 1
          }
    }
}
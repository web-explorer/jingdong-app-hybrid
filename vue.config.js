const webpack = require('webpack')

module.exports = {
/*    devServer: {
        proxy: 'http://127.0.0.1:9004'
    },*/
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({rootValue: 37.5}), // A plugin for PostCSS that generates rem units from pixel units. px to rem(rootValue字段用于设置换算的基数，默认值为100)
                ]
            }
        }
    },
    configureWebpack: {
        plugins: [
            /*
            * webpack Shimming
            * 模块只要使用到了变量 $、jQuery 就会在该模块的顶部自动引入jquery包（import $ from 'jquery'、import jQuery from 'jquery'）
            * */
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                _: 'lodash'
            })

        ]

    }
}

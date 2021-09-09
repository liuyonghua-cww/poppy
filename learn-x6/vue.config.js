const path = require('path');
const {getThemeColors, modifyVars} = require('./src/utils/themeUtil');
const ThemeColorReplacer = require('webpack-theme-color-replacer');
const {resolveCss} = require('./src/utils/theme-color-replacer-extend')

module.exports = {
    runtimeCompiler: true,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            // 方便使用全局less变量
            patterns: [path.resolve(__dirname, "./src/theme/theme.less")],
        }
    },
    configureWebpack: config => {
        config.plugins.push(
            new ThemeColorReplacer({
                fileName: 'css/theme-colors-[contenthash:8].css',
                matchColors: getThemeColors(),
                injectCss: true,
                resolveCss
            })
        )
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: modifyVars(),
                    javascriptEnabled: true
                }
            }
        }
    },
}

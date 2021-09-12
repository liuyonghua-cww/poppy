const path = require('path');
const {getThemeColors, modifyVars} = require('./src/utils/themeUtil');
const ThemeColorReplacer = require('webpack-theme-color-replacer');
const {resolveCss} = require('./src/utils/theme-color-replacer-extend')
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')

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
        );
        config.plugins.push(
            new MonacoEditorPlugin({
                // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
                // Include a subset of languages support
                // Some language extensions like typescript are so huge that may impact build performance
                // e.g. Build full languages support with webpack 4.0 takes over 80 seconds
                // Languages are loaded on demand at runtime
                languages: ['javascript', 'css', 'html', 'typescript']
            })
        );

        config.devtool = 'source-map'
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

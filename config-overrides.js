/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-27T15:49:08-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-10-27T22:40:37-06:00
 */
const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}],
        config,
    );

    config = rewireLess.withLoaderOptions({
        modifyVars: {
            "@primary-color": "#F8931D",
            //"@text-color": "fade(#FFF, 65%)",
            "@text-color-secondary": "#985818",
            //"@layout-sider-background": "@layout-header-background"}
            "@layout-body-background": "#f0f2f5",
            "@layout-sider-background": "@primary-color",
            "@layout-header-background": "#FFF",

            "@menu-bg": "@primary-color",
            "@menu-item-color": "fade(#FFF, 75%)",
            "@menu-highlight-color": "#FFF",
            "@menu-item-active-bg": "fade(#FFF, 15%)",

            "@menu-item-group-title-color": "#985818",
            "@btn-border-radius-base": "20px",
            //"@border-radius-base": "20px",
            "@input-border-radius-base": "20px"
        },
        javascriptEnabled: true,
    })(config, env);

    return config;
};

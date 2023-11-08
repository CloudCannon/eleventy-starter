const postcss = require('postcss')
const postcssrc = require('postcss-load-config')

module.exports = (config) => {
    (async () => {        
        const {plugins,options} = await postcssrc()        
        postcss(plugins)
    })();
}
const postcss = require('postcss')
const postcssrc = require('postcss-load-config')
//const chokidar = require('chokidar')

module.exports = (config) => {
    (async () => {        
        const {plugins,options} = await postcssrc()        
        console.log(postcss(plugins))
    })();
}
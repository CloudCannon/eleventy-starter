const BOOKSHOP_SRC_PATH = 'component-library'
const config = require("./cloudcannon-postcss-config.json")
config.inputDirs.push(BOOKSHOP_SRC_PATH)

/* postCSS plugins */
const postcss = require('postcss')
const postcss_import = require('postcss-import')
const postcss_nested = require('postcss-nested')
const postcss_media_variables = require('postcss-media-variables')
const postcss_custom_media = require('postcss-custom-media')
const postcss_css_variables = require('postcss-css-variables')
const postcss_mixins = require('postcss-mixins')
const postcss_preset_env = require('postcss-preset-env')

const fs = require('fs')
var path = require('path')

const chokidar = require('chokidar');

// need to create destination dir, e.g. _site/css before this script will work
if (!fs.existsSync(config.destDir))
    fs.mkdirSync(config.destDir);

// start by deleting the bundled bookshop css file - we don't want to continually be appending to an existing file
try{
    if (fs.existsSync(`${BOOKSHOP_SRC_PATH}/bookshop.css`)) 
        fs.unlinkSync(`${BOOKSHOP_SRC_PATH}/bookshop.css`)
}
catch(e){ console.log(e);}

const processFile = async path => {
    path = path.split("/")
    path.pop()
    path = path.join("/")  

    let src_file = path.indexOf(BOOKSHOP_SRC_PATH) != -1 ? `${BOOKSHOP_SRC_PATH}/bookshop.css` : `${path}/main.css`;
    let dest_file = path.indexOf(BOOKSHOP_SRC_PATH) != -1 ? `${config.destDir}/bookshop.css` : `${config.destDir}/main.css`;

    try{
        if (fs.existsSync(dest_file))
            fs.unlinkSync(dest_file)
    }
    catch(e) { console.log(e) }

    fs.openSync(dest_file, 'w');                        
                
 fs.readFile(src_file, async (err, css) => {     
        let temp_result = await postcss([postcss_import]).process(css, { from: src_file })  
        console.log(temp_result.css)
        let result = await postcss([
            postcss_nested,
            postcss_media_variables,
            postcss_custom_media,
            postcss_css_variables({ preserve: true }),
            postcss_media_variables,
            postcss_mixins,
            postcss_preset_env
        ]).process(temp_result.css, { from:undefined, to: dest_file })
        fs.appendFile(dest_file, result.css, () => true)
        if ( result.map )
            fs.appendFileSync(`${dest_file}.map`, result.map.toString(), () => true)          
    })
}

const appendBookshopImport = async filename => {
    fs.appendFileSync(`${BOOKSHOP_SRC_PATH}/bookshop.css`, `@import '${filename}';\n`, function (err) {
        if (err) throw err;
        console.log('Saved!', filename);
    });  
}

/* PRODUCTION */
const bookshop_files = [];
const bundleBookshop = dir => {    
    fs.readdirSync(dir).forEach(file => {
        const abs = path.join(dir, file);
        if(fs.statSync(abs).isDirectory())
            return bundleBookshop(abs)
        else
            if(file.endsWith(".css") && !file.startsWith("_") && file !== "bookshop.css")
                bookshop_files.push(abs)
    })
}

(async () => {
    bundleBookshop(BOOKSHOP_SRC_PATH)
    bookshop_files.forEach(file => {
        appendBookshopImport(file.replace(BOOKSHOP_SRC_PATH, ""))
    })
    await processFile(`${BOOKSHOP_SRC_PATH}/bookshop.css`)
    await processFile(`src/css/main.css`)
})()

//console.log(bookshop_files)

/* LOCAL DEVELOPMENT ONLY */
// watch for file changes in input dirs
//const inputDirs = config.inputDirs.map(x => `${x}/**/*.css`)
/*chokidar.watch(inputDirs).on('all', (event, path) => {
    switch(event)
    {
        case "add": 
        {    
            let filename = path.replace(BOOKSHOP_SRC_PATH, "")

            if(path.indexOf(BOOKSHOP_SRC_PATH) != -1)  
            {       
                let filename = path.replace(BOOKSHOP_SRC_PATH, "")   
                if(filename !== "/bookshop.css")      
                    bundleBookshop(filename)
            } 
            else
            {
                if(path.charAt(0) !== "_")
                    processFile(path)
            }
            break;
        }
        case "change":
        {
            processFile(path)
            break;
        }
    }
});*/
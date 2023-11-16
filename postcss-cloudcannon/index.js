const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar")

// plugin imports - these are required minimum
const postcss = require('postcss')
const postcss_import_sync = require('postcss-import-sync2')

// find all css or scss files in the input directories
const recurseFiles = (dir, css_files = []) => {        
    fs.readdirSync(dir).forEach(file => {
        const abs = path.join(dir, file);
        if(fs.statSync(abs).isDirectory())
            return recurseFiles(abs, css_files)
        else
            if((file.endsWith(".css") || file.endsWith(".scss")) && !file.startsWith("_"))
                css_files.push(abs)                    
    })
    return css_files;
}

// process the imports before doing anything else
const processImports = async (file, destination) => {    
    let contents = fs.readFileSync(file, 'utf8');    
    let temp_result = postcss().use(postcss_import_sync).process(contents, { from: file })    
    return fs.appendFileSync(destination, `${temp_result.css}\n`) 
}

const processCSS = (opts) => {
    // clear main.css first
    const destination = opts.destination
    try{
        if (fs.existsSync(destination))
            fs.unlinkSync(destination)   
                    
        if(!fs.existsSync(path.dirname(destination))){
            fs.mkdirSync(path.dirname(destination), { recursive: true })
            fs.writeFileSync(destination, "")
        }
    } catch(err) { console.log(err) }

    // get all files in the specified directories
    const paths = opts.path;
    const all_files = []
    paths.forEach(dir => { all_files.push(...recurseFiles(dir)) })   
    
    /* Process the imports FIRST */
    let promises = []
    for(const file of all_files)        
        promises.push(processImports(file, destination))                       

    const optional_plugins = opts.plugins;        
    Promise.all(promises).then(async () => {
        // process css according to optional user plugins
        if(optional_plugins && optional_plugins.length > 0)
        {
            fs.readFile(destination, 'utf8', (err, contents) => {
                postcss(optional_plugins).process(contents, { from: undefined }) 
                .then(result => {
                    fs.writeFile(destination, `${result.css}\n`, () => true)
                })
            });        
        }
    }) 
}

const plugin = (opts = {}) => {    
    processCSS(opts);

    if(opts.watch)
    {
        chokidar.watch(opts.path).on('all', (event,path) => {
            if(event === "change")
                processCSS(opts);
        })
    }

    return {
        postcssPlugin: 'postcss-cloudcannon'        
    }
}
plugin.postcss = true
    
module.exports = plugin
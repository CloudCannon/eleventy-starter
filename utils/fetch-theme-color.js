const fs = require('fs');

module.exports = () => {
    // read theme color from _data/site.json
    fs.readFile('src/_data/theme.json', 'utf8', (err, dataFile) => {
        
        if(err){
            console.log(err);
            return;
        }
        
        // parse file to JSON so that the variables can be accessed
        dataFile = JSON.parse(dataFile);

        const variableFileLocation = './src/css/_variables.css'
    
        fs.readFile(variableFileLocation, 'utf-8', (err, cssFile) => {

            if(err){
                console.log(err);
                return;
            }

            let replaced = cssFile;

            // Change the variables to whatever was set in the data file
        Object.entries(dataFile).forEach(([k,v]) => {
                k = k.split("_").reverse().join("-");
                const re = new RegExp(`--${k}: .*`, 'g')
                replaced = replaced.replace(re,`--${k}: ${v};`)
            })

            // Write result back to variables.css
            fs.writeFile(variableFileLocation, replaced, 'utf-8', err => {
                if(err)
                    console.log(err);
                
                console.log(`📚 Writing variables to ${variableFileLocation}`)
            });
        });

    })
}
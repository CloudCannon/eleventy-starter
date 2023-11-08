const fs = require('fs');
// read theme color from _data/site.json
fs.readFile('src/_data/theme.json', 'utf8', function(err, dataFile){
    
    if(err){
        console.log(err);
        return;
    }
    
    // parse file to JSON so that the variables can be accessed
    dataFile = JSON.parse(dataFile);

    const variableFileLocations = [
        './src/css/_variables.css',
        './component-library/shared/styles/_variables.css'
    ]
  
    fs.readFile(variableFileLocations[0], 'utf-8', function (err, cssFile) {

        if(err){
            console.log(err);
            return;
        }

        var replaced = cssFile;

        // Change the variables to whatever was set in the data file
       Object.entries(dataFile).forEach(([k,v]) => {
            k = k.split("_").reverse().join("-");
            const re = new RegExp(`--${k}: .*`, 'g')
            replaced = replaced.replace(re,`--${k}: ${v};`)
        })

        // Write result back to variables.scss in both locations
        for (let i = 0; i < variableFileLocations.length; i++) {
            const filePath = variableFileLocations[i];
            
            fs.writeFile(filePath, cssFile, 'utf-8', function (err) {
                if(err){
                    console.log(err);
                }
                console.log(`📚 Writing variables to ${filePath}`)
            });
        }
    });

});
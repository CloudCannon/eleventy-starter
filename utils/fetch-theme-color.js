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
        './src/sass/_variables.scss',
        './component-library/shared/styles/_variables.scss'
    ]
  
    fs.readFile(variableFileLocations[0], 'utf-8', function (err, scssFile) {

        if(err){
            console.log(err);
            return;
        }

        var replaced = scssFile;

        // Change the variables to whatever was set in the data file
        if (dataFile.primary_color) {
            const replacementString = dataFile.primary_color;
            replaced = replaced.replace(/\$color-primary: .*/g, ('$color-primary: ' + replacementString + ';'));
        } 
        if (dataFile.secondary_color) {
            const replacementString = dataFile.secondary_color;
            replaced = replaced.replace(/\$color-secondary: .*/g, ('$color-secondary: ' + replacementString + ';'));
        }         
        if (dataFile.gray_color) {
            const replacementString = dataFile.gray_color;
            replaced = replaced.replace(/\$color-gray: .*/g, ('$color-gray: ' + replacementString + ';'));
        } 
        if (dataFile.anchor_color) {
            const replacementString = dataFile.anchor_color;
            replaced = replaced.replace(/\$color-anchor: .*/g, ('$color-anchor: ' + replacementString + ';'));
        } 
        if (dataFile.header_color) {
            const replacementString = dataFile.header_color;
            replaced = replaced.replace(/\$color-header: .*/g, ('$color-header: ' + replacementString + ';'));
        } 
        if (dataFile.text_color) {
            const replacementString = dataFile.text_color;
            replaced = replaced.replace(/\$color-text: .*/g, ('$color-text: ' + replacementString + ';'));
        } 
        if (dataFile.light_text_color) {
            const replacementString = dataFile.light_text_color;
            replaced = replaced.replace(/\$color-text-light: .*/g, ('$color-text-light: ' + replacementString + ';'));
        } 
        if (dataFile.white_text_color) {
            const replacementString = dataFile.white_text_color;
            replaced = replaced.replace(/\$color-text-white: .*/g, ('$color-text-white: ' + replacementString + ';'));
        } 
        if (dataFile.deactive_color) {
            const replacementString = dataFile.deactive_color;
            replaced = replaced.replace(/\$color-deactive: .*/g, ('$color-deactive: ' + replacementString + ';'));
        }


        // Write result back to variables.scss in both locations
        for (let i = 0; i < variableFileLocations.length; i++) {
            const filePath = variableFileLocations[i];
            
            fs.writeFile(filePath, replaced, 'utf-8', function (err) {
                if(err){
                    console.log(err);
                }
                console.log(`📚 Writing variables to ${filePath}`)
            });
        }
    });

});
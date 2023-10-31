/** @type {import('postcss-load-config').Config} */

const config = {
    plugins: [
        require('postcss-import')({
            path: ['component-library', 'src/css'],
            plugins: [
                require('postcss-nested'),
                require('postcss-media-variables'),                
                require('postcss-custom-media'),
                require('postcss-css-variables')({
                    preserve: true
                }),
                require('postcss-media-variables') ,
                require('postcss-mixins'),
                require('postcss-preset-env')                                
            ]            
        }),    
            
    ]
  }
  
  module.exports = config
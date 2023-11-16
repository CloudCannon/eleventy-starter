/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: [        
        require('postcss-cloudcannon')({
            path: ['src/css', 'component-library'],
            destination: "_site/css/main.css",
            watch: true,
            plugins:[                
                require('postcss-nested'),
                require('@knagis/postcss-advanced-variables'),
                require('postcss-media-variables'),                
                require('postcss-custom-media'),
                require('postcss-css-variables')({
                    preserve: true
                }),
                require('postcss-media-variables') ,
                require('postcss-mixins'),
                require('postcss-preset-env')
            ]
        })    
    ]
  }
  
  module.exports = config
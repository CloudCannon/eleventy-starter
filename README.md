# Eleventy Bookshop Starter

A simple starter template for Eleventy, Bookshop & CloudCannon. This is designed to be a good starting point for a site built with Bookshop on CloudCannon, without having to spend too much time stripping out placeholder content.
This template aims to take out as much set up work as possible, to allow you to start building pages as quick as possible.
<!-- TODO: Live demo site -->

## Features
- Bookshop
- Scss
- Hot reloading
- Configurable color theme variables
- Blog with pagination & tags
- Configurable navigation and footer
- Optimised for editing in CloudCannon
- SEO friendly

## Getting Started
1. On GitHub select `Use this template`
2. Clone the repository
3. At the root of the project, run `npm i`, to install the node modules.
4. Run `npm start`. Eleventy will generate and serve your site from a folder called `_site`.

## Editing
<!-- TODO: Add 'build on cloudcannon' button -->
This template has enough in it to start experiencing how editing works inside CloudCannon. Check out how editing looks inside of CloudCannon, or just get to building!

## Creating new components
At the root of the project, run `npm run new my-new-component`. This will create a new component with the appropriate files in `component-library/components`.

## Theme colors & Sass Variables
- Theme colors can be set in *Data* / *Theme*
- The main colors are set and variants of them are computed
- The colors will update on the next build
- Other variables such as media break points can be configured in `src/sass/_variables.scss`

Both your Bookshop components and the rest of the site require their own variables file. These variables files contain color themes, which is set in *Data* / *Theme*, but also contain other Scss variables. Running `utils/fetch-theme-color.js`, which runs as part of our prebuild, or when we spin up our local server, will update our variables in `src/sass/_variables.scss`, and then copies the whole `src/sass/_variables.scss` file to `component-library/shared/styles/_variables.scss`. This should ensure the two different _variables.scss files stay in sync with the data file and each other.

## Nav/footer details
- Reused around the site to save multiple editing locations.
- Set in the *Data* section with respective names

## SEO details and favicon
- Favicon and site SEO details are set in the Data / Site section
- SEO details can also be set in pages for page specific details.

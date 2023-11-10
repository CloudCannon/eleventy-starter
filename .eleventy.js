const pluginBookshop = require("@bookshop/eleventy-bookshop");
const { DateTime } = require("luxon");
const { Tokenizer, assert } = require('liquidjs');

// Image optimization
const path = require("node:path")
const Image = require("@11ty/eleventy-img")

// Prebuild scripts
const fetch_theme_colors = require('./utils/fetch-theme-color')

// Navigation
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

// CloudCannon postCSS processing automatically on build
const postcss_cloudcannon = require("./11typlugin");
const embedEverything = require("eleventy-plugin-embed-everything");

module.exports = function (eleventyConfig) {
  // Hot reloading for local dev
  eleventyConfig.setServerOptions({
    liveReload: true,
    domDiff: true,
    port: 8080,
    watch: ["_site/**/*.css"],
  });

  // Run prebuilds
  eleventyConfig.on('eleventy.before', async () => {
    fetch_theme_colors();
  });
  
  eleventyConfig.addLiquidTag('assign_local', function(liquidEngine) {
    return {
      parse: function (token) {
        const tokenizer = new Tokenizer(token.args, this.liquid.options.operatorsTrie);
        this.key = tokenizer.readIdentifier().content;
        tokenizer.skipBlank();
        assert(tokenizer.peek() === '=', () => `illegal token ${token.getText()}`);
        tokenizer.advance();
        this.value = tokenizer.remaining();
      },
      render: function(ctx) {
        ctx.scopes[ctx.scopes.length-1][this.key] = this.liquid.evalValueSync(this.value, ctx);
      }
    }
  });

  // Image optimization
  const IMAGE_OPTIONS = {
    widths: [400, 800, 1600],
    formats: ["avif", "webp", "svg", "jpeg"],
    outputDir: "./_site/optimized",
    urlPath: "/optimized/"
  }
  
  eleventyConfig.addShortcode("image", async (srcFilePath, alt, sizes, preferSvg) => {
    let inputFilePath = path.join(eleventyConfig.dir.input, srcFilePath)
    let metadata = await Image(inputFilePath, Object.assign({
      svgShortCircuit: preferSvg ? "size" : false
    }, IMAGE_OPTIONS));

    return Image.generateHTML(metadata, {
      alt,
      sizes,
      loading: "eager",
      decoding: "async"
    });
  });

  // Display the current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  // Find the length of an array
  eleventyConfig.addFilter("length", input => input.length);
  
  // Using Luxon for date formatting
  eleventyConfig.addFilter("postDate", dateObj => DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED));
  
  // What gets passed through to the built site
  eleventyConfig.ignores.add("src/schemas");
  eleventyConfig.addPassthroughCopy("src/images");
  
  // PLugins 
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Bookshop integration
  eleventyConfig.addPlugin(pluginBookshop({
    bookshopLocations: ["component-library"],  
    pathPrefix: '', 
  }));
  
  // Process CSS/SASS
  eleventyConfig.addPlugin(postcss_cloudcannon);

  eleventyConfig.addPlugin(embedEverything);

  return {
    dir: {
      input: "src",
      pages: "pages",
    },
  };
};
const pluginBookshop = require("@bookshop/eleventy-bookshop");
const { DateTime } = require("luxon");
const { Tokenizer, assert } = require('liquidjs');
const postcss_cloudcannon = require("./11typlugin");
const embedEverything = require("eleventy-plugin-embed-everything");

module.exports = function (eleventyConfig) {
  // Hot reloading for local dev
  eleventyConfig.setServerOptions({
    // Default values are shown:
    liveReload: true,
    domDiff: true,
    port: 8080,

    // Additional files to watch that will trigger server updates
    // Accepts an Array of file paths or globs (passed to `chokidar.watch`).
    // Works great with a separate bundler writing files to your output folder.
    // e.g. `watch: ["_site/**/*.css"]`
    watch: ["_site/**/*.css"],
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
  
  
  // Display the current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  // Find the length of an array
  eleventyConfig.addFilter("length", input => input.length);
  
  // Using Luxon for date formatting
  eleventyConfig.addFilter("postDate", dateObj => DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED));
  
  // What gets passed through to the built site
  eleventyConfig.ignores.add("src/schemas");
  eleventyConfig.addPassthroughCopy("src/images");
  
  // Bookshop integration
  eleventyConfig.addPlugin(pluginBookshop({
    bookshopLocations: ["component-library"],  
    pathPrefix: '', 
  }));
  
  eleventyConfig.addPlugin(postcss_cloudcannon);

  eleventyConfig.addPlugin(embedEverything);

  return {
    dir: {
      input: "src",
      pages: "pages",
    },
  };
};
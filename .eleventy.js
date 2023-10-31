const pluginBookshop = require("@bookshop/eleventy-bookshop");
const { DateTime } = require("luxon");
const { Tokenizer, assert } = require('liquidjs');

module.exports = function (eleventyConfig) {
  // Hot reloading for local dev
  eleventyConfig.setServerOptions({
    module: "@11ty/eleventy-server-browsersync",

    // Default Browsersync options shown:
    port: 8080,
    open: false,
    notify: false,
    ui: false,
    ghostMode: false,
    injectChanges: false,
    files: "_site/css/*.css",

    // Opt-out of the Browsersync snippet
    // snippet: false,
  })

  //eleventyConfig.ignores.add('component-library/**/*');

 /* eleventyConfig.addWatchTarget("./_site/css/*.css");
  eleventyConfig.setUseGitIgnore(false);*/

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

  return {
    dir: {
      input: "src",
      pages: "pages",
    },
  };
};
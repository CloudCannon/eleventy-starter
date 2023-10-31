const pluginBookshop = require("@bookshop/eleventy-bookshop");
const { DateTime } = require("luxon");

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
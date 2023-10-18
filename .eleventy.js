const pluginBookshop = require("@bookshop/eleventy-bookshop");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Hot reloading for local dev
  eleventyConfig.setBrowserSyncConfig({
		files: './_site/**/*.*'
	});

  // Display the current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Find the length of an array
  eleventyConfig.addFilter("length", (input) => {
    return input.length;
  });

  // Using Luxon for date formatting
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

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
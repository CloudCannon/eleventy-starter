const pluginBookshop = require("@bookshop/eleventy-bookshop");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("component-library/");

  eleventyConfig.addPlugin(pluginBookshop({
    bookshopLocations: ["component-library"],
    pathPrefix: ''
  }));

  return {
    dir: {
        input: "src",
        output: "_site"
    }
}
};

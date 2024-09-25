const pluginBookshop = require("@bookshop/eleventy-bookshop");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css")
  eleventyConfig.addPassthroughCopy("src/assets/images")
  eleventyConfig.addPassthroughCopy("node_modules/@fortawesome/fontawesome-free/css/all.min.css")
  eleventyConfig.addPassthroughCopy("node_modules/@fortawesome/fontawesome-free/webfonts")

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

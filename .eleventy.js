const pluginBookshop = require("@bookshop/eleventy-bookshop");

const MarkdownIt = require("markdown-it"),
  md = new MarkdownIt({
    html: true,
  });

/* 11ty config imports */
const image_shortcode = require('./_11ty_config/image_shortcode')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets/styles/main.css")
  eleventyConfig.addPassthroughCopy("src/assets/images")
  eleventyConfig.addPassthroughCopy("node_modules/@fortawesome/fontawesome-free/css/all.min.css")
  eleventyConfig.addPassthroughCopy("node_modules/@fortawesome/fontawesome-free/webfonts")

  eleventyConfig.addWatchTarget('tailwind.config.js');
	eleventyConfig.addWatchTarget('src/assets/styles/tailwind.css');
  eleventyConfig.addWatchTarget('src/assets/styles/compiled-tailwind.css');
  eleventyConfig.addWatchTarget("component-library/");

  eleventyConfig.addPlugin(pluginBookshop({
    bookshopLocations: ["component-library"],
    pathPrefix: ''
  }));

  // Custom Shortcodes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("image", image_shortcode);

  // Custom Filters
  eleventyConfig.addFilter("markdownify", (markdown) => md.render(markdown));

  return {
    dir: {
        input: "src",
        output: "_site"
    }
}
};

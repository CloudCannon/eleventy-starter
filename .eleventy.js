const pluginEditableRegions = require("@cloudcannon/editable-regions/eleventy");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const MarkdownIt = require("markdown-it");

/* 11ty config imports */
const image_shortcode = require("./_11ty_config/image_shortcode");

const md = new MarkdownIt({ html: true });

// biome-ignore lint/complexity/useArrowFunction: <explanation>
module.exports = async function (eleventyConfig) {
  const { RenderPlugin } = await import("@11ty/eleventy");

  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/videos");
  eleventyConfig.addPassthroughCopy("src/assets/documents");
  eleventyConfig.addPassthroughCopy(
    "node_modules/@fortawesome/fontawesome-free/css/all.min.css"
  );
  eleventyConfig.addPassthroughCopy(
    "node_modules/@fortawesome/fontawesome-free/webfonts"
  );
  eleventyConfig.addPassthroughCopy(
    "node_modules/@11ty/eleventy"
  );

  eleventyConfig.addWatchTarget("src/assets/styles/**/*.{css,scss}");
  eleventyConfig.addWatchTarget("src/_includes/components/");

  // CloudCannon editable regions: emits _site/register-components.js and
  // registers the `includeWith` tag. `@11ty/eleventy-img` (pulled in by the
  // image shortcode below) is Node/sharp-only, so stub it out of the browser
  // live-editing bundle — the optimizer path is guarded by `ENV_CLIENT`.
  eleventyConfig.addPlugin(pluginEditableRegions, {
    liquid: { browserStub: ["@11ty/eleventy-img"] },
  });

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(RenderPlugin);

  // Markdown rendering for component fields. NB: not named `renderContent` —
  // that name is a reserved built-in shim in the editable-regions Liquid
  // runtime, and a same-named custom filter is skipped by the auto-mirror.
  eleventyConfig.addLiquidFilter("renderMarkdown", (value) =>
    value ? md.render(value) : ""
  );

  // Custom Shortcodes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("image", image_shortcode);
  eleventyConfig.addPairedLiquidShortcode(
    "tint",
    function (content, tint_color) {
      return `<span style="color: ${tint_color}">${content}</span>`;
    }
  );

  // Snippet shortcodes (migrated off Bookshop snippet components)
  eleventyConfig.addLiquidShortcode(
    "alert",
    function (background_color, alert_message, color, icon) {
      const iconHtml = icon
        ? `<span class="icon"><i class="${icon}"></i></span>`
        : "";
      // NB: plain classes, styled in _components.scss. Tailwind only scans the
      // template globs in tailwind.css, so utilities written here as strings
      // would never be generated.
      return `<div class="s-alert" style="background-color: ${background_color}; color: ${color};">
  <p class="s-alert__message">${iconHtml}${alert_message}</p>
</div>`;
    }
  );
  eleventyConfig.addLiquidShortcode("video", function (src) {
    return `<video class="s-video" controls>
  <source src="${src}" type="video/mp4" />
  Your browser does not support the video tag.
</video>`;
  });
  eleventyConfig.addLiquidShortcode(
    "file",
    function (src, file_name, link_message) {
      return `<a href="${src}" download="${file_name}">${link_message}</a>`;
    }
  );

  // Custom Collection
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/blog/**/*.md");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};

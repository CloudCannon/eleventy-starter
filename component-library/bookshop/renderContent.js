const { RenderPlugin } = import("@11ty/eleventy");

export default function (Liquid) {
  this.registerFilter("renderContent", (content) => {
		return RenderPlugin(content);
	});
}
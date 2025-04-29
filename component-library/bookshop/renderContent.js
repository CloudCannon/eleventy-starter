
export default function (Liquid) {
  this.registerFilter("renderContent", async (content) => {
    const { RenderPlugin } = await import("@11ty/eleventy");

		return RenderPlugin(content);
	});
}
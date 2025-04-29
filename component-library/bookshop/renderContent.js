
export default function () {
  this.registerFilter("renderContent", async () => {
    const { RenderPlugin } = await import("@11ty/eleventy");

		return RenderPlugin;
	});
}
export default async function (Liquid) {
	const { RenderPlugin } = await import("@11ty/eleventy");
  this.registerFilter("renderContent", () => {
		return RenderPlugin.String;
	});
}
export default function (Liquid) {
  this.registerFilter("renderContent", (content) => {
		return content;
	});
}
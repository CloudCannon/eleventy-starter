import MarkdownIt from "markdown-it";
const md = new MarkdownIt({ html: true });

const alert = (
  <div
    class="flex items-center gap-4 px-4 py-2 rounded-lg shadow-md my-4"
    style="background-color: {{background_color}}; color: {{color}};">
    <p class="!mb-0">{{ alert_message }}</p>
  </div>
);

export default function () {
  this.registerFilter("renderContent", (value) => {
    const tpl = this.parse(`
			<div class="flex items-center gap-4 px-4 py-2 rounded-lg shadow-md my-4" style="background-color: {{background_color}}; color: {{color}};">
				<p class="!mb-0">{{alert_message}}</p>
			</div>
		`);

    const renderedShortcode = this.renderSync(tpl, {
      alert_message: "Test yo",
      background_color: "#ff0000",
      color: "#00ffff",
    });
    return renderedShortcode;
  });
}

// /**
//  * Liquidjs implementation of https://github.com/bglw/jekyll-local-assign
//  * Assigns variables that don't live on the global scope
//  */
// export default function () {
// 	this.registerTag("assign_local", {
// 		parse: function (token) {
// 			const tokenizer = new Tokenizer(token.args, this.liquid.options.operatorsTrie);
// 			this.key = tokenizer.readIdentifier().content;
// 			tokenizer.skipBlank();
// 			assert(tokenizer.peek() === "=", () => `illegal token ${token.getText()}`);
// 			tokenizer.advance();
// 			this.value = tokenizer.remaining();
// 		},
// 		render: function (ctx) {
// 			ctx.scopes[ctx.scopes.length - 1][this.key] = this.liquid.evalValueSync(this.value, ctx);
// 		},
// 	});
// }

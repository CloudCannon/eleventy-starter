import MarkdownIt from "markdown-it";
const md = new MarkdownIt({ html: true });

export default function () {
  this.registerFilter("renderContent", (value) => {
    const alertShortcodeRegex =
      /{% bookshop 'snippets\/alert' background_color: "(#FF785A)" alert_message: "(Test test test)" color: ("#FEF9EF)" %}/gi;

    const alertShortcodeRendered = `
			<div class="flex items-center gap-4 px-4 py-2 rounded-lg shadow-md my-4" style="background-color: ${alertShortcodeRegex[1]}; color: ${alertShortcodeRegex[3]};">
				<p class="!mb-0">${alertShortcodeRegex[2]}</p>
			</div>
		`;

    const valueWithRenderedShortcode = value.replaceAll(
      alertShortcodeRegex,
      alertShortcodeRendered
    );

    const renderedMarkdownAndShortcode = md.render(valueWithRenderedShortcode);

    return renderedMarkdownAndShortcode;
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

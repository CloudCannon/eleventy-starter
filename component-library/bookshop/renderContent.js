import MarkdownIt from "markdown-it";
const md = new MarkdownIt({html: true})

export default function () {
	this.registerFilter("renderContent", (value) => {
		console.log('this: ', this)
		console.log('this.liquid.evalValue: ', this.liquid.evalValue)
		return md.render(value)
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
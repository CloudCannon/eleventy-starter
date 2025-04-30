import { Tokenizer, assert } from "liquidjs";

export default function (Liquid) {
	const tokenizer = new Tokenizer(token.args, this.liquid.options.operatorsTrie);
	console.log(tokenizer.readIdentifier().content);
	console.log(this.liquid)
	console.log(this.context)
	this.registerFilter("renderContent", (value) => {
		console.log('Here in renderContent')
		console.log(this)
		console.log(this.context)
		console.log(this.context.get)
		console.log(value)
		return 'A Rubbish value'
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
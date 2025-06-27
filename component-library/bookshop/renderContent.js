import MarkdownIt from "markdown-it";
const md = new MarkdownIt({ html: true });

export default function () {
  this.registerFilter("renderContent", (value) => md.render(value));
}

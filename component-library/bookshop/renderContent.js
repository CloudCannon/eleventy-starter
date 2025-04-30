import MarkdownIt from "markdown-it";
const md = new MarkdownIt({ html: true });

export default function (Liquid) {
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

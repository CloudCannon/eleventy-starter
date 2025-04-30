import MarkdownIt from "markdown-it";
const md = new MarkdownIt({ html: true });

export default function (Liquid) {
  this.registerFilter("renderContent", (value) => {
    const alertShortcodeRegex =
      /{% bookshop 'snippets\/alert' background_color: "(.*?)" alert_message: "(.*?)" color: "(.*?)" %}/gim;

    const alertShortcodeRendered =
      '<div class="flex items-center gap-4 px-4 py-2 rounded-lg shadow-md my-4" style="background-color: $1; color: $3;"><p class="!mb-0"> $2 </p></div>';

    const valueWithRenderedShortcode = value.replaceAll(
      alertShortcodeRegex,
      alertShortcodeRendered
    );

    const renderedMarkdownWithShortcode = md.render(valueWithRenderedShortcode);
    return renderedMarkdownWithShortcode;
  });
}

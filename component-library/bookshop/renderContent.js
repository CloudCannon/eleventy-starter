import MarkdownIt from "markdown-it";
const md = new MarkdownIt({ html: true });

export default function (Liquid) {
  this.registerFilter("renderContent", (value) => {
    const fileShortcodeRegex =
      /{% bookshop 'snippets\/file' src: "(.*?)" file_name: "(.*?)" link_message: "(.*?)" %}/gim;
    const fileShortcodeRendered = '<a href="$1" download="$2">$3</a>';

    const valueWithRenderedFileShortcode = value.replaceAll(
      fileShortcodeRegex,
      fileShortcodeRendered
    );

    const alertShortcodeRegex =
      /{% bookshop 'snippets\/alert' background_color: "(.*?)" alert_message: "(.*?)" color: "(.*?)" %}/gim;

    const alertShortcodeRendered =
      '<div class="flex items-center gap-4 px-4 py-2 rounded-lg shadow-md my-4" style="background-color: $1; color: $3;"><p class="!mb-0"> $2 </p></div>';

    const valueWithRenderedAlertShortcode =
      valueWithRenderedFileShortcode.replaceAll(
        alertShortcodeRegex,
        alertShortcodeRendered
      );

    const renderedMarkdownWithShortcode = md.render(
      valueWithRenderedAlertShortcode
    );
    return renderedMarkdownWithShortcode;
  });
}

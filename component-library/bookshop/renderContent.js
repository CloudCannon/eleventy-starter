import MarkdownIt from "markdown-it";
const md = new MarkdownIt({ html: true });

export default function (Liquid) {
  this.registerFilter("renderContent", (value) => {
    const renderedMarkdownSansShortcode = md.render(value);

    const alertShortcodeRegex =
      /{% bookshop 'snippets\/alert' background_color: (.*?) alert_message: (.*?) color: (.*?) %}/gi;

    console.log(alertShortcodeRegex);

    const alertShortcodeRendered = `
<div class="flex items-center gap-4 px-4 py-2 rounded-lg shadow-md my-4" style="background-color: ${alertShortcodeRegex[$1]}; color: ${alertShortcodeRegex[3]};">
  <p class="!mb-0">${alertShortcodeRegex[2]}</p>
</div>
`;

    const testReplacement = "<h1>A snippet should go here</h1>";

    const valueWithRenderedShortcode = renderedMarkdownSansShortcode.replaceAll(
      alertShortcodeRegex,
      testReplacement
    );

    return valueWithRenderedShortcode;
  });
}

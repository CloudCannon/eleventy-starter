import MarkdownIt from "markdown-it";
const md = new MarkdownIt({ html: true });

const snippetData = {
  file: {
    regex:
      /{% bookshop 'snippets\/file' src: "(.*?)" file_name: "(.*?)" link_message: "(.*?)" %}/gim,
    rendered: '<a href="$1" download="$2">$3</a>',
  },
  alert: {
    regex:
      /{% bookshop 'snippets\/alert' background_color: "(.*?)" alert_message: "(.*?)" color: "(.*?)" %}/gim,
    rendered:
      '<div class="flex items-center gap-4 px-4 py-2 rounded-lg shadow-md my-4" style="background-color: $1; color: $3;"><p class="!mb-0"> $2 </p></div>',
  },
};

// const fileShortcodeRegex =
//   /{% bookshop 'snippets\/file' src: "(.*?)" file_name: "(.*?)" link_message: "(.*?)" %}/gim;
// const fileShortcodeRendered = '<a href="$1" download="$2">$3</a>';

// const alertShortcodeRegex =
//   /{% bookshop 'snippets\/alert' background_color: "(.*?)" alert_message: "(.*?)" color: "(.*?)" %}/gim;
// const alertShortcodeRendered =
//   '<div class="flex items-center gap-4 px-4 py-2 rounded-lg shadow-md my-4" style="background-color: $1; color: $3;"><p class="!mb-0"> $2 </p></div>';

const allSnippets = Object.keys(snippetData);

export default function (Liquid) {
  this.registerFilter("renderContent", (value) => {
    let markdownToWrite = value;

    allSnippets.map((snippet) => {
      const snippetInfo = snippetData[snippet];

      markdownToWrite = markdownToWrite.replaceAll(
        snippetInfo.regex,
        snippetInfo.rendered
      );
    });

    // const valueWithRenderedFileShortcode = value.replaceAll(
    //   fileShortcodeRegex,
    //   fileShortcodeRendered
    // );

    // const valueWithRenderedAlertShortcode =
    //   valueWithRenderedFileShortcode.replaceAll(
    //     alertShortcodeRegex,
    //     alertShortcodeRendered
    //   );

    const renderedMarkdownWithShortcodes = md.render(markdownToWrite);
    return renderedMarkdownWithShortcodes;
  });
}

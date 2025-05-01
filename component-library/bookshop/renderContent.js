import MarkdownIt from "markdown-it";
const md = new MarkdownIt({ html: true });

const allComponents = {
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
  video: {
    regex: /{% bookshop 'snippets\/video' src: "(.*?)" %}/gim,
    rendered:
      '<video class="py-6" controls><source src=$1 type="video/mp4" /> Your browser does not support the video tag.</video>',
  },
  icon: {
    regex: /{% bookshop 'icon' icon: "(.*?)" %}/gim,
    rendered: '<i class="fas fa-$1"></i>',
  },
};
const allComponentKeys = Object.keys(allComponents);

export default function (Liquid) {
  this.registerFilter("renderContent", (value) => {
    let markdownToWrite = value;

    allComponentKeys.map((component) => {
      const componentData = allComponents[component];

      const matches = [...markdownToWrite.matchAll(componentData.regex)];
      // [...str.matchAll(regexp)];
      console.log("\n\nComponent key: ", component);
      console.log({ matches });

      matches.map((matchArgs) => {
        matchArgs.map((arg, index) => {
          console.log("Arg: ", arg, " at index: ", index);
        });
      });

      markdownToWrite = markdownToWrite.replaceAll(
        componentData.regex,
        componentData.rendered
      );
    });

    const renderedMarkdownWithShortcodes = md.render(markdownToWrite);
    return renderedMarkdownWithShortcodes;
  });
}

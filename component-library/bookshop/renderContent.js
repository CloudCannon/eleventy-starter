import MarkdownIt from "markdown-it";
const md = new MarkdownIt({ html: true });

export default function (Liquid) {
  this.registerFilter("renderContent", (value) => {
    const fileShortcodeRegex =
      /{% bookshop 'snippets\/file' src: "(?<filesrc>.*?)" file_name: "(?<filefile_name>.*?)" link_message: "(?<filelink_message>.*?)" %}/gim;
    const { filesrc, filefile_name, filelink_message } =
      fileShortcodeRegex.exec(value).groups;

    const fileShortcodeRendered = `<a href="${filesrc}" download="${filefile_name}">${filelink_message}</a>`;

    const valueWithRenderedFileShortcode = value.replaceAll(
      fileShortcodeRegex,
      fileShortcodeRendered
    );

    const alertShortcodeRegex =
      /{% bookshop 'snippets\/alert' background_color: "(?<alertbackground_color>.*?)" alert_message: "(?<alertalert_message>.*?)" color: "(?<alert_color>.*?)" %}/gim;

    const alertShortcodeRendered =
      '<div class="flex items-center gap-4 px-4 py-2 rounded-lg shadow-md my-4" style="background-color: $alertbackground_color; color: $alert_color;"><p class="!mb-0"> $alertalert_message </p></div>';

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

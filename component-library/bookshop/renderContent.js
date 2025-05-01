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
    rendered:
      $1 === CloudCannon
        ? '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.000000 59.000000"> <g transform="translate(0.000000,59.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none"> <path   d="M183 575 c-34 -14 -63 -59 -63 -97 0 -16 -12 -30 -39 -45 -107 -61       -101 -221 10 -279 22 -11 29 -21 29 -45 0 -22 10 -41 34 -65 28 -28 41 -34 78       -34 24 0 53 6 63 14 16 12 23 12 39 0 25 -17 56 -1 56 29 -1 16 -15 30 -53 52       -74 43 -112 108 -112 189 0 84 32 139 108 189 42 29 57 44 57 62 0 28 -34 43       -55 25 -12 -10 -22 -9 -49 4 -41 19 -61 20 -103 1z" /> <path   d="M582 575 c-25 -11 -38 -12 -57 -3 -19 8 -28 8 -40 -2 -25 -21 -18       -49 18 -68 51 -27 111 -94 125 -139 34 -115 -10 -212 -127 -275 -34 -19 -41       -48 -16 -68 12 -10 21 -10 40 -2 19 9 31 8 52 -3 35 -19 55 -19 98 -1 36 15       65 59 65 98 0 16 11 29 37 43 47 25 83 86 83 140 0 54 -36 115 -83 140 -26 14       -37 27 -37 43 0 39 -29 83 -65 98 -42 17 -51 17 -93 -1z" /> <path d="M368 404 c-80 -43 -76 -179 6 -218 73 -35 149 -4 175 71 13 35 13 46 0 79 -27 72 -114 105 -181 68z" /></g></svg>'
        : $1 === "GitHub" ||
          $1 === "Facebook" ||
          $1 === "Instagram" ||
          $1 === "Youtube" ||
          $1 === "Google" ||
          $1 === "Stripe" ||
          icon === "Shopify"
        ? '<i class="fab fa-$1"></i>'
        : '<i class="fas fa-$1"></i>',
  },
};
const allComponentKeys = Object.keys(allComponents);

export default function (Liquid) {
  this.registerFilter("renderContent", (value) => {
    let markdownToWrite = value;

    allComponentKeys.map((component) => {
      const componentData = allComponents[component];

      markdownToWrite = markdownToWrite.replaceAll(
        componentData.regex,
        componentData.rendered
      );
    });

    const renderedMarkdownWithShortcodes = md.render(markdownToWrite);
    return renderedMarkdownWithShortcodes;
  });
}

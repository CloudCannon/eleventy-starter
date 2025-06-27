# Eleventy CloudCannon Starter

A starting point for developers looking to build a website with Eleventy, using Bookshop components in CloudCannon.

Create your own copy, and start creating your own components to use in the CloudCannon CMS.

To try to cut down on setup time this starter template includes some commonly used [features](#features) in CloudCannon.

This template is aimed at helping developers build sites quickly, rather than providing editors with a fully built editable site.
If you are an editor looking for an already built template, have a look at [CloudCannon's templates page](https://cloudcannon.com/templates/).

[See a demo version of this site](https://liked-sea.cloudvent.net/).

## Getting Started

To start using this template, go to the [GitHub repository](https://github.com/CloudCannon/eleventy-starter/), and click `Use this template` to make your own copy.

### Local Development

1. Clone the repository
2. At the root of the project, run `npm install`, to install the node modules.
3. Run `npm start`. Eleventy will generate and serve your site from a folder called `_site`.

## Features
- [Bookshop](#bookshop)
- [Styling](#styling)
- [Blog with pagination & tags](#blog-with-pagination--tags)
- [Data files](#data-files)
- [Image Optimization](#image-optimization)
- [Optimised for editing in CloudCannon](#optimised-for-editing-in-cloudcannon)
- [SEO controls](#seo-controls)
- [Font Awesome Icons](#font-awesome-icons)

### Bookshop

[Bookshop](https://cloudcannon.com/documentation/guides/bookshop-eleventy-guide/) is a component development workflow for static websites.

Build custom components that non-technical editors can use in a page building experience in CloudCannon.

Bookshop is already set up on this project, so that you can start building components straight away.

To create a new component, at the root of the project run `npm run bookshop:new my-new-component-name`. This will create a new component folder in `component-library/components` with three files:

- A .bookshop.yml file where you define your components configuration for within CloudCannon.

- A .eleventy.liquid file where the HTML and liquid templating for the component are.

- A .scss file where you can add your styles if you aren't using tailwind within the .eleventy.liquid file.

### Styling

TailwindCSS or SCSS/CSS are both configured to be usable within this project.

#### Tailwind CSS

Use [Tailwind](https://tailwindcss.com/) to add utility classes to your HTML, allowing you to style your components without leaving your HTML.
This can be used in combination with normal CSS and SCSS styling, leaving you to add styles to your site however you want.

To remove Tailwind CSS from the project:

1. Remove the following packages from your `package.json`:

```json
"dependencies": {
  "tailwindcss": "^x.x.xx"
}
```

3. Delete your `tailwind.config.mjs` file.

4. Remove the `/src/assets/styles.tailwind.css` file.

4. Remove calls to `npm run tailwind:build` and `npm run tailwind:watch`.

5. Remove existing utility classes and replace them with SCSS/CSS.

#### Hot reloading

Any changes to styling within the project will cause your local server to reload and reflect the changes.

#### Markdown styles

The markdown toolbar has all the options supported in the rich text editor, along with stylings to make them work.
See the CloudCannon [Docs](https://cloudcannon.com/documentation/articles/configure-your-rich-text-editors/) for more information.

#### Variables

Variables can be updated/added within `/src/assets/styles/_variables.scss`

### Blog with pagination & tags

A blog section with tags and pagination is included.

Documentation, blog and other text heavy sections should replicate how the blog section is implemented in this template.

The blog pages in this template allow for snippets and have some preconfigured options. Snippets allow you to use HTML components throughout your markdown text.

A common layout, with changing markdown content is favored for these kinds of text heavy pages, rather than using Bookshop components - which are defined and managed in your markdown pages frontmatter.

These text heavy pages will be edited in CloudCannon's content editor, rather than the visual editor used for building pages with Bookshop components.

#### Drafts

Drafts (content that exsits but is unpublished and not included within collections) are supported within the site. If you want to have drafts enabled, on your main site within CloudCannon you will need to set the variable `ELEVENTY_ENV=production` and remove 

```
drafts: 
  hidden: true 
```

in the cloudcannon.config.yml file.

### Data files

Demonstrates using data files to:

- Populate select inputs in CloudCannon. This is powerful for allowing editors to make styling changes to the page, within a set design system populated by an editable data file. This is done with the icons and colors data files.
- Set sitewide values such as the overall site SEO settings.
- Control header and footer data to allow editors control over navigation.

### Image Optimization

[11ty Image](https://www.11ty.dev/docs/plugins/image/) is used in the two placeholder components in this template, it has been created as a subcomponent in `/component-library/components/image`.
The image component will process an image in your src/assets/images folder, and output an optimized image, like below:

```html
<picture>
    <source type="image/avif" srcset="/optimized/0L8bYGwHxv-640.avif 640w, /optimized/0L8bYGwHxv-960.avif 960w, /optimized/0L8bYGwHxv-1280.avif 1280w" sizes="(max-width: 640px) 320px, (max-width: 960px) 500px, (max-width: 1280px) 640px">
    <source type="image/webp" srcset="/optimized/0L8bYGwHxv-640.webp 640w, /optimized/0L8bYGwHxv-960.webp 960w, /optimized/0L8bYGwHxv-1280.webp 1280w" sizes="(max-width: 640px) 320px, (max-width: 960px) 500px, (max-width: 1280px) 640px">
    <img alt="An image" class="c-image" loading="eager" decoding="async" src="/optimized/0L8bYGwHxv-640.jpeg" width="1280" height="701" srcset="/optimized/0L8bYGwHxv-640.jpeg 640w, /optimized/0L8bYGwHxv-960.jpeg 960w, /optimized/0L8bYGwHxv-1280.jpeg 1280w" sizes="(max-width: 640px) 320px, (max-width: 960px) 500px, (max-width: 1280px) 640px">
</picture>
```

###  Optimised for editing in CloudCannon

#### Cloudcannon Configuration

The placeholder Bookshop components show how to configure your components to control inputs and previews in CloudCannon.

A `cloudcannon.config.yml` file has been provided with some configuration that starts to show what can be done to configure the CMS.

This template also demonstrates how to set [`uploads` paths](https://cloudcannon.com/documentation/articles/adjusting-the-uploads-path/) on an input level, to allow for different asset types to go to different folders.

#### Schemas

Shows how to set up schemas in CloudCannon to allow for non-technical editors to create new pages, with preset frontmatter and content.
Schemas can be defined on a collection level, allowing your new blog pages to be different to your new landing pages.
This allows for your text heavy blog/docs pages to be built and edited in the content editor, while your other pages can be built with Bookshop in the visual editor.

### SEO controls

SEO inputs come set up and configured to allow editors to control SEO on a page-by-page, and sitewide basis.

- Favicon and site SEO details are set in the Data / Site section
- SEO details can also be set in pages for page specific details.

### Font Awesome Icons

A Font Awesome Icon free icon pack is included, without having to set up your own kit in Font Awesome.

To add more icons:

1. Go to the [Font Awesome icon list](https://fontawesome.com/search?o=r&m=free)
2. Pick a free icon
3. Add a new entry to the icons file in the data collection, `data/icons.json`. This file populates the icon dropdown list used for icons in the placeholder components. Add a name, and the class that FA gives you, eg. `fa-solid fa-bookmark`.

If you want to add a custom icon, follow the example of the CloudCannon icon used in this template.

#### Remove Font Awesome Icons

1. Remove the following packages from your `package.json`:

```json
  "dependencies": {
    "@fortawesome/fontawesome-free": "^6.6.0",
  }
```

2. Remove `/component-library/components/icon/**.**`

3. Remove any references to the icon component from other components

4. Remove `/src/data/icons.json`

5. Remove any select inputs that were using the icon

```yaml
icon:
  type: select
  options:
    values: data.icons
```

6. Remove icons from your defined data in `cloudcannon.config.yml`

```yaml
data_config:
  icons:
    path: data/icons.json
```

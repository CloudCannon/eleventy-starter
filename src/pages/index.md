---
_schema: default
title: Home
seo:
  page_description: >-
    A starting point for developers looking to build a website with Eleventy,
    using Bookshop components in CloudCannon. Create your own copy, and start
    creating your own components to use in the CloudCannon CMS.
  canonical_url:
  featured_image:
  featured_image_alt:
  author_twitter_handle:
  open_graph_type:
  no_index: false
layout: layouts/component-page.html
permalink: /
eleventyExcludeFromCollections: false
content_blocks:
  - _bookshop_name: hero
    background_color: '#ffffff'
    heading:
      heading_text: Eleventy Bookshop Starter
      heading_gradient_color: '#a0a2ff'
    subheading:
      markdown_content: >-
        A starting point for **developers looking to build a website with
        Eleventy, using Bookshop components in CloudCannon**. Create your own
        copy, and start creating your own components to use in the CloudCannon
        CMS.
      color: '#393939'
    image:
      image_path: /assets/images/blog/featured-image-5.jpg
      alt_text: An image
    buttons:
      - _bookshop_name: buttons/primary
        button_text: GitHub
        button_icon: fa-brands fa-github
        button_link: https://github.com/CloudCannon/eleventy-starter/tree/main
        background_color: '#034ad8'
        hover_brightness: 0.85
        text_color: '#ffffff'
      - _bookshop_name: buttons/secondary
        button_text: CloudCannon
        button_icon: CloudCannon
        button_link: https://www.cloudcannon.com
        text_color: '#034ad8'
        hover_brightness: 0.95
  - _bookshop_name: left-right
    background_color: '#ffffff'
    heading:
      heading_text: Keep what you need. Delete the rest.
      color: '#393939'
    text:
      markdown_content: >-
        To help save you time, some features are set up in this template, like:

        -
        [Bookshop](https://cloudcannon.com/documentation/guides/bookshop-eleventy-guide/)

        - Blog with pagination, tags and
        [snippets](https://cloudcannon.com/documentation/articles/snippets-using-eleventy-shortcodes/)

        - [Image optimization](https://www.11ty.dev/docs/plugins/image/)

        - SEO Controls

        - Responsive header and footer

        - [Font Awesome
        Icons](https://fontawesome.com/search?o=r&m=free&s=solid)

        - Schemas for adding new pages

        - Editable color pallete

        - Markdown styles

        - CloudCannon configuration
      color: '#393939'
    image:
      image_path: /assets/images/undraw-hello.svg
      alt_text: An image
    flipped: true
    button:
      _bookshop_name: buttons/primary
      button_text: GitHub
      button_icon: fa-brands fa-github
      button_link: https://github.com/CloudCannon/eleventy-starter/tree/main
      background_color: '#034ad8'
      hover_brightness: 0.85
      text_color: '#ffffff'
---

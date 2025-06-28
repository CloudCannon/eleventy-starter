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
      image_path: /assets/images/undraw-online-test.svg
      alt_text: >-
        An illustration of someone leaning against the inside of a desktop
        computer monitor, with one leg dangled off the side. They're holding a
        piece of paper with a large 'A', and are next to some buttons on the
        screen.
    buttons:
      - _bookshop_name: buttons/primary
        button_text: GitHub
        button_icon: fa-brands fa-github
        button_link: https://github.com/CloudCannon/eleventy-starter/
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
      alt_text: >-
        An illustration of someone sitting a desk with a monitor and a pile of
        books on it. Seen from behind, the figure is turned around to face us
        and is waving.
    flipped: true
    button:
      _bookshop_name: buttons/primary
      button_text: GitHub
      button_icon: fa-brands fa-github
      button_link: https://github.com/CloudCannon/eleventy-starter/
      background_color: '#034ad8'
      hover_brightness: 0.85
      text_color: '#ffffff'
  - _bookshop_name: left-right
    background_color: '#ffffff'
    flipped: false
    heading:
      heading_text: You choose your editing experience.
      text_color: '#333232'
    text:
      markdown_content: >-
        CloudCannon is a flexible Git-backed CMS that specialises in editing
        markdown and data files.


        Visual editing allows you to preview your changes live before you save
        them.


        Git-backed means you can keep all your familiar git workflows, while
        providing an easy-to-understand interface for non-technical editors to
        collaborate via Git.
      text_color: '#333232'
    image:
      image_path: /assets/images/undraw-startup.svg
      alt_text: >-
        An illustration of someone leaning on one leg while facing us, next to a
        laptop that comes up their waist. One of their hands is on the back of
        the laptop, and one is in their pocket. On the laptop screen is an
        illustration of the world.
    button:
      _bookshop_name: buttons/primary
      button_text: GitHub
      button_icon: fa-brands fa-github
      button_link: https://github.com/CloudCannon/eleventy-starter/
      button_aria_label:
      background_color: '#034AD8'
      hover_brightness: 0.85
      text_color: '#ffffff'
---

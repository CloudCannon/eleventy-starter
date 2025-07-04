---
_schema: default
date: 2024-05-02T21:43:46Z
title: All the bells and whistles
draft: false
permalink:
tags:
  - Bells
  - Whistles
author: Test Richardson
thumb_image_path: /assets/images/blog/blog-thumb-5.jpg
thumb_image_alt: >-
  Three people collaboratively work at a laptop. One man is coding, while two
  are making suggestions.
image: /assets/images/blog/featured-image-2.jpg
image_alt: >-
  Children stand around a laptop smiling, while one child works with her back to
  us on the laptop.
seo:
  page_description: >-
    A demo page to show off some of the markdown editing features that
    CloudCannon's CMS offers.
  canonical_url:
  featured_image: /assets/images/blog/featured-image-2.jpg
  featured_image_alt: >-
    Children stand around a laptop smiling, while one child works with her back
    to us on the laptop.
  author_twitter_handle:
  open_graph_type: article
  no_index: false
---
A new post to test and show off what you can do from inside CloudCannon's content editor.

{% bookshop 'snippets/alert' background_color: "#FF785A" alert_message: "Test test test" color: "#FEF9EF" icon: "fa-solid fa-bell" %}

## A heading 2

Some **bold** text Some *italic* text on a new line

Some <u>underlined</u> text in a new paragraph.Another new line with a <s>strike.</s>

### A heading 3

Some <sub>subscript</sub>

A superscript<sup>TM</sup>

`const code = 'cool';`

Left align

<p class="align-center">Middle align</p>

<p class="align-right">Right align</p>

1. A numbered list
   1. A lil sub item
2. Another number
   1. Pretty
   2. Wow
3. Done

* An unordered list
* Another item
  * A sub item though
  * Another sub item


<img src="/assets/images/blog/blog-thumb-1.jpg" height="413" width="500" />

---

> A quote - Test Richardson

```
object:
  colors:
    options:
      red: '#FF0000'
      white: '#FFFFFF'
```

<table><caption><p>Such table</p></caption><thead><tr><th><p>Col 1</p></th><th><p>Col 2</p></th></tr></thead><tbody><tr><td><p>true</p></td><td><p>false</p></td></tr><tr><td><p>true</p></td><td><p>true</p></td></tr><tr><td><p>null</p></td><td><p>true</p></td></tr><tr><td><p>false</p></td><td><p>false</p></td></tr></tbody></table>

{% bookshop 'snippets/alert' background_color: "#034AD8" alert_message: "This is an alert message" color: "#000000" icon: "fa-solid fa-bell" %}

{% bookshop 'snippets/file' src: "/assets/documents/test.pdf" file_name: "test-file" link_message: "A test file to show how you'd have a downloadable link through your markdown" %}

Some text which is normal color - {% tint, "#F7B2AD" %}Woah a tint!{% endtint %} Some more text to show how inline tint is.

{% bookshop 'snippets/video' src: "/assets/videos/test.mp4" %}
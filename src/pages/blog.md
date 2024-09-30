---
title: Blog
layout: layouts/blog.html
eleventyExcludeFromCollections: false
pagination:
  data: collections.posts
  size: 3
  alias: posts
permalink: /blog{% if pagination.pageNumber > 0 %}/{{ pagination.pageNumber }}{% endif %}/index.html
seo:
  page_description: 'A blog template with tags.'
  canonical_url:
  featured_image:
  featured_image_alt:
  author_twitter_handle:
  open_graph_type: website
  no_index: false
---

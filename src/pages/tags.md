---
pagination:
  data: collections
  size: 1
  alias: tag
  addAllPagesToCollections: true
permalink: /blog/tags/{{ tag | downcase}}/
layout: layouts/tags.html
eleventyExcludeFromCollections: false
eleventyComputed:
    title: "{{tag | capitalize}}"
---
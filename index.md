---
layout: page
title: Home
tagline: echo "hello world!"
---
{% include JB/setup %}

I should put something here.

Here's a cool video.

<iframe width="420" height="315" src="http://www.youtube.com/embed/fNF4siu5vAo" frameborder="0"> </iframe>

<h2>Blog Posts</h2>

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
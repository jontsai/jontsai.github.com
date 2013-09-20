---
layout: page
title: Home
description: "Home page of Jonathan Tsai, also known as jontsai or jontsai8601"
tagline: echo "hello internet!"
---
{% include JB/setup %}

You've arrived at the website of Jonathan Tsai.

If you're here, you're probably trying to learn more [about](about.html) me, or read some of my [blog entries](blog).

This site has keyboard shortcuts (press `?`) and a web console (press `` ` ``). They're pretty gimmicky features, but I programmed them just for fun.

Thanks for stopping by!

<h2>Recent Blog Posts</h2>

<ul class="posts">
  {% for post in site.posts %}
  {% if forloop.index0 < 5 %}
  <li><span>{{ post.date | date: '%Y-%m-%d' }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endif %}
  {% endfor %}
</ul>

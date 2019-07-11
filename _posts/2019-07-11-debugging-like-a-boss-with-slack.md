---
layout: post
title: "Debugging like a Boss with Slack"
description: "println debugging is the best kind of debugging"
category: "programming"
tags: [hacks,programming,debugging]
---
{% include JB/setup %}

I've been using `println` debugging since forever. It's the best. It's minimalest, and is the least surprising form of debugging, and allows you to set-it-and-forget it. I've used interactive debuggers before, but when `println` debugging techniques are used effectively, I'd argue that step-through interactive debuggers are not necessary at all, and slow you down.

For years now, I've been using an evolved form of `println` debugging, which I call Slack debugging, and  I've written various forms of functions called `slack_debug`.

This has been a close-kept secret for myself and select other teammates and colleagues who were curious to know what exact wizardry I was doing.

And now, for the first time, I've decided to clean up the solution, open-source it, and share it with the world.

And without further ado, Slack debugging is available here: <https://github.com/hacktoolkit/pyhtk-lite>

Love it? Hate it? Please share your thoughts and comments, or even better yet, submit pull requests to make it better!

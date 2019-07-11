---
layout: post
title: "Debugging like a Boss with Slack"
description: "println debugging is the best kind of debugging"
category: "programming"
tags: [hacks,programming,debugging]
---
{% include JB/setup %}

I've been using `println` debugging since forever. It's the best! It's minimal, is the least surprising form of debugging, and allows you to set-it-and-forget it. I've also used interactive debuggers before, but when `println` debugging techniques are used effectively, I'd argue that step-through interactive debuggers are not necessary at all, and actually slow you down.

For years now, I've been using an evolved form of `println` debugging, which I affectionately call "Slack debugging," and I've written various manifestations of utility/helper functions called `slack_debug` over the years.

This has been a close-kept secret for myself and select other teammates and colleagues who were curious to know what exact wizardry I was doing.

And now, for the first time, I've decided to clean up the solution, open-source it, and share it with the world.

## Behold, the Power of "Slack Debugging"

```
In [1]: from htk import slack_debug

In [2]: from htk import slack_debug_json

In [3]: slack_debug('This is seriously awesome!')
Out[3]: <Response [200]>

In [4]: slack_debug('Yeah, no kidding.')
Out[4]: <Response [200]>

In [5]: slack_debug_json({'A':1,'B':2,'C':3,'X':['foo','bar','baz'],'Z':{'nested_key':'nested_val
   ...: ue'}}),
Out[5]: (None,)
```

![Debugging like a Boss with Slack](https://user-images.githubusercontent.com/422501/61013274-e65e1e00-a336-11e9-90aa-44a6fd1e217c.png "Debugging like a Boss with Slack")

And without further ado, Slack debugging is available here: <https://github.com/hacktoolkit/pyhtk-lite>

Love it? Hate it? Please share your thoughts and comments, or even better yet, submit pull requests to make it better!

---
layout: post
title: "Universal Directives for Shell Scripts"
description: "Good conventions to follow"
category: "programming"
tags: [shell, env, bash, python, convention]
---
{% include JB/setup %}

When writing shell scripts or other types of executables, you often put a directive at the top of the file to indicate which kind of interpreter to use.

`#!/bin/python`

Oh wait, that didn't work?

`#!/usr/bin/python`

Okay, that worked on my Mac. But why all the guesswork? There is another command that is better.

Introducing `env`. Use it as a directive like so:

`#!/usr/bin/env python`

And if it's a `bash` script:

`#!/usr/bin/env bash`

`env` is kinda like `which`. It takes the first argument and figures out the full path of that, and uses it as the directive

`man env` to read more about it.

Basically using `#!/usr/bin/env INTERPRETER` makes your script more _portable_

> _portability_ (adj.)  
> the ability to run your script anywhere, on any OS/platform

The holy grail goal of programming/CS = _write once, run everywhere_

It is somewhat circular in that it depends on `env` living inside of `/usr/bin/`, but I believe it is a _convention_ that is much more rarely broken than where `python` or `bash` lives.

> _convention_ (n.)  
> another CS vocab word.  
> The quality of being predictable, doing expected things.
>
> e.g you walk into a dark room, you expect the light switch to be near the doorway opposite of the door hinge, not a mousetrap clamping down on your fingers when you reach along the wall.

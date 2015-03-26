---
layout: post
title: "Hack GitHub Streaks"
description: "How to Hack GitHub Streaks with this simple project"
category: "programming"
tags: [hacks,automation,GitHub,recruiters]
---
{% include JB/setup %}

Tonight, I was doing some research and maintenance on a couple of my open-source projects. In particular, I had recently learned about [EditorConfig](http://editorconfig.org/) (which BTW, is a great idea! and a standard EVERYONE should adopt), and wanted to add it to most of my projects.

That brought me to [my GitHub homepage](https://github.com/jontsai), and I caught a glimpse of my GitHub streak. Only 2 days! I was on a roll for a few days, and then a few days of working on private projects reset my streak.

Not that it matters, anyways, but I was slightly bothered, and being the fan of automation that I am, I quickly thought up how to automate my GitHub contributions to keep my streak alive, artificially.

30 minutes later, [`github-streak`](https://github.com/jontsai/github-streak) is born and released to the world. I call that being diligent at slacking off.

It's a fairly straightforward project that had a few requirements/constraints as I designed it:

- Had to be portable, modular
- Had to be cross-platform, as much as possible
- Had to be really simple technology and minimal dependencies--don't overthink it

The result:

- Written in BASH/shell script (my favorite shell)
- Even uses the conscientious `#!/usr/bin/env bash` shebang directive
- Creates a symlink in `/etc/cron.daily` -- probably won't work for every system, but at least was available on my webserver and others that I've used in the past
- The script just appends a date string to a `.streak` file (hey, a new convention!) and `git commit`s/`git push`es
- Added in the `.editorconfig` and `.travis.yml` goodies
- MIT licensed (my favorite open-source license)

So, here you go internet, have at it: [`github-streak`](https://github.com/jontsai/github-streak)

Show some star/fork love. Plz thx kbye.

<a href="http://cl.ly/image/1g1L2R241r2l"><img src="https://s3.amazonaws.com/f.cl.ly/items/1N3d1a1D1W1R0C0o1L0i/crappy_streak.png" title="Crappy streaks be gone" style="max-width: 100%;"/></a>

Edit: Here are some other GitHub projects worth checking out that manipulate commit history as art:

- <https://github.com/jbranchaud/commitart>
- <https://github.com/gelstudios/gitfiti>
- <https://github.com/bayandin/github-board>

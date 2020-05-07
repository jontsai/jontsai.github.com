---
layout: post
title: "Use Python iSort to Automagically Organize Imports within your Favorite Editor"
description: '"Please organize the imports" / "isort plz kthxbye"'
category: "programming"
tags: [tools, Python, isort]
---
{% include JB/setup %}

## tl;dr;

**isort** (**[PyPI](https://pypi.org/project/isort/)** | **[GitHub](https://github.com/timothycrosley/isort)**) is a wonderful tool that will sort imports in Python automagically, so that you no longer have to either a) *ignore eye-sores during code reviews*, or b) *sound like an angry grandparent asking people to sort/organize imports*.


## Quick Setup
If you know your away around the *nix environment, these are the abridged instructions:

1. Make the `isort` **binary** available somewhere in your **[path](https://en.wikipedia.org/wiki/PATH_(variable))**.
1. Install the `isort` **plugin** for the **[editor of your choice](https://github.com/timothycrosley/isort/wiki/isort-Plugins)**.
1. Profit

**NOTE: (Optional but recommended)** Add a `.isort.cfg` file to your HOME directory, so that even you are working on a random script or project that doesn't have one, the powers of `isort` are still available to you.

## Drudgerous Line-by-Line Instructions (or *my setup*)

1. If you don't have one already, create a new system-wide **[Python virtualenv](https://virtualenv.pypa.io/en/stable/)**.
    1. The way I'd do that is to do: `/path/to/bin/python/virtualenv ~/.venv`
1. Install isort.
    1. `~/.venv/bin/pip install isort`
    1. (Generic command: `/path/to/venv/pip install isort`)
1. Add the `bin` directory of your system-wide `virtualenv` to your path, or just the select binaries that you want.
    1. I have already added `~/bin/` to my path via **[bash-ftw](https://github.com/jontsai/bash-ftw)**, so my preference is to just symlink the specific binaries that I need.
    1. For convenience, I've symlinked the following:
        1. `ln -s ~/.venv/bin/isort ~/bin/isort`
        1. `ln -s ~/.venv/bin/python3 ~/bin/python3`
        1. `ln -s ~/.venv/bin/pip ~/bin/pip`
1. Install an **[isort plugin](https://github.com/timothycrosley/isort/wiki/isort-Plugins)** for your editor (in my case, `emacs`, **The best text editor in the world™**).
    1. For `emacs` only:
        1. For **EZMODE™**, my **[dotemacs setup is on GitHub](https://github.com/jontsai/dotemacs)** (just `git clone`, `make install`, and you're set!)
        1. Add two lines to your dotemacs (typically `~/.emacs.el` or `~/.emacs.elc`, or somewhere in your Emacs load path):
            1. `(require 'py-isort)`
            1. `(add-hook 'before-save-hook 'py-isort-before-save)`
    1. **No longer have to manually organize your Python imports anymore!** The `isort` plugin will do it for you automatically whenever you save your file.

## Thank You!

Thanks for reading; now go forth and write some awesome Python code!

*Questions, comments, suggestions?* Leave a comment or subscribe to the blog for future helpful tips!

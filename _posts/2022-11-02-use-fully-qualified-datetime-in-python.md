---
layout: post
title: "Use Fully Qualified datetime in Python"
description: "Your teammates will thank you"
category: "programming"
tags: [Python, programming, software engineering]
---
{% include JB/setup %}

Whenever using the `datetime` module in Python, a highly recommended
practice is to just import `datetime` at the top of the file, and use
the fully-qualified module name in the code, as much as possible:

- `datetime.datetime`
- `datetime.timedelta`
- `datetime.date`

If one does `from datetime import datetime`, it's hard to figure out
at-a-glance  what `datetime` is referring to in the middle of a
several-hundred-lines-of-code file.

For similar reasons, another common best practice in Python when using
the `typing` module (https://docs.python.org/3/library/typing.html) is
to import is as `import typing as T` or `import typing as t`
(e.g. https://github.com/pallets/flask/blob/cc66213e579d6b35d9951c21b685d0078f373c44/src/flask/app.py#L7; https://github.com/pallets/werkzeug/blob/3115aa6a6276939f5fd6efa46282e0256ff21f1a/src/werkzeug/wrappers/request.py#L4)

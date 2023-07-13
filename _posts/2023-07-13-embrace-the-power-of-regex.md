---
layout: post
title: "Embrace the power of Regex"
description: "In with regex, out with split"
category: "programming"
tags: [programming]
---
{% include JB/setup %}

Too often, while reviewing code, I'll see examples like:

```
def extract_id_and_env(key: str) -> dict:
    """Extracts the object ID from `key`

    `key` is a string like 'namespace_prefix_12345'
    In some cases, `key` could also look like `namespace_prefix_12345_environment`

    Returns a dict with the object ID, an integer
    """
    parts = key.split('_')

    parsed = {
        'id': int(parts[2]),
        'environment': parts[3] if len(parts) == 4 else None
    }
    return parsed
```

When I see this, I ask, "Why?"

Instead, this is my preferred way of handling this is to use a regex
with named capture groups:

```
import re

KEY_PATTERN = re.compile(r'(?<namespace>[a-z]+)_(?<prefix>[a-z]+)_(?<object_id>\d+)(?:_(?P<environment>[a-z]+))?

def extract_key_components(key: str):
    m = KEY_PATTERN.match(str)
    parts = ['namespace', 'prefix', 'object_id', 'environment', ]
    values = [m.group(part) for part in parts]
    return values
```

In another example (contrived, but modified from a real world
application), from a Django which serves both students and educators,
and displays two different landing pages depending on the intent:

```
def login_view(request):
    url = request.GET.get('next')
    last_word = url.split("/")[-1]
    is_student = True if last_word == 'scholarship' else False

    template = 'login/student.html' if is_student else 'login/educator.html'

    response = render_to_response(request, template)
    return response
```

The problem with this code is not immediately apparent. It
works. However, this code lacks robustness.

An arguably better approach:

```
import re

STUDENT_LOGIN_INTENT_PATTERNS = [
    re.compile(r'^/path/to/(?P<some_id>\d+)/scholarship$'),
]

def is_login_intent_student(request):
    is_student = False
    next = request.GET.get('next')
    for pattern in STUDENT_LOGIN_INTENT_PATTERNS:
        if pattern.match(next):
            is_student = True
            break
    return is_student
    

def login_view(request):
    is_student = is_login_intent_student(request)
    template = 'login/student.html' if is_student else 'login/educator.html'

    response = render_to_response(request, template)
    return response
```

In addition to the readability and maintainability of the regex
approach, it is overall more robust, allowing the programmer to
extract multiple components from the string all at once! This
mitigates the need for updating the function in the future, if other
parts of the string are needed later on (and it's quite often that it
would be the case!).

My preference for Regex over Split stems from:

- Somewhat related to the principle of https://www.joelonsoftware.com/2005/05/11/making-wrong-code-look-wrong/
- If code is wrong, it should fail catastrophically and loudly, not subtly or obscurely
- It's hard to make a regex that looks _maybe right_? Either a regex is right, or obviously wrong. (It could also be that I have lots of experience using regexes, and can write them without lookup up references)
- OTOH, while `split` is conceptually easier to learn, for me, it's hard or nearly impossible to see **at a glance** whether the code is write or wrong. For example, if you look at a block of code using `split` and various indexes, how would you instantly detect a possible OB1 (aka off-by-one error; https://en.wikipedia.org/wiki/Off-by-one_error)? Not possible. OB1s bugs are prevalent in software because the learning curve, and therefore barrier to entry, is low, so bugs are more likely to be introduced.
- Regexes, OTOH, have a slightly higher learning curve, slightly higher barrier to entry, so those who use it tend not to make trivial mistakes
- **If** the code never has to update ever again, then, great! `split` is sufficient. If the next engineer has to update it, they would not necessarily benefit from the existing code, and would have to re-evaluate all of the code in their head to make sure indexes are right.
- Maintaining a list of patterns, or regexes, encourages a **Solve for N** mentality, whereas using `split` encourages a "solve it quick and dirty mindset"

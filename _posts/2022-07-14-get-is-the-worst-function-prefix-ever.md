0;95;0csetter---
layout: post
title: "Get Is the Worst Function Prefix Ever"
description: "Software people are supposed to be creative"
category: "programming"
tags: [programming,]
---
{% include JB/setup %}

## tl;dr;

Unless the function you are writing is a `getter` (which complements a [`setter`](https://en.wikipedia.org/wiki/Mutator_method)), please avoid naming methods `get_`.

`get_` lacks descriptiveness, precision, and is **boring**.

## Rationale

Software engineers are supposed to creative, and `get` is possible the _least_ creative function name possible.

Too often, I see codebases cluttered with `get_` methods throughout, when the implementations of those methods do things far more complex than simply reading or getting a value from an object.

When half of a file with hundreds of lines of code are all named `get_*`, this makes code difficult to read, scan, and **reason** about. (Future blog posts will address code that is easy vs difficult to reason about.)

## Alternatives

Since much of the world's software (historically) has been produced from within English-speaking countries and by English-speaking programmers and software engineering teams, please allow me introduce to you the robustness of the English language.

While my hope and expectation is not for every software engineer to have a Shakespearean command over English vocabulary, I do think that it is quite tenable to learn a few prefixes to help codebases become more manageable and pleasing to read.

Without further ado, these are my suggestions:

- `build_`
- `calculate_`
- `extract_`
- `fetch_`
- `look_up_` / `retrieve_`
- `format_` / `transform_`

Below are examples and sample code, in Python (my language of choice).

### `build_`

**When to use it**: Use this prefix for a method which takes in some data, and builds a more complex structure as a result.

**Analogy**: You have multiple loose LEGO bricks, and want to assemble those pieces to **build** a structure out of that.

**Bad**

```
def get_response(color, food, location):
    response = {
        'color': color,
        'food': food,
        'location': location,
    }
    return response
```

**Good**

```
def build_response(color, food, location):
    response = {
        'color': color,
        'food': food,
        'location': Location(location),
    }
    return response
```

**Usage**

```
response = build_response('green', 'eggs and ham', 'in a car')

# Result:
# {
#     'color': 'green',
#     'food': 'eggs and ham',
#     'location': {
#         'name': 'in a car'
#     },
# }
```

### `calculate_`

**When to use it**: When you have some data, and some formula is applied to **calculate** a result.

**Analogy**: If it's not doable via "mental math," and needs to be **calculated**.

**Setup**

```
items = [
    {
        'color': 'green',
        'food': 'eggs and ham',
        'location': {
            'name': 'in a car'
        },
        'price_cents': 1525,
    },
    {
        'color': 'red',
        'food': 'hot chili peppers',
        'location': {
            'name': 'with a mouse'
        },
        'price_cents': 299,
    },
    {
        'color': 'orange',
        'food': 'carrots',
        'location': {
            'name': 'here or there'
        },
        'price_cents': 399,
    },
]
```

**Bad**:

```
def get_total(items, unit='cents'):
    total_cents = sum([item['price_cents'] for item in items])

    if unit == 'cents':
        total = total_cents
    elif unit == 'dollars':
        total = float((Decimal(total_cents) / Decimal(100)).quantize(Decimal('1.00')))
    
    return total
```

**Good**:

```
def calculate_total(items, unit='cents'):
    total_cents = sum([item['price_cents'] for item in items])

    if unit == 'cents':
        total = total_cents
    elif unit == 'dollars':
        total = float((Decimal(total_cents) / Decimal(100)).quantize(Decimal('1.00')))
    
    return total
```

A method named `calculate_` will mentally prepare the engineer to be extra careful and meticulous when maintaining this code, because the goal is to be accurate and precise.

### `extract_`

**When to use it**: When you need one, or a few pieces of information, from a more complex structure.

**Analogy**: You have a plain rock (diamond ore, gold ore) which is relatively useless on the _surface_, and want to **extract** the valuable contents (diamonds, gold).

**Setup**

```
response = {
    'color': 'green',
    'food': 'eggs and ham',
    'location': {
        'name': 'in a car'
    }
}
```

**Bad**

```
def get_color(response):
    return response['color']


def get_location_name(response):
    return response['location']['name']

# Usage

color = get_color(response)
location_name = get_location_name(response)
```

**Better**

```
response = {
    'color': 'green',
    'food': 'eggs and ham',
    'location': {
        'name': 'in a car'
    }
}

def extract_color(response):
    return response['color']


def extract_location_name(response):
    return response['location']['name']

# Usage

color = extract_color(response)
location_name = extract_location_name(response)
```

**Great**

Consider using object-oriented programming:

```
class Response:
    def __init__(self, raw_response):
        self.raw_response = raw_response

    @property
    def color(self):
        return self.raw_response['color']

    @property
    def location_name(self):
        return self.raw_response['location']['name']

# Usage

r = Response(response)

color = r.color
location_name = r.location_name
```

### `fetch_`

**When to use it**: Use this prefix when the method makes an HTTP call or other API call. Inspired by `fetch` from JavaScript (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

**Analogy**: If you have a warm and cuddly friendly dog, and you're at the park playing the good ol' game of **fetch**; the object you're intending to **retrieve** is accessible to you, but not _immediately_ within reach.

**Bad**

```
def get_story_details(story_id):
    response = requests.get(f'https://api.example.com/story/{story_id}/details')
    return response
```

If the method is named `get_`, there's no way to distinguish at a glance whether this function calls out to another server/service.

Whenever the flow of your code leaves your control (like making an API call), there is inherent risk and potential for errors to occur (e.g. "What if the remote API goes down?")

**Good**

```
def fetch_story_details(story_id):
    response = requests.get(f'https://api.example.com/story/{story_id}/details')
    return response
```

By naming methods that make API calls to remote resources with`fetch_`, you allow engineers to quickly identify risky sections of code at a glance, without requiring them to read the details of a function -- and this saves time -- allowing a flywheel effect of: _by writing code faster, teams produce more code / fix bugs more quickly, delivering more business value, enabling these teams to hire more team members, to build more products..._.

So, if I see a method named `fetch_`, I can immediately make mental note  to make these sections of code more resilient (such as with `try` and `except` error handling, retry logic with exponential backoffs, etc).

### `look_up_`

**When to use it**: Use this prefix when the goal of the method is to retrieve data that was previous stored in a local storage, like a database.

**Analogy**: There is a single piece of information you want to retrieve from among a larger collection, like *looking up** the defintion of a word in a glossary.

**Setup**

```
# MySQL

| id | item              | price_cents |
----------------------------------------
|  1 | eggs and ham      |        1525 |
|  2 | hot chili peppers |         299 |
|  3 | eggs and ham      |         399 |
```

**Bad**

```
def get_price(item):
    sql = connect()
    q = sql.query('items').where(item=item)
    price = q.execute()['price_cents']
    return price
```

**Better**

```
def look_up_price(item):
    sql = connect()
    q = sql.query('items').where(item=item)
    price = q.execute()['price_cents']
    return price
```

By naming a method `look_up`, you mentally prepare the next engineer who reviews this code that this method involves some form of database retrieval, and they can also keep in mind the performance characteristics of database retrieval.

**Best**

Use the database repository design pattern.

```
# repos/items.py

class ItemRepo:
    def get(self, item: str) -> Record:
        sql = connect()
        q = sql.query('items').where(item=item)
        record = q.execute()
        return record

    def look_up_price(self, item: str) -> float:
        record = self.get(item)
        price = record['price_cents']
        return price
```

### `format_` / `transform_`

**When to use it**: When the desire output is a derivative of the inputs, or a _metamorphosis_ such that output is not recognizable from the original form, but only to a connoiseur.

**Analogy**: When the input is uncooked potatoes and the output is mashed potatoes, you are **transforming** the raw ingredients into a useful end-product.

**Bad**

```
def get_mashed_potato(raw_potato):
    boiled_potato = boil(raw_potato)
    mashed_potato = mash(boiled_potato)
    return mashed_potato
```

**Good**

```
def transform_potato(raw_potato, form_factor):
    result = raw_potato

    if form_factor == 'raw':
        result = raw_potato
    elif form_factor == 'baked':
        result = bake(raw_potato)
    elif form_factor == 'boiled':
        result = boil(raw_potato)
    elif form_factor == 'mashed':
        result = mash(transform_potato(raw_potato, 'boiled'))

    return result
```

Alternatively, `format_potato` with the same function body above would work.

## Conclusion

Please, for the love of all things proper, think twice before creating another method with the prefix name `get_`, and use one of the better alternatives: `build_`, `extract_`, `fetch_`, `look_up_`, `retrieve_`, `transform_`.

I promise you -- your future self and your teammates will thank you!

## Feedback

Agree? Disagree? Love it? Hate it?

Please leave comments or drop me a line!

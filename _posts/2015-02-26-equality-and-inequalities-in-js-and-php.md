---
layout: post
title: "Equality and Inequalities in JS and PHP"
description: "== vs === in JavaScript and PHP"
category: "programming"
tags: [javascript,php,programming]
---
{% include JB/setup %}

It's 2015, and from time to time I still see a lot of `==` peppered throughout codebases that I work with, and just wanted to share a few posts that might change your mind =)

**tl;dr;**

`===` and its complement `!==` and should be used like 99% of the time because it is faster and more accurate.

* <http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-JavaScript-comparisons>
* <http://stackoverflow.com/questions/2401478/why-is-faster-than-in-php/3333581>
* <http://jsperf.com/comparison-of-comparisons>

![](https://s3.amazonaws.com/f.cl.ly/items/3w1N2T280O032K0v203l/Image%202015-02-26%20at%209.23.35%20AM.png "Playing with JS in browser console")

    > 0 == "0"
    < true
    > 0 === "0"
    < false
    > 0 == false
    < true
    > "0" == false // really?
    < true
    > !!"0"
    < true
    > !"0"
    < false
    > "0" === false
    < false

There are more perverse and mind-bending examples that are out there, but I’ll leave you with those for now.

As you can see, the former `==` does type coercion, which is lazy way of doing comparisons without casting data explicitly, and can find yourself in hot water down the line. The latter `===` does type checking first, and then checks equality of the values.

**Protip #1**: If you want to test a JS expression or figure out some syntax really quickly, just open your JS console in the browser inspect tool.

**Protip #2**: If testing for something *truthy* or *falsy*, a nice trick is to just do use the `!` operator twice (`!!`). As can be seen above, JS treats non-empty strings as a *truthy* (yet, strangely, `"0" == false`)

---
layout: post
title: "How to pretty print JSON from CLI"
description: ""
category: "programming"
tags: [JSON,CLI,command line,shell,tools]
---
{% include JB/setup %}

Software engineers frequently have to deal with JSON and inspect or manipulate it.

There are two easy ways of pretty-printing JSON from command-line to aid in visual inspection. The first requires no installation, and the second requires a minimal installation but also provides syntax highlighting and manipulation capabilities.

## Method 1: Using Python - Nothing to Install

**Optional**: Add alias to <code>.bashrc</code>
<br/>
<code>
alias json='python -mjson.tool'
</code>

Example:

    $ echo '{"cool": { "story" : { "bro" : [1, 2, 3] } } }' | json
    {
        "cool": {
            "story": {
                "bro": [
                    1,
                    2,
                    3,
                ]
            }
        }
    }

Reference: <a href="http://www.restlessprogrammer.com/2013/03/how-to-pretty-print-json-from-command.html" target="_blank">http://www.restlessprogrammer.com/2013/03/how-to-pretty-print-json-from-command.html</a>

## Method 2: Using JQ - Minimal Install

Mac install via [Homebrew](https://brew.sh/): <code>brew install jq</code>  
Ubuntu install <code>apt</code>: <code>sudo apt-get install jq</code>

    $ echo '{"cool": { "story" : { "bro" : [1, 2, 3] } } }' | jq .
    {
        "cool": {
            "story": {
                "bro": [
                    1,
                    2,
                    3
                ]
            }
        }
    }

Reference: <a href="https://stedolan.github.io/jq/" target="_blank">https://stedolan.github.io/jq/</a>

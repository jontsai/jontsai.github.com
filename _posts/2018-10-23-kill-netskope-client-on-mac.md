---
layout: post
title: "Kill Netskope Client on Mac"
description: ""
category: ""
tags: [GTD, Netskope, security]
---
{% include JB/setup %}

Netskope is a corporate security tool installed on corporate-owned devices that will introduce and override the default SSL certificate authorities by injecting its own local server.

For developers, this often poses an inconvenience especially if they need to develop applications that make API calls and HTTP requests to other web services, if the developers are hitting a web service that has not previously been white-listed by the IT department. The IT department may not be in close communication with the engineering teams, and require additional information from the developers in order to configure a new whitelist rule, impacting the ability of engineers to meet deadlines.

**tl;dr;** How to <strikekill</strike> temporarily disable Netskope

`sudo launchctl unload /Library/LaunchDaemons/com.netskope.stagentsvc.plist`

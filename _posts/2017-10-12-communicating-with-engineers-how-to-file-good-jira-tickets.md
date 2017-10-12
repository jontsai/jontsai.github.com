---
layout: post
title: "Communicating with Engineers: How to File Good JIRA Tickets"
description: ""
category: "software engineering"
tags: [software engineering,customer success,communication,teams]
---
{% include JB/setup %}

By Jonathan Tsai ([@jontsai](http://twitter.com/jontsai) | https://linkedin.com/in/jontsai)

Original Permalink (working Quip doc) : [Communicating with Engineers: How to File Good JIRA Tickets](https://quip.com/bb9rA9Cpmvax)  
License: [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)

*This article was originally written as part of a mini-training for the customer success team at [Iterable](http://iterable.com/) in July 2017. For the most updated version of this article, view the Quip version at the above permalink.*

## Purpose

*“Those who fail to learn from history are doomed to repeat it.” - George Santayana*

Engineers build things, and also fix stuff when things break. Everyone's time is valuable, so how can we effectively capture and document issues that come up, so that we make the product better, and learn as a team rather than “repeat the mistakes of history.”

## Common Pitfalls to Avoid

* **Conflating issues (that shouldn't be conflated)**
    * **Symptoms**:
        * Combining multiple issues into one JIRA ticket.
        * This is happening for me, too!
    * **Why it happens**: Upon initial inspection or cursory examination, two or more issues can appear to have the same cause. However
    * **How this hurts**: If all reported under one issue, we may solve one problem but unintentionally overlook others that got masked.
    * **Recent examples**: Emails being sent out slowly for Spotify
    * **Actual root causes**: Three separate issues, actually, with 3 different solutions
        * CloudAMQP memory failure
        * Unhandled exception in our messaging dequeuing code causes processor
        * Inadvertently downgraded date-timezone library dependency, which failed to parse a particular timezone
    * **Recommended alternative courses of action**:
        * Do some research to pinpoint when (time), where (context: app? mobile? API?), and how (what the user was doing)
        * Capture the major themes
* **Prematurely filing a ticket / fragmenting tickets (opposite of conflating issues)**
    * **Symptoms**:
        * You're filing too many tickets
        * The rate at which you open tickets far exceeds the rate at which they get closed or completed (optimal ratio is hard to specify, but maybe 3:1 or 5:1, but not definitely 10:1 or 20:1)
        * The ticket has already previously been filed
    * **Why this happens:**
        * Want to avoid conflating issues
        * Did not research if an existing known issue
        * Did not consult or check with other teammates
    * **How this hurts**:
        * Too many issues get logged, but never worked on.
        * Generates a lot of noise and distraction
    * **Recommended alternative courses of action**:
        * Talk to teammates and if at least 1 or 2 other CS persons agree it should be a ticket, or 1 other engineer, then file it
        * Do some research whether an existing ticket already exists. This may take more than a basic search or two. Scan through past 2 weeks at least, and search a couple of most likely specific keywords.
        * When it does happen, find the other ticket, enhance the ticket with more detail, and resolve one as duplicate.
* **Providing too much detail**.
    * **Symptoms**: Parroting the exact request from the customer
    * **Why it happens**: You feel inundated or overwhelmed with customer requests, so you report them in JIRA or to an engineering Slack channel for assistance
    * **How this hurts**: CS is the first line of defense for engineering team, otherwise engineers wouldn't be able to focus on making stuff better and spend most of the time troubleshooting. Engineers aren't necessarily better problem solvers than CS, so they would start to feel inundated or overwhelmed, too. The engineer would have to 
    * **Recommended alternative courses of action**:
        * Imagine you are a 911 operator/dispatcher. How would you field calls?
        * Do some translation or summarization of the actual issues at hand. No need to provide a diagnosis
        * Perform some high-level filtering, triaging, and pattern matching before filing a JIRA ticket or hitting up Slack channel
        * Ask a teammate or someone in person (counter-intuitive, yes, but a poorly researched JIRA ticket or Slack message disrupts more people, since *N* individuals need to read and process that message); an alternate could be using Direct Messages in Slack over blasting a channel.
* **Providing too little detail**
    * **Symptoms**:
        * JIRA ticket is really short, or took you less than 10 minutes to create.
        * Engineer follows up with more questions. You answer some questions, and more questions are asked. 
    * **How this hurts**:
        * And endless cycle of questions with no further clarity being established.
        * Or, the JIRA ticket never gets addressed at all, because it wasn't actionable.
    * **Recommended alternative courses of action**: A good JIRA ticket:
        * Should take at least 5, maybe 10-15 minutes to create, if not longer
        * Is comprehensible by any engineer
        * Actionable. The problem is succinctly described, and it is clear what the next steps are.
        * Tracks only one issue or actionable item. Only has “one user story.”
* **Not filing a ticket**
    * **Symptoms**:
        * You have lots of conversations about an issue.
        * You've already spent 20-30 minutes thinking or talking about an issue
        * You've already spent 20-60 minutes trying to address and issue on your own, and it is still not resolved
    * **Why this happens**:
        * You get caught up in the moment or simply forget
        * Not wanting to file too many tickets
    * **Recommended alternative courses of action**:
        * File a ticket!
        * **Include a good title**. A good title describes a course of action, rather than the symptom of the problem. Focus on solution, rather than the problem
        * **Include a good description.**
            * One sentence summary that answers several of “Who? What? When? Where? Why? How?”
            * A short 2-4 sentence paragraph of the expanded problem and proposed solution
            * Any supporting details in a bulleted list
                * Links to the actual issue in the product or app
                * Links to customer conversations, Slack conversations
                * Links to supporting documentation
            * Additional attachments, key snippets of conversations or key pieces of “evidence” gathered or research performed, or troubleshooting steps already taken

## Choosing Good Titles

**This is one of the MOST IMPORTANT things you can do.** You may not think it, but software engineers spend a lot of time reading every day. Reading code, reading tickets, reading Slack, etc. Therefore, choosing a good title for the ticket will have significant effect on comprehension and speed of delivery.

**A good title**:

* Describes a course of action, rather than the symptom of the problem
* Describes the MVP. Some people like to write user stories, but I'm not a fan.
* Usually **starts with a verb**, stated in the form of an imperative, as if authoritative:
    * Simply, “Do this” is **much preferred** to “Can you do this because So and So needs this or that?”
    * This is not rude; it's succinct and to the point
    * The reasoning and background should go in the description.
    * Engineers can push back or discourse on it in the comments, with their own reasoning
* **Important:** No verb implies no action, and therefore, none will be taken.
* JIRA ticket titles should not be nouns, generally.
    * For new features:
        * Bad: Facebook Custom Audiences
        * Good: *Implement* Facebook Custom Audiences
    * For improvement or requests:
        * Bad: IP Whitelisting
        * Verbose: Customer X is asking for a set of IPs or an IP range that they can whitelist when it comes to receiving webhook posts
        * Good: Provide Fixed IPs for Webhook Servers for Customers to Whitelist




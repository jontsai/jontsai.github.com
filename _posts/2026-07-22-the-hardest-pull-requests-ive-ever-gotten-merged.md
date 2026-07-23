---
layout: post
title: "The Hardest Pull Requests I've Ever Gotten Merged"
description: "What two small OpenClaw contributions taught me about open source, AI-assisted engineering, and the value of living inside the product you use."
category: "programming"
tags: [open-source,openclaw,slack,ai,engineering,github]
---
{% include JB/setup %}

Two of my pull requests were just merged into [OpenClaw](https://github.com/openclaw/openclaw):

- [fix(slack): allow channel-id reads for name-allowlisted channels](https://github.com/openclaw/openclaw/pull/95313)
- [fix(slack): honor configured App Home command](https://github.com/openclaw/openclaw/pull/102340)

The commits that made it to `main` are here: [github.com/openclaw/openclaw/commits/main/?author=jontsai](https://github.com/openclaw/openclaw/commits/main/?author=jontsai)

They were reviewed and merged by Pete Steinberger.

That still feels surreal to type.

I've been writing software professionally for more than two decades. I've worked on production systems, led teams, debugged gnarly incidents, reviewed a lot of code, shipped a lot of code, and lived through enough "simple changes" to know that simple rarely means easy.

And somehow, these were the hardest PRs I've ever had to work to get merged.

Even with AI.

## AI Makes You Faster. It Does Not Lower the Bar.

This is the part I keep coming back to.

AI helped me move faster. It helped me explore the codebase, draft patches, iterate on tests, and respond to review feedback more quickly than I could have alone.

But the hard part was never just typing the code.

The hard part was judgment.

Does the change actually belong?

Does it preserve existing behavior?

Does it fit the architecture?

Does it handle the boring edge cases?

Does it make the product better for real users without creating maintenance debt for the people who have to live with it after you disappear?

In a serious open source project, velocity is useful, but velocity is not enough. The code still has to be right. The tests still have to earn trust. The implementation still has to match the shape of the project.

AI can increase your output. It cannot remove the responsibility to think.

## The Bar Was High Because the Project Is Good

OpenClaw is large, fast-moving, and maintained by people with very high standards.

That is exactly how it should be.

Healthy open source projects do not stay healthy by accepting every plausible patch. They stay healthy because maintainers protect the product. They ask whether a change is correct, whether it is general enough, whether it introduces weird coupling, whether it creates future surprises, and whether it improves the system in a way that justifies the complexity.

When you are on the contributor side, that can feel brutal.

When you step back, it is also the reason the project is worth contributing to.

A low bar feels nice in the moment. A high bar makes you better.

## My Edge: I Actually Live in the Weird Part

The reason I had anything useful to contribute was not that I sat down and decided to become an OpenClaw contributor.

It was that I use OpenClaw heavily through Slack.

That matters.

Slack is not a toy integration. Slack has threads, mentions, channel names, channel IDs, App Home behavior, command routing, formatting quirks, permission edges, and all the delightful chaos that shows up when real work happens in real conversations.

If you only read the code, some of those edges are invisible.

If you live inside the product every day, they become paper cuts.

Eventually, the paper cuts become clues.

One PR came from Slack channel read behavior around name-allowlisted channels and channel IDs. Another came from App Home command configuration not matching how the active command surface was supposed to work.

Neither one sounds glamorous.

Both matter if Slack is where you actually use the product.

That is the underrated path into open source:

Use something deeply enough that you can see the mismatch between how it is supposed to work and how it behaves in the wild.

Then fix one edge.

Then another.

## Small Fixes Are Not Small Work

One of the humbling things about these PRs is that the end result was not some huge, cinematic feature.

They were fixes.

But good fixes in a mature project are not just "change the line that looks wrong."

A good fix has to understand the surrounding contract. It has to avoid breaking other users. It has to be tested at the right layer. It has to be phrased in the project's language. It has to survive maintainers asking, implicitly or explicitly, "Are you sure?"

That process forces clarity.

You discover which assumptions were yours and which ones were actually true.

You discover whether you understand the project or merely understand the symptom.

You discover that the difference between "works for me" and "belongs in main" is enormous.

## The Real Lesson

I have shipped bigger features.

I have written more complex systems.

I have had code run in products with more users.

But I do not think I have ever felt prouder of an open source contribution.

Not because the diff was the biggest.

Because the bar was the highest.

That is the part that made it meaningful.

Getting through that review process made me a better engineer. It reminded me that even in the AI era, maybe especially in the AI era, craft still matters. Taste still matters. Judgment still matters. Respect for the maintainers still matters.

And if you want to contribute to open source, my advice is simple:

Do not start by looking for a heroic project.

Start by using something until you understand where it hurts.

Then fix the hurt.

Carefully.

Huge respect to Pete and the OpenClaw maintainers. The bar is brutal in the best possible way.

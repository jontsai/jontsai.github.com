---
layout: post
title: "Ubuntu'd out"
description: "A Ubuntu-only setup"
tagline: "add partitions boot swap home"
category: 
tags: [setup, ubuntu]
---
{% include JB/setup %}

Last night, I made the best decision of my computing life, ever.

<h3>Old Setup:</h3>
- Two desktop machines under my desk, two 24" LCD monitors, controlled by one keyboard and mouse via [Synergy](http://synergy-foss.org/)
- Main computer was Windows XP 32-bit Core2 Quad 8200 4GB RAM (2.8GB usable after OS and video card reserved)

  - Primary uses were general browsing, word processing, gaming (Starcraft 2, WoW, Diablo 3), organizing and uploading photos (Picasa + Flickr), IE-only testing, some    coding

- Secondary computer was Ubuntu 12.04 64-bit Core2 Quad 6600 6GB RAM

  - Ran 4 Ubuntu VMs in VirtualBox for various development and ghetto dynamic DNS hosting during the days before I rented my current [VPS from Linode](http://www.linode.com/?r=65762fd9ef89c62a08eddbb4c641c9b9a5415ba9)

- MacBook Air that I would use when working outside of my home office or lounging in the living room

<h3>Transition to New Setup:</h3>
- Transferred the VMs onto my main computer--turns out that I really only need 2 of the 4.

  -  The problem I had before was that the Core2 Quad 8200 doesn't have Virtualization Technology enabled, so it can't emulate 64-bit VMs even if the host machine is 64-bit, so I had to run it on the Core2 Quad 6600. Now, I only need 2 32-bit VMs that will run fine on the C2Q 8200.

- Decommissioned the Ubuntu 12.04 64-bit, pulled out 2x2GB and stuck it in the main computer for 8GB RAM total
- Install Ubuntu 12.04 LTS 64-bit on the main computer, can still dual-boot into Windows if I want to
- Connect MacBook Air with USB hub and video dongle to secondary monitor

<h3>Thoughts So Far:</h3>
It feels good. It feels REALLY good.

Since I've been using Ubuntu for over 6 years now, it feels really comfortable. In the past, I had run Ubuntu exclusively on several machines, including netbooks like Dell Inspiron Mini 9 and Samsung Series 5 Chromebook.

<h4>All Pros, No Cons So Far:</h4>

- Lots of good FOSS replacements for Windows-only software, like [VALO-CD](http://www.valo-cd.net/) replacing a bunch of stuff and [Frogr](http://code.google.com/p/frogr/) replacing Flickr
- I already feel a productivity increase since the terminal is right there
- Removed temptation to waste time playing games.

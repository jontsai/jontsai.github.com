---
layout: post
title: "Dropbox on NTFS Mount in Ubuntu"
description: ""
tagline: "cat /etc/fstab"
category: 
tags: [howto, ubuntu, dropbox, ntfs]
---
{% include JB/setup %}

After I switched to Ubuntu as my primary OS (dual-boot alongside Windows XP), I had a problem syncing some Dropbox files to an NTFS mount.

While some files synced without much trouble, the Dropbox icon would consistently be spinning and several files and folders would not sync.

I got around to searching for the issue today "dropbox ntfs ubuntu" and found this [helpful blog post](http://blog.vnox.de/2010/12/ubuntu-linux-with-dropbox-on-an-ntfs-drive/) that answered my problems.

tl;dr; -- the fix was to simply add `uid=1000` to the `/etc/fstab` entry for the NTFS mount, because Dropbox, running as your user, tries to change permissions on the file (owned by root in the absence of the `uid=1000` option).

Don't have Dropbox yet? Why not use my [referral link](http://db.tt/KfzTgNs) to sign up to get a free bonus and start off with 2.25GB? Dropbox is one of the best cloud-based file-sync programs for the average user, allowing access from Windows, Linux, Mac OSX, iOS, and Android!
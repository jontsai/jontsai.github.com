---
layout: post
title: "Upgrading to Ubuntu 14.04.1 LTS"
description: ""
category: ""
tags: [Ubuntu, Ubuntu 12.04, Ubuntu 14.04, LTS, Apache, PHP]
---
{% include JB/setup %}

**tl;dr;** When upgarding from Ubuntu 12.04 to 14.04 LTS, the Apache also gets upgraded from 2.2 to 2.4. There are lots of backwards incompatible changes.

I just spent the last 3 hours fixing my server after impulsively upgrading to Ubuntu 14.04.1 LTS from Ubuntu 12.04.

Well, not exactly *that* impulsively. I had seen this pestering MOTD-style message upon login for weeks now, and I figured that since 14.04.1 is a point release nearly 6 months after the initial release, it should be relatively issue-free.

I had already done 3 upgrades from 12.04 LTS to 14.04 LTS... on desktops. Two had gone successfully, and one on my parents' computer unfortunately messed up pretty badly in the middle so that some of the ubuntu-desktop stuff is just not working properly, but I digress.

I figured that since it was a Friday night in addition to the above--"What the heck, why not?"--and dove right in. The OS upgrade was pretty much issue free. I let out a sigh of relief.

And then my luck ran out. All of my websites didn't load. Read: **Nothing worked**. I started getting Pingdom pages and Nagios alerts non-stop.

Thankfully, the Internet is a great resource and I was able to identify the problem pretty quickly. Applying the fix is what took most of the time.

Most useful of all the resources that I came across was [Upgrading Apache 2.2 to 2.4](http://httpd.apache.org/docs/2.4/upgrading.html). I'd recommend reading through it thoroughly if you're going through the upgrade yourself, but here are some highlights:

* Don't be alarmed if all you're seeing for any of your websites is just the contents of `/var/www/` or `/var/www/html`
* All separate virtual host (`VirtualHost`) files and configurations need to end in `*.conf` due to the command in `/etc/apache2/apache2.conf`
  `IncludeOptional sites-enabled/*.conf`
* It still wasn't pulling in my VirtualHost 
* Got rid of `NameVirtualHost *:80` as the first line in all of my VirtualHost config files. It wasn't necessary. Good riddance.
* `Directory` permissions now need to be explicitly granted. `Require all granted` (the old style was `Order Deny, Allow; Allow from all`)
* I noticed that my websites were loading slowly, so needed to set `EnableSendfile On` in the main config file (`apache2.conf`)
* For my [Django](https://www.djangoproject.com/) sites, I needed to change the `Directory` permissions for the static files directory
* For my custom [WordPress](https://wordpress.org/) sites, I needed to set the `Directory` permissions for the `DocumentRoot` as well as explicitly set `AllowOverride all` to allow picking up the `.htaccess`
* `/etc/php5/apache2/php.ini` has `short_open_tag` disabled. I decided to leave it off and change my limited number of PHP applications that were using [short open tags](http://php.net/manual/en/ini.core.php#ini.short-open-tag), because it's better practice.
  

Other helpful resources:

* <https://wiki.ubuntu.com/TrustyTahr/ReleaseNotes>
* <http://www.spotch.com/wp/?p=28>
* <http://kb.openstudioproject.com/content/webstuff/apache-virtual-hosts-not-working-after-upgrading-ubuntu-1204-1404>

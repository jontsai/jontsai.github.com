---
layout: post
title: "Apache on OSX 10.8 Mountain Lion"
description: ""
tagline: "sudo httpd restart"
category:
tags: [howto, mac, apache]
---
{% include JB/setup %}

I upgraded to Mountain Lion (10.8.x) from Lion (10.7.x) a few months ago, and only discovered today that Apache wasn't working--going to http://localhost showed the default "It works!" page.

A quick search for "apache mountain lion" found this helpful guide:
[AMP Guide for Mac OSX 10.8](http://www.coolestguyplanettech.com/downtown/install-and-configure-apache-mysql-php-and-phpmyadmin-osx-108-mountain-lion).

tl;dr; for those who know what they are doing:

* There is no longer a Web Sharing section in System Preferences > Sharing.
* Use `sudo httpd start|stop|restart` to control the Apache process
* Main configuration file: `/etc/apache2/httpd.conf`
* Default `DocumentRoot` is `/Library/WebServer/Documents`
* Enable PHP by uncommenting the PHP module include in `httpd.conf`
* User configuration file: create one at `etc/apache2/users/YOURUSERNAME.conf`

Sample user conf contents:

    <Directory "/Users/YOURUSERNAME/Sites/">
    Options Indexes MultiViews FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
    </Directory>

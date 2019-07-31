---
layout: post
title: "Debugging Address already in use errors"
description: ""
category: "programming"
tags: [Vagrant, VM, Mac, networking, debugging]
---
{% include JB/setup %}

All too frequent an occurrence in the development lifecycle is doing some work, closing up your laptop/suspending the machine, and coming back to your work hours or days later.

As you try to start up the local webserver or API server, you get cryptic error messages like the following:

- `Address already in use`
- `Another process is already listening on port`
- `Port xyzw is currently used by another application`
- `OSError: [Errno 98] Address already in use`
- `self.socket.bind(self.server_address)` blah blah blah blah

And after checking all of your open terminal windows, that you have not in fact any running or killable-processes...

At this point, the <strike>n00b</strike> naive way to fix this problem is to simply restart your entire machine. To be fair, this technique works almost all of the time, but kills productivity, and forces you to save work-in-progress that's not at a good stopping point, or worse, accidentally restart without saving your progress.

But, there is a better way.

Let me introduce you to a command:

    `netstat -tulpn`

This command will print out the bound network ports on your machine, and which processes and process ids are running them. To free up the port to be used by your development server once again, simply `kill PID`, where `PID` is the process ID.

Now, how to remember this command? I haven't figured that out yet, nor have I thought of an alias I want to save it to, that is just as memorable. The arguments *almost* spell out "tulip"--like the flower, except missing the `i`, and you just add an `n` to it. Maybe a mnemonic like, *"If you fix your network address port in use issue, you will smell the essence of n tulips"*?

Whatever you do, `netstat -tulpn` is now a friend and welcome companion in my software toolbox.

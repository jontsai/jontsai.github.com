---
layout: post
title: "IntelliJ ProTips™: Start the IntelliJ JVM process with additional memory"
description: "Assorted tips and tricks for IntelliJ"
category: "software engineering"
tags: [IntelliJ,software engineering,IDEs,Java,Scala]
---
{% include JB/setup %}

Assorted tips and tricks for IntelliJ

## Start the IntelliJ JVM process with additional memory

1. **Open the application once, normally, after a new install before editing this file**.  
   a. Otherwise, the signatures won't match and the OS will think that the package has been tampered with, and security settings will prevent launching of the application. You will then have to delete the entire application and reinstall it.

2. Quit IntelliJ (Cmd+Q)

3. Edit `/Applications/IntelliJ IDEA.app/Contents/bin/idea.vmoptions`  
   a. `emacs "/Applications/IntelliJ IDEA.app/Contents/bin/idea.vmoptions"`  
       or  
       `vi "/Applications/IntelliJ IDEA.app/Contents/bin/idea.vmoptions"`

4. Increase the following settings from their defaults (note: only works if your machine has sufficient RAM):  
   a. `-Xms2048m`  
   b. `-Xmx4096m`  
   c. `-XX:ReservedCodeCacheSize=1024m`

5. Start up and enjoy your upgraded IntelliJ on steroids.

6. **Note**: These steps must be repeated after every upgrade.

Other options listed here: <http://tomaszdziurko.pl/2015/11/1-and-the-only-one-to-customize-intellij-idea-memory-settings/>

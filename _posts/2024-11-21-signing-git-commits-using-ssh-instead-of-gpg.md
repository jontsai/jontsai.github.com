---
layout: post
title: "Signing Git commits using SSH instead of GPG"
description: ""
category: "programming"
tags: [ssh,git,security,TIL]
---
{% include JB/setup %}

TIL you can sign Git commits using SSH instead of GPG

This tip is 🏆, learned from my [really smart colleague](http://jasonbot.com/).

**tl;dr;**

**To configure Git to use your key:**
1. Configure Git to use SSH for commit signing:  
   `git config --global gpg.format ssh`
2. Specify which public SSH key to use as the signing key and change the
   filename (`~/.ssh/examplekey.pub`) to the location of your key. The
   filename might differ, depending on how you generated your key:  
   `git config --global user.signingkey ~/.ssh/examplekey.pub`

**To sign a commit:**
1. Use the `-S` flag when signing your commits:  
   `git commit -S -m "My commit msg"`
2. Optional. If you don’t want to type the `-S` flag every time you commit,
   tell Git to sign your commits automatically:  
   `git config --global commit.gpgsign true`

Source: <https://docs.gitlab.com/ee/user/project/repository/signed_commits/ssh.html>

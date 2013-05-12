---
layout: post
title: "Pinterest wasn't hacked"
description: ""
category: "security"
tags: [Pinterest, AWS, EC2, Elastic IP]
---
{% include JB/setup %}

<a href="http://cheezburger.com/7452815872" target="_blank"><img src="http://i.chzbgr.com/maxW500/7452815872/h494891E7/" alt="Dear Internet, I'm sorry. Plz 4give me? kthxbye" /></a>

Seriously though, I messed up in my [previous blog post](/2013/05/11/aws-ec2-security-vulnerability-and-pinterest-hacked/). Pinterest wasn't hacked, and I'm sorry that I jumped to conclusions when I actually stumbled upon a spammer's C&C. I still feel that the actions I took at the time were correct according to the knowledge that I had, but based on what I know now, I would have approached it different (contacted Pinterest first, now that I actually have their contact info, before writing a blog post).

Thankfully, [Jon Jenkins](https://twitter.com/jonjenk) from Pinterest did contact me:

> Hi Jon,
> 
> I lead the engineering team at Pinterest.  I saw your blog post you wrote about Pinterest security.
> 
> <http://www.jontsai.com/2013/05/11/aws-ec2-security-vulnerability-and-pinterest-hacked/>
> 
> For the record the site you found is not one that is associated with Pinterest in any way.
> 
> It appears that you most likely found a command interface for a Pinterest spam net.  We have systems that detect and mitigate the impact of these spam nets.  It would be convenient if you could pass along the addresses and passwords you obtained so that we can validate our spam detection systems are picking up these accounts.
> 
> Thanks,
> 
> Jon Jenkins

And my response:

> Hi Jon,
>
> Thanks for reaching out to me. I later realized based on the discussions and Hacker News comments that this wasn't Pinterest (although, there was still a small possibility that it was an internal tool written by a small team within Pinterest, or by an individual employee for a Hack Day contest, etc). I'm sorry for jumping to conclusions and accusing Pinterest of security vulnerabilities, but I had thought that just as if my friend felt he was having a heart attack, I would call 911 first and then wait for diagnosis later, rather than let the window of urgency elapse.  I'm planning on writing a follow-up blog post on that matter.
>
> Anyway, regarding the collected addresses and passwords, I forwarded them to <engineering@pinterest.com>, not sure if that was the correct email address or you picked it up. I just forwarded it to you again.
>
> The majority of the spam accounts came from 3 domains, <i>omitted</i>, although there were two accounts that weren't from those domains (<i>omitted</i>)
>
> Also, not sure if it would be worth your time and effort, but maybe Pinterest could issue a subpoena to AWS for the information of the accounts/human users behind that spam net, or simply work with the Spam/Abuse teams at AWS to make sure these guys get shut down. Building systems to detect and prevent spam is a never ending cat and mouse chase, but if we could shut down some of the human elements, that might stir a greater effect?
>
> The original discovery happened in the window of about 30 minutes to an hour before I posted this tweet:
>
> <http://twitter.com/jontsai/status/333090050231373825>
>
> The Elastic IP address of the C&C during that window:
>
> ec2-<i>omitted</i>.compute-<i>omitted</i>.amazonaws.com

> Thanks,

> jontsai

To everyone who made comments (constructive and otherwise) on the [original post](/2013/05/11/aws-ec2-security-vulnerability-and-pinterest-hacked/) and on [Hacker News](https://news.ycombinator.com/item?id=5689821), thanks. To the critics and the snide commenters, thanks for making me laugh at my own mistakes. I'm interested in learning about what others would have done differently if they were in my situation. Should I have spent more time collecting data about the spam C&C? What kinds of data?

What kinds of action can be taken against spammers like these? Is it worth having lawyers issues cease & decist letters and takedowns to the owners of those domains, knowing they can just as easily pop up in more places?

I certainly don't have the time and resources to proactively fight against spammers, but I was hoping that Pinterest and AWS does. Also, this was a good reminder (similar to things I've heard in a security talk a few years ago by [Billy Rios](http://xs-sniper.com/blog/)) that all the spammers and malicious hackers out there are just regular programmers like you and me. They aren't necessarily super geniuses, they use pretty much the same languages and tools we do, and as all humans do, they make mistakes (like letting anyone with the IP address access the C&C).

It would also be interesting to see Amazon improve the way they are currently giving out Elastic IPs. AWS probably shouldn't reassign recently released Elastic IP addresses and delay recycling for as long as possible, like how telecom companies don't reassign discarded phone numbers until 3-6 months afterward. They could use an LRU list for assigning Elastic IPs out of regions--unless Elastic IPs really are that scarce a resource in high demand that even an LRU implementation would cause an Elastic IP to effectively get reassigned right away?

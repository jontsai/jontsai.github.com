---
layout: post
title: "How to Clone a Car"
description: "Google Maps Street View car creates a clone"
tagline: "clones = streetview_car.camera.capture()"
category: technology
tags: [Google Maps, Street View, cars, Sunnyvale, illusions]
---
{% include JB/setup %}

Today, I was looking up biking directions to my [new office](http://plugandplaytechcenter.com/). I wanted to take VTA Express from Fremont to Sunnyvale, and then bike the rest of the way.

So, I looked up biking directions on Google Maps, and, to have a better idea of the actual road conditions, [looked at street view](https://maps.google.com/maps?saddr=E+Java+Dr&daddr=37.4023654,-122.0106744+to:440+N+Wolfe+Rd,+Sunnyvale,+CA+94085&hl=en&ll=37.409778,-122.010641&spn=0.046292,0.092268&sll=37.39696,-121.997166&sspn=0.0463,0.092268&geocode=FZvXOgIdija6-A%3BFf22OgIdzkO6-CkPdCCSy7ePgDGG9szsfm79Ow%3BFXJwOgIdVTy6-Clr8jgqObaPgDH-M1x8dinBkg&dirflg=b&mra=ltm&t=h&z=14&layer=c&cbll=37.409867,-122.011946&panoid=bZOQBjyq7oJt34KWO7iN2w&cbp=12,99.89,,0,3.34&via=1). That's when I noticed something interesting--all the cars on the road look the same!

## Am I seeing multiples?
<a href="http://www.flickr.com/photos/jontsai8601/8411654161/" title="Car Clones by jontsai8601, on Flickr"><img src="http://farm9.staticflickr.com/8078/8411654161_4bfb87f11e.jpg" width="500" height="313" alt="Car Clones"></a>

<a href="http://www.flickr.com/photos/jontsai8601/8412752370/" title="Car Clones by jontsai8601, on Flickr"><img src="http://farm9.staticflickr.com/8081/8412752370_57bfc44087.jpg" width="500" height="313" alt="Car Clones"></a>

The Google Streetview car was slightly ahead and to the right of the car in the picture driving down Java Drive, and therefore, that same car was pictured in every frame of map tiles along that stretch of road.

What appears to be an optical illusion is... an optical illusion created by stitching together several separate frames together.

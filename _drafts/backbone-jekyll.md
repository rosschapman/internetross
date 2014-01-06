---
layout: post
title:  "Jekyll sunk your Backbone ship"
categories: [backbonejs, jekyll]
---

If you're one of the five web developers or recruiters who have looked at my website in the past couple months, you're undoubtedly noticing the look and feel of this thing is different.

That's because I just totally migrated my website from WordPress and Backbone.js to Jekyll.  

## v1.0.0: Bone of Back
After leaving Zendesk behind in September, I also decided to leave behind a 5-year history of WordPress consulting and development and learn THE FUTURE OF THE WEB.  Most companies needing front-enders wanted experience with JavaScript MV-style/-patterned frameworks like Backbone.js, AngularJS, or Ember - JavaScript is really soaring wowwey! - so I decided to learn one of those.

The week before an interview I spirited through [@addyosmani's](http://twitter.com/addyosmani) [book](http://addyosmani.github.io/backbone-fundamentals/) and rebuilt my website using an API first approach, leveraging Backbone.js to fetch blogs from [WordPress.com's](http://developer.wordpress.com/docs/api/) JSON API.  I'm not sure I had even digested the concept of MV* entirely before launching the redesign - partly because, as one will find, Backbone.js itself [defies](http://lostechies.com/derickbailey/2011/12/23/backbone-js-is-not-an-mvc-framework/) easy classification into an MV-family. But it was an invaluable exercise to think about a web experience different from WordPress' event-driven architecture - which in many ways, was all I really knew. 

While this experiment was successful, I wasn't really building an app. The "sans-reload" UI was nice, but SEO was totally sacrificed. Also, my website, at its most glorious, wouldn't be much more than a text blog, so   
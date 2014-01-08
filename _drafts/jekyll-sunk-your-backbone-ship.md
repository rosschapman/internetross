---
layout: post
title:  "Jekyll sunk your Backbone ship"
categories: [backbonejs, jekyll]
---

If you're one of the five web developers or recruiters who have looked at my website in the past couple months, you're undoubtedly noticing the look and feel of this thing is different.

That's because I just totally migrated my website from WordPress and Backbone.js to Jekyll.  The design, which some colleagues told me was "pretty good", was sacrificed - for now - while I get the architecture figured out and actually do some writing. 

## v1.0.0: Bone of Back
After leaving Zendesk behind in September, I also decided to leave behind a 5-year history of WordPress consulting and development and learn new stuff.  Most companies needing front-enders wanted experience with JavaScript MV-style/-patterned frameworks like Backbone.js, AngularJS, or Ember - JavaScript is really soaring wowwey! - so I decided to learn one of those.

The week before an interview I spirited through [@addyosmani's](http://twitter.com/addyosmani) [book](http://addyosmani.github.io/backbone-fundamentals/) and rebuilt my website using what might be called an "API first" approach, leveraging Backbone.js to fetch my blog datas from WordPress.com's [JSON API](http://developer.wordpress.com/docs/api/), and then old friends HTML and CSS to help browsers render the payload.  Having jumped in the deep end, I'm not sure I had even digested the concept of MV* entirely before launching the redesign - partly because, as one will find, Backbone.js itself [defies](http://lostechies.com/derickbailey/2011/12/23/backbone-js-is-not-an-mvc-framework/) easy classification into an MV-family. But it was an invaluable exercise to practice a build that relied solely on the emerging stars of web tech (HTML/CSS/JavaScript) with a  framework designed to communicate with JSON APIs.  AND, of course, the greatest benefit of all of a site with no sides of server, I could deploy my site easily to Github pages - which is cool because people can look at your code.  

While this experiment was successful, I wasn't really interested in dazzling my "users" with a single page app. The "sans-reload" UI was nice, but at the most I needed a website that could display some text and images in a weblog - like a Typepad thingy. Also, SEO is completely sacrificed with a JavaScript framework (I know, I know, there are ways around it).  But I wouldn't want to deprive my 5 or so fans - well, my mom at least - from discovering me on the web while searching for my name or "random front-end developers who blog about shit everyone knows already."

## v2.0.0:
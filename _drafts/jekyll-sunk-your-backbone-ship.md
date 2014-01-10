---
layout: post
title:  "Jekyll sunk your Backbone ship"
categories: [backbonejs, jekyll]
---

If you're one of the five web developers or recruiters who have looked at my website in the past couple months, you're undoubtedly noticing a new look and feel.

That's because I just migrated my website to Jekyll, a static-site generator built on ruby.  In the short term, the old site design, which some colleagues told me was "pretty good", was sacrificed.  In the meantime, my beautiful prose will have to dazzle you.

So how did we get here?

## v1.0.0: Bone of Back
After leaving Zendesk behind in September, I found most companies hiring front-enders were looking for experience with JavaScript MV-style/-patterned frameworks like Backbone.js, AngularJS, or Ember. So I decided to learn some of that new hot shit, and built a website.  Since my own website languished neglected for a few years, I would rebuild my own website.

The week before an interview with a hot, new, venture-backed startup out of a high-rise in downtown SF, I spirited through [@addyosmani's](http://twitter.com/addyosmani) Backbone.js [book](http://addyosmani.github.io/backbone-fundamentals/) and rebuilt my website using what might be called an "API first" approach: a mini-JavaScript app leveraged Backbone.js to fetch my blog datas from WordPress.com's [JSON API](http://developer.wordpress.com/docs/api/), and then old friends HTML and CSS helped browsers rendered the payload.  

Talk about dazzling.  In about 3 days I had a modern ajax-y single page app for a portfolio site - complete with a loading gif and picture of myself [touching my face] inside a circle. Web 2.0 certified.  

Having been building WordPress sites for like five years it was really refreshing to work with HTML decoupled from server logic.  Refreshing, in large part, because I didn't have to context-switch between PHP and JavaScript any longer, which is a bitch for remembering the right string methods.  And above all, because the site logic was completely client-side, I could easily deploy my site using Github Pages.  I love Github Pages.  Even having worked for a web host  

While this experiment was successful, I wasn't really interested in dazzling my "users" with a single page app. The sans-reload UI was silky, but at the most I needed a website that could display some text and images in a simple weblog. Backbone was a bit overkill. Also, SEO is completely sacrificed with a JavaScript framework (I know, I know, there are ways around it).  But I wouldn't want to deprive my 5 or so fans - well, my mom at least - from discovering me on the web while searching my name or "random front-end developers who blog about shit everyone knows already."

## v2.0.0:
Enter Jekyll.

Jekyll was an obvious choice for a couple reasons.  First, Github Pages uses Jekyll [already](https://help.github.com/articles/using-jekyll-with-pages), so they understand how to server static sites that Jekyll compiles. Second, its built with ruby, and I am learning that.

As a side note, it's been a pleasure writing in Markdown. It's no wonder that projects like [Ghost](https://ghost.org/) are making an big splash. Even WordPress.com just [released](http://en.blog.wordpress.com/2013/11/19/markdown/) native Markdown support.  



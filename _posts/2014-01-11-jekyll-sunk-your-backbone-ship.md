---
layout: post
title:  "Jekyll sunk your Backbone ship"
categories: [backbonejs, jekyll]
---

If you're one of the five web developers or recruiters who have looked at my website in the past couple months, you're undoubtedly noticing a new look and feel.

That's because I just migrated my website to [Jekyll](http://jekyllrb.com/), a static-site generator built on ruby.  In the short term, the old site design, which some colleagues told me was "pretty good", was sacrificed.  In the meantime, my beautiful prose will have to dazzle you.

So how did we get here?

## Bone of Back
After leaving Zendesk behind in September, I found most companies hiring front-enders were looking for experience with JavaScript MV-patterned frameworks like [Backbone.js](http://backbonejs.org), [AngularJS](http://angularjs.org), or [Ember](http://emberjs.com). So I decided to learn some of that new cool by building a website, on it.  Since my own website was languishing in obscurity and neglect for the past few years, I would rebuild my own website, on it.

The week before an interview with a venture-backed startup equally as hot and [surgepricey](/glossary#surgepricey) as JavaScript, I spirited through [@addyosmani's](http://twitter.com/addyosmani) Backbone.js [book](http://addyosmani.github.io/backbone-fundamentals/) and rebuilt my website using what some are calling an "API first" approach: my blog datas were fetched, parsed, and rendered in the DOM entirely by a database-unawares mini Backbone app that talked to WordPress.com's [JSON API](http://developer.wordpress.com/docs/api/).

Talk about dazzling.  In about 3 days I had a modern ajax-y single page app for a portfolio site - complete with a loading gif and picture of myself [touching my face](http://dttf.tumblr.com/) inside a circle. Silicon-valley certified. You can actually see it in cryo-stasis [here](/backbone-it-up/).

Having been building WordPress sites for like five years, it was refreshing to be free of context-switching between PHP and JavaScript. Which is a particular bitch when remembering string methods.  But the real Mentos freshness was having all the site logic **completely** client-side, so I could deploy the thing on [Github Pages](http://pages.github.com/).

I love Github Pages. It is THE best web host I've ever used and the easiest way to publish a static website I can think of. My most recent "oh that'd be cool" moment was when I realized marketers could be abusing the crap out of Github Pages for landing page testing. Seriously, nerd cred to non-devs who publish a web page on Github. 

Anywho, while my Backbone experiment was successful, the architecture was a bit overkill for my needs. The [SPA](/glossary#spa) sans-reload UI was silky, but I didn't really need a framework with models and routing to handle some basic strings and markup. Also, SEO is completely sacrificed with a front-end JavaScript framework (I know, I know, there are hacky-crawly ways around it).  But I wouldn't want to deprive my next five fans from discovering me on the web searching for "random front-end developers who blog about shit everyone knows already" - do you get the joke (hint: meta)? And, well, what if mom couldn't find my website when she googled my name?  Fool me once, shame on you.  Fool me, you can't get fooled again.

## Enter Jekyll

Jekyll was an obvious choice for a couple reasons.  First, Github Pages uses Jekyll [already](https://help.github.com/articles/using-jekyll-with-pages), so they understand how to serve static pages that Jekyll compiles, and I wouldn't have to consider another hosting solution. Second, its built with ruby, and I am learning [that](http://www.codecademy.com/users/pyRockstar96979/achievements).

Switching to Jekyll also forces you to write Markdown.  Oh, Marcus Aurelius de mi corazon. Why did I ever fear your gentle brace? Markdown is really easy to pick up - there's like four syntax things to know and its entirely <tag> free.  It's perfect for internet writing - you can hyperlink and create typographic hierarchy with braces and pounds. It's really no wonder WordPress.com just [released](http://en.blog.wordpress.com/2013/11/19/markdown/) native Markdown support and other web authoring tools like [Ghost](http://ghost.org) are going full Markdown from the get-go.

Speaking of Ghost, I near-copied the interface on my desktop by putting iA Writer and Chrome side by side:

![Ghost.org lookalike](/assets/images/kinda-like-ghost.png)
![Ghost.org screenshot](http://cdn.arstechnica.net/wp-content/uploads/2013/10/Screenshot-3.jpg)

With the combo-punch of the [Guard](https://github.com/guard/guard) and [Guard-Livereload](https://github.com/guard/guard-livereload) gems I get instant refreshes in Chrome on save. I call it "OSX Mavericks CMS". 

There's not a ton more to say about this website for now.  I'll be boosting readability and general delight in the near future, which probably won't even deserve [Dribbbling](http://dribbble.com/internetross).  Quarterly report on delight metrics forthcoming. Synergy.  Generally, I hope - I want! - your eyeballs and mind grapes to find less corn syrup and more protein on these pages.  It's going to continue being/becoming honest, humble ruminations on code and UX and being a web professional for startups - which really just means young companies? - in Silicon Valley/Alley and the search for lost personhood in the matrix.  K, talk soon.
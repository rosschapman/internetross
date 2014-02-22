---
layout: post
title:  "Writing javascript for, like, an app and not just your friend's yoga site."
categories: [javascript, jquery]
---

(In part 1 of what will probably be a zillion part series lasting the rest of my days as a javascript developer, this post offers a few initial learnings from writing JavaScript for a web app.)

## jQuery plugins are good at _information hiding_

This week I wrote my first jQuery plugin.  Which was bound to happen after a couple weeks of reading about JavaScript design patterns.  One day you start skimming Addy Osmani's [Learning Javascript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/) and then you scroll back to the beginning for a deeper dive and soon, as surface tension builds on the brûlée, you begin to realize you know many of these patterns already (which Addy is literally explaining) and then starbursts release from fractures as cream covers your brain grapes.  

The following 

And particularly how the jQuery plugin pattern is well-equipped to realize protective strategies like:    
* Decoupling your logic from the DOM    
* Hiding difficult logic that your team shouldn't have to look (until it needs to change)

Consider these two examples:


vs

```javascript
<% content_for :javascript do %>
  $('form').myUploaderPlugin();
  $('.modal').myModalPlugin();
<% end %> 
```

I'd be curious to hear any debate on this, but to me the winning pattern is the second example.  While both are good examples of hiding logic, the second example 

## jQuery plugin pattern for modular javascript
## Named functions
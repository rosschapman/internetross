---
layout: post
title:  "Things I learned this week"
categories:
---

# RoR


# jQuery

**asdf**    
I honestly think I've never used jQuery's .prop() method before.  Not sure why, just haven't.  But this week I messing with form buttons in [our](http://www.scienceexchange.com) app and I discovered a couple of RoR's template form tag helpers: `disable_with: 'Please wait...', disabled: true,`.  And I continued reading the magical scroll...  

These helpers are hooked to Rails' "unobtrusive javascript adapter", [jquery-ujs](http://github.com/rails/jquery-ujs), which automatically change the button text on click.  Thanks Rails?

Right, so what if I didn't want to do buttons the rails way but say, a javascripty way.  In that moment I had some daydream about a jQuery method for disabling attributes.  So I googled for it, of course to be familiarly greeted in the results by .attr() (duh), but also .prop().  

So if you want to know what's currently inside the text-box, read the property. If you, however, want to know what the initial value of the text-box was, read the attribute.
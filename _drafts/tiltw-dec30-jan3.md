---
layout: post
title:  "TILTW: Dec 30-Jan3"
categories: tiltw ror jquery
---

# RoR
## Forms 
I'm staring at this form button...then I click it and the text changes from "Save" to "Please wait..."  With some digging I discover that Rails does some special stuff with attributes declared on form tags:

{% highlight ruby %}
<%= form.submit 'Save', disable_with: 'Please wait...', disabled: true, class: 'button' %>
{% endhighlight %}

Some of these attributes, such as `disabled: true', hook to an [“unobtrusive scripting adapter for jQuery”](http://github.com/rails/jquery-ujs/). that provides some nifty ways of handling form UI as well as easy scripting of the form methods and ajax.  Neato gang!

## When do I have to restart this server?
Coming from WordPress, it will 
http://stackoverflow.com/questions/17729345/when-do-i-need-to-restart-server-in-rails/17729618#17729618

# jQuery

## prop vs attr
I honestly think I've never used jQuery's .prop() method before.  Not sure why, just haven't.  But this week I was messing with form buttons in an [app](http://www.scienceexchange.com) and I discovered a couple of RoR's template form tag helpers: `disable_with: 'Please wait...', disabled: true,`.  And I continued reading the magical scroll...

These helpers are hooked to Rails' "unobtrusive javascript adapter", [jquery-ujs](http://github.com/rails/jquery-ujs), which automatically change the button text on click. So opinionated!

Right, so what if I didn't want to do buttons the rails way but, say, my own javascripty way.  In that moment I had some daydream about a jQuery method for disabling attributes.  So I googled for it, of course to be familiarly greeted instead in the results by .attr() (duh), but also .prop().

That's when I realized I wasn't totally clear about the difference between a DOM property vs an attribute, and which of these methods a coder would use to mess with the...aspects?..of button states.  jQuery is partially to blame, since up until v1.6 was released in May of 2011 - basically around the time I started writing more production jQuizzle - .attr() was the only method available to access properties or attributes.

One thing that helped clarify the difference was learning that:

> "When a DOM node is created for a given HTML element, a corresponding property is created for each attribute in the HTML source code." [*](http://stackoverflow.com/questions/6003819/properties-and-attributes-in-html)

Which explains why:

> "Where both a property and an attribute with the same name exists, usually updating one will update the other, but this is not the case for certain attributes of inputs, such as value and checked: for these attributes, the property always represents the current state while the attribute (except in old versions of IE) corresponds to the default value/checkedness of the input (reflected in the defaultValue / defaultChecked property)." [*](http://stackoverflow.com/questions/5874652/prop-vs-attr)

According to the above definitions, .prop() is better for checking the value of certain attribute whose value we expect to change after DOM load.  Certain attributes, like `value`, `checked`, and `disabled`, will retain their serialized HTML attribute!  Also, properties might be easier to work with because we don't necessarily have to anticipate different types. For example, an attribute value could be a boolean (disabled), an object (style), or an integer (size).

Admittedly, this is all a bit difficult to grasp because the words themselves are so similar in meaning outside the context of discussing HTML and the DOM.  "Attribute", "property", and "value" are practically interchangeable in English vernacular.
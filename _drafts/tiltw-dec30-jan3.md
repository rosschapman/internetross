---
layout: post
title:  "TILTW: Dec 30-Jan3"
categories: tiltw ror jquery
---

# RoR
## Forms 
I'm staring at this form button...then I click it and the text changes from "Save" to "Please wait..."  With some digging I discover that Rails offers an easy way to add scripted UI interactions to your forms by adding attributes in form tags.  Like so:

{% highlight ruby %}
<%= form.submit 'Save', disable_with: 'Please wait...', disabled: true, class: 'button' %>
{% endhighlight %}

Some of these attributes, such as `disabled: true', hook to a Rails Bread [“unobtrusive scripting adapter for jQuery”](http://github.com/rails/jquery-ujs/).  These adapters are a small library of jQuery scripts that handle various form UI, like a disabled state, and even data transportation methods.  You can specify transport method (POST, GET, DELETE, etc...) by simply adding a form tag in your html. Some call it magic.

# jQuery

## prop vs attr
I honestly think I've never used jQuery's .prop() method before.  Not sure why, just haven't.  But this week I was messing with form buttons in this cool [app](http://www.scienceexchange.com) and I found these form tag helpers which are kinda neat.  Right,  what I was describing above.

While jquery-ujs is handy, I wondered about how I would approach the problem.  In that moment I had some daydream about a jQuery method for disabling attributes.  So I googled for it, of course to be familiarly greeted in the top results by .attr() (duh), but also .prop().

That's when I realized I wasn't totally clear about the difference between a DOM property vs an attribute, and which of these jQuery methods a coder would choose to manipulate the behavior of button states.  jQuery is partially to blame, since up until v1.6 was released in May of 2011 - basically around the time I started writing more  <a class="term-name" href="/glossary#production">production</a> jQuizzle - .attr() was the only method available to access properties or attributes.

One thing that helped clarify the difference was learning that:

> "When a DOM node is created for a given HTML element, a corresponding property is created for each attribute in the HTML source code." [*](http://stackoverflow.com/questions/6003819/properties-and-attributes-in-html)

Which explains why:

> "Where both a property and an attribute with the same name exists, usually updating one will update the other, but this is not the case for certain attributes of inputs, such as value and checked: for these attributes, the property always represents the current state while the attribute (except in old versions of IE) corresponds to the default value/checkedness of the input (reflected in the defaultValue / defaultChecked property)." [*](http://stackoverflow.com/questions/5874652/prop-vs-attr)

According to the above definitions, .prop() is better for checking the value of particular attributes whose values we expect to change after DOM load.  For example, `value`, `checked`, and `disabled` will actually retain their serialized HTML attribute (value) after DOM load so retrieving their current value is not guaranteed by attr().  

Secondly, properties can be easier to work with because we don't necessarily have to anticipate different types. For example, an attribute value could be a boolean (disabled), an object (style), or an integer (size).

Admittedly, this is all a bit difficult to grasp (considering the words themselves are so similar in meaning: "attribute", "property", and "value" are practically interchangeable in English vernacular). But it's so important - and more and more I find it to be true - that a jQuery dev understand how far the $ obfuscates a pure view of HTML and the DOM.

I'm pretty new to technical writing. Would love to hear your [feedback](http://twitter.com/internetross)!
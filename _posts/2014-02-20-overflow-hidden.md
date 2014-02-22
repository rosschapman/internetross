---
layout: post
title:  "overflow: hidden explained, named functions for perf, and why radix is aight"
categories: [css, javsacript]
---

# Whoaverflow
99% of the time these days you won't need a clearfix hack to get a box to properly wrap floated child elements. Setting `overflow: hidden` on the containing box works in all relevant browsers (read: I8+ etc...).  Most of us have been using this technique, yes, but the other day I realized I couldn't explain in depth to a colleague _why_ it worked.  Like, why would setting a visibility-related property have side effects on the layout and block formatting context?

The "why" is a sort of bizarre tale, though a non too surprising entry in the analog of CSS development.  In a nutshell, a change was introduced into the CSS2.1 spec to address performance problems when floated elements intruded/intersected with nearby scrollable elements.  There's a wonderful and wonderfully thorough discussion of this on the [stacks-a-million](http://stackoverflow.com/questions/9943503/why-does-css2-1-define-overflow-values-other-than-visible-to-establish-a-new-b/11854515#11854515) so check that out.

So, `overflow: hidden`, or setting `overflow` to anything but `visible`,  creates a new BFC as a side-effect - though intentional - which in turn triggers an automatic recalculation of height.  Crazy times!  From the spec: 

> [In addition, if the element has any floating descendants whose bottom margin edge is below the element's bottom content edge, then the height is increased to include those edges. Only floats that participate in this block formatting context are taken into account, e.g., floats inside absolutely positioned descendants or other floats are not.](http://www.w3.org/TR/CSS21/visudet.html#root-height)

# Name all the things
The other day I found myself writing a small anonymous function to do a bit of string parsing or something and I was like, should I name this little guy, or leave him anonymous in obscurity?  There's definitely some readability advantage and it makes code reviews a little easier because you can reference functions by name...but there's also a much bigger advantage.  Debugging.  

One of my standard go-to references about JS functions is Ben Alman's 4-year-old [article on IIFE's](http://benalman.com/news/2010/11/immediately-invoked-function-expression/).  It's just a really clear explanation of how how to write and refer to function declarations and expressions in JavaScript.  So in my existential moment, I read that.  Which then somehow led me on a hyperlink voyage to a great article on [Smashing Mag](http://coding.smashingmagazine.com/2012/06/12/javascript-profiling-chrome-developer-tools/) that explains how to debug named functions with the JavaScript profiling tool in dev tools.

Ain't that some shit.  With the JS profiler you get some fab resource usage data about your code including CPU for your JS, CPU for your CSS selection, and memory usage by JS objects.  I can't claim to have really put these stats to use quite yet, but the key point is that if you name functions you'll expose your function to performance inspection.   So go all roll call on your functions.  Present. 

# A really concise technique for creating a random 4-digit ID with a string method?

So I wanted to generate a random identifier for a set of hidden inputs on a form.  Got myself some radix.

All objects in JavaScript have a prototype method called `toString()` which converts their internal value to a textual string.  When used on a Number object, the toString() method accepts a radix as a single parameter.  A [radix](http://en.wikipedia.org/wiki/Radix), or base, is a number that represents a unique set of digits - which could be numbers or letters.  For example, a radix of **10** represents the well-known decimal system with digits of "0-9."  And a radix of **2** represents a binary numeral system of "0" and "1."  And a radix of **16** yields "0-9" and "A-F."  Math dude!

For the more linguistics-interested, "radix" is actually the Latin word for "root."  And for musical types, the Roots Radics are a [reggae band](http://en.wikipedia.org/wiki/Roots_Radics) from the [70s](http://www.youtube.com/watch?v=He5pOzmI8-c).  Fyah!!

Based on this knowledge, suddenly we have a very concise and readable way of creating a set of four random numbers starting with JavaScript's built-in Math.random method which generates a [pseudo-random](http://en.wikipedia.org/wiki/Pseudorandomness) number between 0 (inclusive) and 1 (exclusive):

```javascript
function roots_radics() {
	return Math.random().toString(10).substring(2,6);
}
roots_radics();
// outputs something like "4759"
```

Of course there are a myriad of ways to rand nums in JS. Personally I'm liking the way that radix is employed here to restrict the numeral set.  Also, in order to ensure the length of your numbers is correct by using `substring()`, it makes kinda semantic sense to use a string method on a number object that's been converted to a string already.
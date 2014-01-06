---
layout: post
title:  "That Time I Shortcut jQuery Deferred"
slug: jquery-deferred-vs-a-counter
date:   2013-12-22 14:51:38
categories: jekyll update
---

Recently I had one of those moments where I tried to do something fancy with jQuery for a file uploader, to which IE8 sneered in defiance, turned up [Blame It](http://www.youtube.com/watch?v=rfjtpp90lu8), and started sobbing again about Michael Jackson.  Ultimately I found an acceptable <a class="term-name" href="/glossary#back-compat">back-compat</a> solution that was functional and readable, and used a simple counter rather than jQuery's Deferred Object.

The file uploader I was designing allowed users to upload multiple files. Now, a normal UI/code flow for this is fairly straightforward:

- User uploads file(s)
- User clicks submit
- Code streams files wherever
- Code executes callback in the response to submit the form

Right, so normally you could post the entire upload data packet inside one request.  But in this case I was using a third-party vendor's API to help us stream these files to S3.  And unfortunately, this API only allowed one stream request at a time.  (It's a young product).  So rather than sending the file data in one simple ajax request, I would need some code that could wait for an indeterminate amount of async ajax calls to complete before submitting the form.

jQuery has a nifty method to execute callbacks based on Deferred objects for async events.  So my initial idea, having been reading a lot about JavaScript Promises lately, was to create an array of these calls and then pass them to [`$.when`](http://api.jquery.com/jquery.when/) like so:

{% highlight javascript %}
$.when.apply($, promises).then(function(){
	form.submit();
});
{% endhighlight %}

But IE8 simply didn't want to play.  My suspicion is that the vendor-specific API methods in my ajax calls were causing some trouble because `$.when` *did* work when I tested a simple ajax request.  I didn't have time for a full investigation with the vendor so I went ahead to find a different solution.  And came up with this, simplified for exemplification:

{% highlight javascript %}
// Loop of ajax calls
$.each(arrOfFiles, function( index, file ) {
	vendorAPI.stream( file, data, function( res ){
	// Count down each time we make an ajax call
	count--;
	// Once the count is 0, our ajax calls are done so let's submit the form
	if ( count == 0 ) {
		// Unhook dead submit binding and resubmit form
		form.submit();
	}
});
{% endhighlight %}

Curious to hear what you think.  Like, does this code suck and you have a better a idea?  [Tweet at a playa](http://twitter.com/internetross).
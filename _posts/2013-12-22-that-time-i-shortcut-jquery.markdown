---
layout: post
title:  "That Time I Shortcut jQuery"
date:   2013-12-22 14:51:38
categories: jekyll update
---

# TLDR;

Recently I had one of those moments writing jQuery when IE8 was being an asshat I was writing some code recently for Science Exchange to replace our nodejs web form file uploader - which was broken for IE 8 users - with a third-party utility, Ink's Filepicker.  In the process I attempted to take advantage of jQuery's deferred object methods to handle streaming the files to S3.  But I had some trouble.  But I found a workaround that I think was sorta cool so I wanted to share it.

After first reading up on handling promises in jQuery, I came up with a basic thesis for handling the S3 streaming:

When the user submitted the form I would
1) cache a separate API call for each file to send through Filepicker's S3 streaming method `filepicker.store` and then
2) execute the calls by passing them as an array to jQuery's $.when() method, doing something like:

{% highlight javascript %}
$.when.apply($, promises);
{% endhighlight %}

.  This worked really well, except in IE8.

with Ink's Filepicker utility.  Filepicker is probably the best managed asset solution I've seen of this kind because it can accept files from many popular media management services. It also has a straightforward, well-documented API.


Filepicker will host files for you, but our app was designed to serve assets from S3.  Now, the Filepicker API does provide a method for S3 streaming called `filepicker.store`, but it falls slightly short because you can only pass the method one file at a time.


[^1]: Previously, users were restricted to uploading one file at a time, and if they made a mistake they had to reload the page.
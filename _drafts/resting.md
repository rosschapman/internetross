---
layout: post
title:  "Automatically RESTing your Backbones"
categories: [backbonejs, wordpress]
image: /assets/images/old-servers.gif
---

My portfolio site was basically non-existent for the past few years while I travailed earnestly to keep pace with the hyper-growth at <a href="http://zendesk.com">Zendesk</a> pushing pixels for a brilliant marketing machine and managing production of their corporate website.  But since my <a href="http://internetross.me/#blog/bye-zendesk">farewell</a> a month ago I've finally accrued some free time to reinvent and rebrand my digital self at a new online home, internetross.me, and role-play some technical fantasies.  I love these dot.me addresses.  And yes, I would have staked a flag at ross.me or rosschapman.me if a random email company or my doppleganger in the UK didn't get there first.

In the past year I've handled increasing project work that talks to RESTful APIs; which typically means, from my vantage, GETting data to populate <a href="http://www.zendesk.com/blog/consumerization-beautifully-simple-design">beautifully simple</a> front-ends. Endpoints and $.ajax.

So when I began to fantasize the databits and their attendant pixels for this website, I thought, <em>Hey Ross, lets continue our study in the richness of HTTP data transportation</em>. Also, I'd been kinda itching to experiment with the <a href="http://developer.wordpress.com/docs/api/">REST API</a> that WordPress.com had released April of last year.

Having developed WordPress themes for like 5 years I've gotta say that the tangle of PHP and HTML is not the most elegant to scale, and at this point I'm pretty much exhausted by it. Compared alongside newer publishing platforms like <a href="http://ghost.org/">Ghost</a> or <a href="https://brandcast.com/auth/login">Brandcast</a> that are solving architecture and admin problems by adding socket-y live previews and direct front-end template editing, WordPress.org feels like quite the clunkster. My hope was that the WP.com REST API would expose new lines of flight and fancy because posts as a JSON object implies I can choose a future-forward application structure like Backbone.js to handle the site armature.

As an advocate for Web Standards back in the <a href="http://www.csszengarden.com/">day</a> and more recently <a href="https://github.com/stubbornella/oocss">OOCSS</a> as another needed (i)m(pr)ovement to separate skin from skeleton, I'm pretty jazzed about SPAs and MV-patterned application frameworks as the next wave of popular website development. Even for small websites like this one.

In a sense, this website is a bridge - in the markup as well as philosophically. A bridge that connects my past experience wrangling WordPress.org with the near-future of AJAX-driven UX - which makes the web feel so blingin'.  WordPress.com is purely a database and authoring tool now.  And the greatest advantage to approaching the redesign this way is that I can host the site on <a href="https://github.com/">Github</a>; nothing happens on the server. For better or worse at the moment.

So what you're reading right now is a piece of JSON retrieved via a Backbone.js fetch method that then instantiates a new view for the data based on a pre-defined data model. It's that new new. Or, REST is the new...black?

I've got a deeper technical dive coming soon. Thanks for reading and stay tuned! :)
var app = app || {};

app.Post = Backbone.Model.extend({
	defaults: {
		ID: '[post ID]',
		featured_image: 'img/placeholder.png', // normally would use camelCase but WordPress sets attribute this way
		title: 'Ross didn\'t add a title, so..."Hello World!"',
		date: 'This post has no date? Wha????',
		tags: 'Er...Ross didn\'t tag this post',
		wordCount: '[word count]'
	},
	initialize: function(){

    	console.log('This model has been initialized.');

        this.parseContent();
        this.parseDate();
        this.parseTags();
        this.parseWordCount();
  	},
  	parseContent: function(){
  		var content = this.attributes.content;

        var find1 = 'w=';
		var re1 = new RegExp(find1, 'g');
		content = content.replace(re1, '');
		
		var find2 = 'h=';
		var re2 = new RegExp(find2, 'g');
		content = content.replace(re2, '');

		this.set({ content: content });
  	},
  	parseDate: function(){
  		var date = this.attributes.date;

  		// Fix our UNIX timestamp with sexy timeago jQuery plugin
  		newDate = $.timeago(date);

  		// Set model date
  		this.set({ date: newDate });
  	},
  	parseTags: function(){
  		// Fetch tags from Post item
    	var tags = this.attributes.tags;
    	// Create empty array
    	var tagsNew = [];
    	// Loop through tags and push 
    	$.each(tags, function(i, el){
			tagsNew.push('#' + el.name);
		});

		// Set post attribute tags to newly minted tags array
        this.set({ tags: tagsNew });
  	},
  	parseWordCount: function(){

  		var wordCount = $(this.attributes.content).text().length;

  		this.set({ wordCount: wordCount })
  	}
});
// Object literal namespacing
var myWebsite = myWebsite || {};

myWebsite.Posts = Backbone.Collection.extend({
    model: myWebsite.Post,
    url: 'http://public-api.wordpress.com/rest/v1/sites/internetross.wordpress.com/posts?callback=?',
    parse: function( response ) {
    	//console.log('inside');
        return response.posts;
    } 
})



myWebsite.Post = Backbone.Model.extend({

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
	})


myWebsite.PostsMenuView = Backbone.View.extend({

    el: '.wrap',

    initialize: function() {

        this.collection = new myWebsite.Posts();
        
        this.collection.fetch({ reset: true});

        this.listenTo( this.collection, 'reset', this.render ); // NEW

    },
    close: function() {
        // unbind the events that this view is listening to
        // memory management
        this.stopListening();
    },

    // render library by rendering each book in its collection
    render: function() {
        
        this.collection.each(function( post ) {
            this.renderPostMenuItem( post );
        }, this );

        //firstPostData = this.collection.get('c3');
        //this.renderPostItem( firstPostData );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderPostMenuItem: function( postData ) {
        
        var postMenuItem = new myWebsite.PostsMenuItemView({
            model: postData
        });

        this.$el.find('.post-menu').append( postMenuItem.render().el );
    },
    renderPostItem: function( firstPostData ) {
        
        var justPost = new myWebsite.PostsView({
            model: post
        });

        this.$el.children('.post-list').append( justPost.render().el );
    },

    events: {
        "click a": "showPost"
    },

    showPost: function( e ) {

    	e.preventDefault();
    	console.log(this.collection);
        var id = $(e.currentTarget).data("id");
        var poster = this.collection.get('c3');
        
    }
})

myWebsite.PostsMenuItemView = Backbone.View.extend({
	tagName: 'li',
    template: _.template( $( '#postListItemTemplate' ).html() ),

    initialize: function() {

        this.collection = new myWebsite.Posts();
        
        this.collection.fetch({ reset: true});

        this.listenTo( this.collection, 'reset', this.render ); // NEW

    },

    render: function() {
    	
    	var data = this.model.toJSON();
    	var pid = 'pid-' + data.ID;

        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.attr('id', pid).html( this.template( this.model.toJSON() ) );

        return this;
    }
});

myWebsite.PostsView = Backbone.View.extend({
	tagName: 'div',
	className: 'post-item',
    template: _.template( $( '#postTemplate' ).html() ),

    intialize: function() {
    	console.log(this.collection);
    },

    render: function() {
    	
    	var data = this.model.toJSON();
    	var pid = 'pid-' + data.ID;

        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.attr('id', pid).html( this.template( this.model.toJSON() ) );

        return this;
    }
});
  

new myWebsite.PostsMenuView();
//new myWebsite.PostsView();
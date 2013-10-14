/** 
 * object literal scopting start...
 *
 * Object Literals have the advantage of not polluting the global namespace but assist in 
 * organizing code and parameters logically. They’re beneficial if you wish to create easily 
 * readable structures that can be expanded to support deep nesting. Unlike simple global 
 * variables, Object Literals often also take into account tests for the existence of a variable 
 * by the same name, which helps reduce the chances of collision.
 */
var myApp = myApp || {};

/**
 * There's only one setting config'd now, but just you wait!!
 */
myApp.Settings = {
    endpoint: 'http://public-api.wordpress.com/rest/v1/sites/internetross.wordpress.com/'
};

/**
 * Index experience model. Currently two data sets: my interwebs links and a welcome message.  I'm * considering pulling that welcome message from somewhere dynamically. Like a "Ross Welcome 
 * Boilerplate."
 */
myApp.Index = Backbone.Model.extend({
    defaults: {
        icons: [
            { 'LI': 'http://linkedin.com/in/rosschapman', },
            { 'TW': 'http://twitter.com/internetross', },
            { 'DBBB': 'http://dribbble.com/internetross' },
            { 'GH': 'http://github.com/rosschapman' }
        ],
        content: '<p>It\'s the internet! And I\'m <strong>Ross Chapman</strong>, a web developer and UX engineer/designer based in San Francisco\'s Mission district. </p><p> Over the last 5 years I\'ve helped companies grow their business online with clean code and a deep understanding of web tech and user experience. </p><p> Get in touch to learn more about how I can help you: <strong>rosschapman@gmail.com</strong></p>'
    }
});

/**
 * The Index experience view.  Nothing really interesting here.  Using underscore like a BOSS.
 */
myApp.IndexView = Backbone.View.extend({
    el: '.main',
    template: _.template( $( '#indexTemplate' ).html() ),
    initialize: function(){
        
        this.render();

        return this;
    },
    render: function() {
        //console.log(this.model);
        this.$el.html( this.template( this.model.toJSON() ) );
    }
});

myApp.Post = Backbone.Model.extend({
    initialize: function(){
        //console.log('init');
        
    },
    defaults: {
        ID: '[post ID]',
        featured_image: 'img/placeholder.png', // normally would use camelCase but WordPress sets attribute this way
        title: 'Ross didn\'t add a title, so..."Hello World!"',
        slug: 'slug',
        date: 'This post has no date? Wha????',
        tags: 'Er...Ross didn\'t tag this post',
        wordCount: '[word count]',
        content: ''

    },
    url: function(){
        // Retrieve slug from model
        var slug = this.attributes.slug;
        return myApp.Settings.endpoint + 'posts/slug:'+ slug + '?callback=?';
    },
    parse: function( response ) {
        return response;
    },
    parseContent: function(){
        //console.log("in parsecontent");
        var content = this.attributes;

        //console.log(content);

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

myApp.PostMenuItem = Backbone.Model.extend({
    defaults: {
        title: '',
        date: ''

    }
});

myApp.PostsCollection = Backbone.Collection.extend({
    url: function(){
        return myApp.Settings.endpoint + 'posts?callback=?';
    },
    parse: function( response ) {
        //console.log('inside');
        return response.posts;
    }
});

myApp.PostView = Backbone.View.extend({
    el: '.main',
    template: _.template( $( '#postTemplate' ).html() ),

    initialize: function(options){
        $('.main').animate({ scrollTop: 0 }, 0);
        this.render();
    },
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    }

});

myApp.PostsMenuView = Backbone.View.extend({
    el: '.menu-list',
    tagName: 'li',
    template: _.template( $( '#postsMenuTemplate' ).html() ),

    initialize: function(){
        this.render();
    },
    render: function() {

        var posts = new myApp.PostsCollection();
        
        var self = this;

        posts.fetch({ 
            reset: true,
            success: function(posts) {
                $( '#postsMenuTemplate' ).remove();

                posts.each(function( item ) {

                    var fixedDate = $.timeago(item.attributes.date);
                    item.attributes.date = fixedDate;
                    
                    self.$el.append( self.template( item.toJSON() ) );
                });
            } 
        });

        return this;

    }
});

myApp.Router = Backbone.Router.extend({
    initialize: function(){

        return this.bind('all', this._trackPageview);

    },
    routes:{
        '' : 'index',
        'blog/:slug' : 'getPost',
    },
    _trackPageview: function(){
        url = Backbone.history.getFragment();

        ga('send', 'pageview', url);
    },
    index: function() {
        new myApp.IndexView({model: new myApp.Index});
    },
    getPost: function( slug ) {

        var posty = new myApp.Post({ slug: slug });
        posty.fetch({
            reset: true,
            success: function(post) {
                //console.log(post);
                var content = post.attributes.content,
                    date    = post.attributes.date,
                    tags    = post.attributes.tags
                ;
                var wordCountStr = content;
                    wordCountStrNoPunc = wordCountStr.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                        // Create array of words
                    wordCountArr = wordCountStrNoPunc.split(" ");

                    wordCount = wordCountArr.length;

                post.set({ content: myApp.Utilities.parseContent( content ) });
                post.set({ date: myApp.Utilities.parseDate( date ) });
                post.set({ tags: myApp.Utilities.parseTags( tags ) });
                post.set({ wordCount: wordCount });

                new myApp.PostView({ model: post });
            }
        });
    }
  });

myApp.Utilities = {
    parseContent: function(content){
        var find1 = 'w=';
        var re1 = new RegExp(find1, 'g');
        content = content.replace(re1, '');
        
        var find2 = 'h=';
        var re2 = new RegExp(find2, 'g');
        content = content.replace(re2, '');

        return content;
    },
    parseDate: function(date){
        // Fix our UNIX timestamp with sexy timeago jQuery plugin
        newDate = $.timeago(date);

        return newDate;
    },
    parseTags: function(tags){
    // Create empty array
    var tagsNew = [];
    // Loop through tags and push 
    $.each(tags, function(i, el){
            tagsNew.push('#' + el.name);
        });

        // Set post attribute tags to newly minted tags array
      return tagsNew;
    }
}

var getPostMenu = new myApp.PostsMenuView();
var doRouting = new myApp.Router();
Backbone.history.start();
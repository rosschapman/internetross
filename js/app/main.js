/**
* "Anyone who has lost track of time when using a computer knows the propensity to dream, the urge * to make dreams come true and the tendency to miss lunch." - Tim Berners Lee
*
* Welcome to the dreamers who gaze upon the source! Below is a super simple 
* Backbone.js/Underscore.js client app to serve my ego datas on the information superhighway. Know * how I can make it better? Hit me up @internetross.  
*/

// Global vars
var windowWidth = window.outerWidth,
    loader = $('.loader'),
    headerMenuItem = $('.header-menu-item a')
 
// Object literal scope start...
var rossApp = rossApp || {};

// There's only one setting config'd now, but just you wait!!
rossApp.Settings = {
    endpoint: 'http://public-api.wordpress.com/rest/v1/sites/internetross.wordpress.com/'
};

/***************************************
           *=> COLLECTIONS <=*
***************************************/

rossApp.PostsCollection = Backbone.Collection.extend({
    url: function(){
        // Return posts, using jsonp datatype
        return rossApp.Settings.endpoint + 'posts?callback=?';
    },
    parse: function( response ) {
        // Return posts without metadata
        return response.posts;
    }
});

/***************************************
            *=> MODELS <=*
***************************************/
rossApp.PostMenuItem = Backbone.Model.extend({
    defaults: {
        title: '',
        date: '',
        tags: ''

    }
});

// Homepage model. Currently two data sets: my interwebs links and a welcome message.  I'm 
// considering pulling that welcome message from somewhere dynamically. Like a "Ross Welcome 
// Boilerplate."
rossApp.Index = Backbone.Model.extend({
    defaults: {
        icons: [
            { 'icon-at': 'mailto:rosschapman@gmail.com', },
            { 'icon-linkedin': 'http://linkedin.com/in/rosschapman', },
            { 'icon-twitter': 'http://twitter.com/internetross', },
            { 'icon-dribbble': 'http://dribbble.com/internetross' },
            { 'icon-github': 'http://github.com/rosschapman' }
        ],
        content: '<p>It\'s the internet! And I\'m <strong>Ross Chapman</strong>, a web developer and UX designer based in San Francisco\'s Mission district. </p><p> Over the last 5 years I\'ve helped companies grow their business online with clean code and a deep understanding of web tech and user experience. </p><p> Get in touch to learn more about how I can help you:</p>'
    }
});

rossApp.Post = Backbone.Model.extend({
    initialize: function(){
        // No real need to do anything here  
    },
    defaults: {
        ID: '[post ID]',
        featured_image: 'img/placeholder.png', // WP doesn't use camelCase :/
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
        // Construct endpoint for post api call
        return rossApp.Settings.endpoint + 'posts/slug:'+ slug + '?callback=?';
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
    // This func helps us fetch and format tags to display somewhere
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

        this.set({ wordCount: wordCount });
    }
});

/***************************************
            *=> VIEWS <=*
***************************************/

rossApp.IndexView = Backbone.View.extend({
    el: '.index',
    template: _.template( $( '#indexTemplate' ).html() ),
    initialize: function(){
        
        this.render();
        return this;
    },
    render: function() {

        $('.posts-menu').hide();
        //console.log(this.model);
        this.$el
            // Hide model
            .css('display', 'none')
            // Add model
            .html( this.template( this.model.toJSON() ) )
            // FadeIn model
            .fadeIn('fast')
            ;
        loader.fadeOut(50);
    }
});

rossApp.PostView = Backbone.View.extend({
    el: '.post-container',
    template: _.template( $( '#postTemplate' ).html() ),

    initialize: function(options){
        this.render();
        return this;
    },
    render: function() {

        // Fade out posts menu list
        $('.posts-menu').fadeOut(100);

        this.$el.html( this.template( this.model.toJSON() ) );

        if ( window.outerWidth > 568 ) {    
            $('.post-wrap').animate({ marginTop : 400}, 300, "easeOutCirc", function(){
                loader.fadeOut(50);
                $('.post-image').fadeIn(100);         
            });
        } else {
            loader.fadeOut(50);
            $('.post-image').fadeIn(100);  
        }
        return this;
    }

});

rossApp.PostsMenuView = Backbone.View.extend({
    el: '.posts-menu',
    tagName: 'li',
    template: _.template( $( '#postsMenuTemplate' ).html() ),
    events: {
        'click a': 'postTitleClick',
    },
    postTitleClick: function(){
        // Scroll to top
        $(document).scrollTop(0);
        // Show loader
        loader.show();
    },
    initialize: function(){

        $('.post-container').children().empty();
        // Check if the posts menu has already been rendered
        if ( $('.posts-menu li').length ) {
            $('.posts-menu').fadeIn();
            loader.fadeOut(50);
        } else {
            this.render();
            return this;
        }
        
    },
    render: function() {
        
        $('.post-container').empty();

        var posts = new rossApp.PostsCollection();

        //console.log(posts);
        // Assign "this" so we can safely reuse within our fetch call without confusion with the // "this" belonging to the fetch response
        var self = this;
        // Fetch code posts collection 
        posts.fetch({ 
            reset: true,
            success: function(posts) {
                
                $( '#postsMenuTemplate' ).remove();

                posts.each(function( item ) {

                    var fixedDate = $.timeago(item.attributes.date);
                    item.attributes.date = fixedDate;
                    console.log(item.attributes);
                    var tags = item.attributes.tags;
                    item.set({ tags: rossApp.Utilities.parseTags( tags ) });
                    
                    self.$el.append( self.template( item.toJSON() ) );
                    loader.fadeOut(50);

                });
            }
        });

        $('.posts-menu').fadeIn('fast');

        return this;

    }
});

/***************************************
        *=> CONTROLLER/ROUTER <=*
***************************************/

rossApp.Router = Backbone.Router.extend({
    initialize: function(){
        // Bind Google Analytics to all routers
        return this.bind('all', this._trackPageview);

    },
    routes:{
        // Homepage route
        '' : 'index',
        // Blog route
        'literature' : 'getPostList',
        // Post route
        'blog/:slug' : 'getPost'

    },
    index: function() {
        // Show loader
        loader.show();
        // Empty post
        $('.posts-menu').hide();
        $('.post-container').empty();
        // 
        if ( $('.icon-at').length ) {
            $('.index').fadeIn();
            loader.fadeOut(50);
        } else {
            new rossApp.IndexView({model: new rossApp.Index});
        }
        
    },
    getPostList: function() {
        $('.index').hide();
        loader.show();
        // Get latest post (hardcoded for now)
        // Maybe we can fetch another collection of the latest post
        var getPostList = new rossApp.PostsMenuView({});

    },
    getPost: function( slug ) {

        loader.show();
        var posty = new rossApp.Post({ slug: slug });

        posty.fetch({
            reset: true,
            start: function(){
                console.log('started');
            },
            success: function(post) {
                console.log('done');
                var content = post.attributes.content,
                    date    = post.attributes.date,
                    tags    = post.attributes.tags
                ;
                var wordCountStr = content;
                    wordCountStrNoPunc = wordCountStr.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                    // Create array of words
                    wordCountArr = wordCountStrNoPunc.split(" ");

                    wordCount = wordCountArr.length;

                post.set({ content: rossApp.Utilities.parseContent( content ) });
                post.set({ date: rossApp.Utilities.parseDate( date ) });
                post.set({ tags: rossApp.Utilities.parseTags( tags ) });
                post.set({ wordCount: wordCount });

                new rossApp.PostView({ model: post });
            }
        });
    },
    _trackPageview: function(){
        url = Backbone.history.getFragment();

        ga('send', 'pageview', url);
    }
  });

rossApp.Utilities = {
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

/**
* Ok, lets start our engines!
*/
var doRouting = new rossApp.Router();
Backbone.history.start();

/**
* Interactions after app loaded and document is ready. AKA jQuery funtimes. 
*/
(function($){

    if ( window.outerWidth > 568 ) {
        $(window).scroll(function(){
            $('.post-image').addClass('fixed');
        });
    }

}(jQuery));
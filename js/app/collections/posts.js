var app = app || {};

app.Posts = Backbone.Collection.extend({
    model: app.Post,
    url: 'http://public-api.wordpress.com/rest/v1/sites/internetross.wordpress.com/posts?callback=?',
    parse: function( response ) {
    	//console.log('inside');
        return response.posts;
    } 
});
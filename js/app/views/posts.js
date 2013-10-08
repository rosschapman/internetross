// site/js/views/library.js

var app = app || {};

app.PostsView = Backbone.View.extend({
    el: '.posts',

    initialize: function() {

        this.collection = new app.Posts();
        
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
        //console.log(this.collection);
        this.collection.each(function( post ) {
            this.renderPost( post );
        }, this );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderPost: function( post ) {
        
        var postView = new app.PostView({
            model: post
        });

        this.$el.append( postView.render().el );
    },

    events:{
        /*
        'click .post-title a':'showPost'
        */
    },

    showPost: function( e ) {
    
    }
});
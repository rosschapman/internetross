var app = app || {};

app.PostView = Backbone.View.extend({
	tagName: 'div',
	className: 'post',
    template: _.template( $( '#postTemplate' ).html() ),

    render: function() {
    	
    	var data = this.model.toJSON();
    	var pid = 'pid-' + data.ID;

        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.attr('id', pid).html( this.template( this.model.toJSON() ) );

        return this;
    }

});
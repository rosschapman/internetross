require.config({
  baseUrl:'js/app/',
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    text: 'libs/require/text'
  }
});

require(['views/posts'], function(AppView){
  var app_view = new AppView;
});
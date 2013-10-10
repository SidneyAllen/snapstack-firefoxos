define([
  'jquery',
  'text!templates/home/homeTemplate.html',
  'views/photo/PhotoListView',
  'stackmobinit'
], function($, HomeTemplate, PhotoListView, StackMob){
  
  var PhotoView = Backbone.View.extend({
      className: "photo", 

      events: {
        "click #send" : "send"
      }, 
      
      initialize: function(options) {
        this.collection = this.options.collection;
      },

      render: function() {
        var self = this;
        
        self.$el.append(HomeTemplate);
        self.$el.attr("id","photoView");

        var header = self.$el.find(":jqmData(role='header')");
        header.append('<a href="#map" data-role="button">map</a>');

        // add Shout List to content area
        var content = self.$el.find(":jqmData(role='content')");
        content.empty();

        var listView = new PhotoListView({collection: this.collection});
        content.append(listView.render().el);

        return this;
      },

      send : function(){
        var mapIframe = document.getElementById('mapIframe');

        mapIframe.contentWindow.postMessage(JSON.stringify(this.collection.toJSON()), '*');

      }

  });

  return PhotoView;
  
});
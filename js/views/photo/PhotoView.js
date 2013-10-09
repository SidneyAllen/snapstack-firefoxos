define([
  'jquery',
  'text!templates/home/homeTemplate.html',
  'views/photo/PhotoListView',
  'stackmobinit'
], function($, HomeTemplate, PhotoListView, StackMob){
  
  var PhotoView = Backbone.View.extend({
      className: "photo",   
      
      initialize: function(options) {
        this.collection = this.options.collection;
      },

      render: function() {
        var el = this.$el;
        
        el.append(HomeTemplate);
        el.attr("id","photoView");

        // add Shout List to content area
        var content = el.find(":jqmData(role='content')");
        content.empty();

        content.append('<iframe src="http://localhost:4567/map.html" width="377" height="377" marginwidth="0" marginheight="0" frameborder="no" scrolling="yes" style="border-width:2px; border-color:#333; background:#FFF; border-style:solid;"></iframe>')
        var listView = new PhotoListView({collection: this.collection});
        content.append(listView.render().el);

        return this;
      }

  });

  return PhotoView;
  
});
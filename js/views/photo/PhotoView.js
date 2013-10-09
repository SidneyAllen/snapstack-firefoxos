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
        var el = this.$el;
        
        el.append(HomeTemplate);
        el.attr("id","photoView");

        // add Shout List to content area
        var content = el.find(":jqmData(role='content')");
        content.empty();

        content.append('<button id="send">Send</button><br><iframe id="mapIframe" src="http://dev.firefoxos.stackmob.stackmobapp.com/map.html" width="290" height="377" marginwidth="0" marginheight="0" frameborder="no" scrolling="yes" style="border-width:1px; border-color:#333; background:#FFF; border-style:solid;"></iframe>')
        

        //var listView = new PhotoListView({collection: this.collection});
        //content.append(listView.render().el);

        return this;
      },

      send : function(){
        var mapIframe = document.getElementById('mapIframe');

        mapIframe.contentWindow.postMessage(JSON.stringify(this.collection.toJSON()), '*');

      }

  });

  return PhotoView;
  
});
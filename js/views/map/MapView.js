define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'text!templates/map/mapTemplate.html',
], function($,_,Backbone, Stackmob,MapTemplate){
  
  var MapView = Backbone.View.extend({
      className : 'map',
      events : {
        "click #refreshBtn" : "refresh"
      },

      initialize: function() {
        this.collection = this.options.collection;
        this.router = this.options.router;
      },

      render: function() {
        var self = this;

        self.$el.append(MapTemplate);
        self.$el.attr("data-role","dialog");
        self.$el.attr("data-theme","b"); 

        var content = self.$el.find(":jqmData(role='content')");
        content.empty();
        content.append('<iframe id="mapIframe" src="http://dev.firefoxos.stackmob.stackmobapp.com/map.html" width="100%" height="377" marginwidth="0" marginheight="0" frameborder="no" scrolling="yes" style="border-width:1px; border-color:#333; background:#FFF; border-style:solid;"></iframe>')
        
             
        return this;
      },

      refresh : function(e) {
        var self = this;
        e.preventDefault();
        var mapIframe = document.getElementById('mapIframe');
        mapIframe.contentWindow.postMessage(JSON.stringify(self.collection.toJSON()), '*');
      }

    });

  return MapView;
  
});
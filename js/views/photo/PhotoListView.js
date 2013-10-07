define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'text!templates/photo/photoTemplate.html'
], function($,_,Backbone, Stackmob, PhotoTemplate){

  var PhotoListView = Backbone.View.extend({   
      tagName: 'ul',

      initialize: function() {
        this.collection = this.options.collection;
        this.listenTo(this.collection,'all', this.render);
        this.template = _.template(PhotoTemplate);
      },

      render:function (e) {
        var self = this;
         
        
        self.$el.attr("data-role","listview");
        self.$el.attr("data-theme","c");
        self.$el.attr("id","photoListView");
        self.$el.empty();
 
        this.collection.each(function(model){
            self.$el.append(self.template(model.toJSON()));
        });

        if(this.collection.length === 0) {  
          self.$el.append('<li>No Photos</li>');      
        }

        $('#photoListView').listview('refresh');

        return this;
      }

    });

  return PhotoListView;
  
});
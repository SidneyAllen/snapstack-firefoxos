define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmobinit'
], function($,_,Backbone, Stackmob){
  
  var BackButtonView = Backbone.View.extend({
      tagName : 'a',

      initialize: function() {
        this.render();
      },

      render: function() {
        var el = this.$el;

        el.attr("data-role","button");
        el.attr("href","#");
        el.attr("data-icon","back");
        el.attr("data-direction","reverse");
        el.text("Back");
      
        return this;
      }
    });

  return BackButtonView;
  
});
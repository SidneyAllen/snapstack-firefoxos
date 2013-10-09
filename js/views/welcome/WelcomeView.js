define([
  'jquery',
  'underscore', 
  'backbone',
  'text!templates/welcome/welcomeTemplate.html'
], function($,_,Backbone, WelcomeTemplate){

   var WelcomeView = Backbone.View.extend({
    initialize: function() {
      this.router = this.options.router;
    },

    render: function(eventName) {
      $(this.el).html(WelcomeTemplate);

      return this;
    }
  });
  
  return WelcomeView;
  
});
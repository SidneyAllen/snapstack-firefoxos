define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmobinit'
], function($,_,Backbone, Stackmob){
  
  var LoginButtonView = Backbone.View.extend({
      tagName : 'a',
      className : 'login ui-btn-right',

      initialize: function() {
        this.render();
      },

      render: function() {
        var el = this.$el;
        var loginStatus = StackMob.isLoggedIn();

        el.attr("data-role","button");
        el.attr("href","#login");
        el.attr("id","loginBtn");
        el.attr("data-theme","b");
        el.text("Login");
      
        return this;
      }
    });

  return LoginButtonView;
  
});
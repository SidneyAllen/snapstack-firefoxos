define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmobinit'
], function($,_,Backbone, Stackmob){
  
  var LogoutButtonView = Backbone.View.extend({
      tagName : 'a',
      className : 'logout ui-btn-right',

      initialize: function() {
        this.render();
      },

      render: function() {
        var el = this.$el;
        var loginStatus = StackMob.isLoggedIn();

        el.attr("data-role","button");
        el.attr("href","#logout");
        el.attr("id","logoutBtn");
        el.attr("data-theme","b");
        el.text("Logout");
        
        return this;
      } 
    });

  return LogoutButtonView;
  
});
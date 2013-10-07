define([
  'jquery',
  'text!templates/home/homeTemplate.html',
  'views/photo/PhotoListView',
  'views/home/LogoutButtonView',
  'views/home/LoginButtonView',
  'libs/app/util',
  'stackmobinit'
], function($, HomeTemplate, PhotoListView, LogoutButtonView,LoginButtonView, Util, StackMob){
  
  var PhotoView = Backbone.View.extend({
      className: "photo",   
      
      events: {   
        "click .logout": "logout"
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

        var listView = new PhotoListView({collection: this.collection});
        content.append(listView.render().el);

        return this;
      },

      logout: function(e) {
        Util(this.$el).setLoginLogoutButton(this.$el,"photo");
        return this;
      }

  });

  return PhotoView;
  
});
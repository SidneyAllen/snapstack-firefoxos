define([
  'jquery',
  'text!templates/home/homeTemplate.html',
  'text!templates/shout/shoutDetailTemplate.html'
], function($, HomeTemplate,ShoutDetailTemplate){
  
  var ShoutDetailView = Backbone.View.extend({
      className: "photodetail",   

      initialize: function(options) {
        this.collection = this.options.collection;
        this.model = this.options.model;
        this.template = _.template(ShoutDetailTemplate);
      },

      render: function() {
        var el = this.$el,
        template = this.template;
        model = this.model;
     
        el.append(HomeTemplate);
        el.attr("id","photoDetailView");
        
        // add Shout Detail to content area
        var content = el.find(":jqmData(role='content')");
        content.empty();
        content.append(template(this.model.toJSON()));

        var header = $(el).find(":jqmData(role='header')");
        var backButtonView = new BackButtonView();
        header.append(backButtonView.render().el)
        return this;
      }

  });

  return ShoutDetailView;
  
});
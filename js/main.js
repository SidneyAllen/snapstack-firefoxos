
require.config({
  baseUrl: "/js/",
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    jquery: 'libs/jquery/jquery-1.8.2',
    imagefit : 'libs/jquery/jquery.imagefit-0.2',
    'jquery.mobile-config': 'libs/jqm/jquery.mobile-config',
    'jquery.mobile': 'libs/jqm/jquery.mobile-1.3.0',
    underscore: 'libs/underscore/underscore-1.4.4',
    backbone: 'libs/backbone/backbone-1.0.0-min',
    stackmob: 'libs/stackmob/stackmob-js-0.9.2',
    stackmobinit: 'stackmob-init',
    templates: '../templates',
    app: 'app'
  },

  shim: {
      imagefit: {
        deps: ['jquery'],
        exports: "imagefit"
      },    
      
      stackmob: {
        deps: ['jquery'],
        exports: "StackMob"
      },    
      stackmobinit: {
        deps: ['jquery','underscore','backbone','stackmob'],
        exports: "StackMobInit"
      },
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      },
      'jquery.mobile-config': ['jquery'],
      'jquery.mobile': ['jquery','jquery.mobile-config']
    }
});

require([
  'jquery',
  'jquery.mobile-config',
  'jquery.mobile',
  'underscore', 
  'backbone',
  'app',
  'stackmob'
], function($,_,jqmconfig,jqm,Backbone,App,StackMob){
    $(function(){
      App.initialize();
    });
});
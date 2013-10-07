({
    appDir: "../",
    baseUrl: "js",
    dir: "../../snapstack-html5-build-stage",
     paths: {
      jquery: 'libs/jquery/jquery-1.8.2',
      'jquery.mobile-config': 'libs/jqm/jquery.mobile-config',
      'jquery.mobile': 'libs/jqm/jquery.mobile-1.3.0',
   
      //'facebook' : '//connect.facebook.net/en_US/all',
      underscore: 'libs/underscore/underscore-1.4.4',
      backbone: 'libs/backbone/backbone-1.0.0-min',
      //facebook : 'libs/facebook/all',
   'facebook' : 'http://connect.facebook.net/en_US/all',
      stackmob: 'libs/stackmob/stackmob-js-0.9.1-min',
      stackmobinit: 'stackmob-init',
      templates: '../templates',
      app: 'app'
    },

    shim: {
      stackmob: {
        deps: ['jquery'],
        exports: "StackMob"

      },    
      stackmobinit: {
        deps: ['jquery','underscore','backbone','stackmob'],
        exports: "StackMobInit"

      },

      facebook : {
        exports: 'fb'
      },

      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      },
      'jquery.mobile-config': ['jquery'],
      'jquery.mobile': ['jquery']
    },
    
    modules: [
        {
            name: "main"
        }
    ]
})
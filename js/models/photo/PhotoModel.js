define([
  'stackmobinit'
], function(StackMob) {

  var PhotoModel = StackMob.Model.extend({
    schemaName: 'snap',
    binaryFields: ['photo']
  });
  return PhotoModel;

});


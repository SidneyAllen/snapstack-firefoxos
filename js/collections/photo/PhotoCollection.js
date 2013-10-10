define([
  'stackmobinit',
  'models/photo/PhotoModel'
], function(StackMob,PhotoModel){

  var PhotoCollection = StackMob.Collection.extend({
    model: PhotoModel
  });

  return PhotoCollection;

});
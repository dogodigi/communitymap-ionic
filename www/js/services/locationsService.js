angular.module('starter').factory('LocationsService', [ function() {
  var locationsObj = {};
  var featureCollection = august_town_churches;
  locationsObj.savedLocations = featureCollection.features;
  return locationsObj;
}]);

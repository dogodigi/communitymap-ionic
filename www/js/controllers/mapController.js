angular.module('starter').controller('MapController',
  [ '$scope',
    '$cordovaGeolocation',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    'LocationsService',
    'InstructionsService',
    'leafletData',
    function(
      $scope,
      $cordovaGeolocation,
      $stateParams,
      $ionicModal,
      $ionicPopup,
      LocationsService,
      InstructionsService,
      leafletData
      ) {

      /**
       * Once state loaded, inject map into scope.
       */
      $scope.$on("$stateChangeSuccess", function() {

        $scope.locations = LocationsService.savedLocations;

        if(!InstructionsService.instructions.newLocations.seen) {

          var instructionsPopup = $ionicPopup.alert({
            title: 'Add Locations',
            template: InstructionsService.instructions.newLocations.text
          });
          instructionsPopup.then(function(res) {
            InstructionsService.instructions.newLocations.seen = true;
            });

        }

        $scope.map = {
          defaults: {
            tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            maxZoom: 18,
            zoomControlPosition: 'bottomleft'
          },
          markers : {},
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          }
        };

        $scope.goTo(0);

      });

      var Location = function() {
        if ( !(this instanceof Location) ) return new Location();
      };

      $ionicModal.fromTemplateUrl('templates/addLocation.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
        });

      /**
       * Detect user long-pressing on map to add new location
       */
      $scope.$on('leafletDirectiveMap.contextmenu', function(event, locationEvent){
        $scope.newLocation = new Location();
        $scope.newLocation.lat = locationEvent.leafletEvent.latlng.lat;
        $scope.newLocation.lng = locationEvent.leafletEvent.latlng.lng;
        $scope.modal.show();
      });

      $scope.saveLocation = function() {
        LocationsService.savedLocations.push($scope.newLocation);
        $scope.modal.hide();
        $scope.goTo(LocationsService.savedLocations.length - 1);
      };

      /**
       * Center map on specific saved location/object
       * @param locationKey
       */
      $scope.goTo = function(locationKey) {
        leafletData.getMap().then(function(map) {
          var location = LocationsService.savedLocations[locationKey];
          var myFeature = L.geoJson(location);
          //myFeature.addTo(map);
          map.fitBounds(myFeature.getBounds());
          var flickr = new L.Flickr('00035f36d8cb075b1030b13b34908854',{maxLoad: 50, maxTotal: 250});
          map.addLayer(flickr);
        });
      };

      /**
       * Center map on user's current position
       */
      $scope.locate = function(){

        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {
            leafletData.getMap().then(function(map) {
              map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
              //map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 8);
              $scope.map.markers.now = {
                lat:position.coords.latitude,
                lng:position.coords.longitude,
                message: "You Are Here",
                focus: true,
                draggable: false
              };
            });
          });
      };
    }]);

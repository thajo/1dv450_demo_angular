angular
  .module("demo8App", ['ngMap']) // you must inject the ngMap (included as a separate js-file)
  .controller('MapController', function($scope){ // need to inject scope since we need the $scope for handling event $on
      // use this as ViewModel as usual http://toddmotto.com/digging-into-angulars-controller-as-syntax/
      var vm = this;
     
      var map;
      // We must use this for hadling the map
      $scope.$on('mapInitialized', function(evt, evtMap) {
        map = evtMap;
        // Called from view when user clicked on map
        vm.checkPosition = function(e) {
          console.log(e.latLng);
          // Create the marker
          var marker = new google.maps.Marker({position: e.latLng, map: map});
          map.panTo(e.latLng);
        };
      });
      return vm;
  });

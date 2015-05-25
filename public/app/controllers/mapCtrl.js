angular.module('mapCtrl',['leaflet-directive', 'rideService'])
  .controller('mapController', [ "$scope", "leafletData", "$http", function($scope, leafletData, $http) {
            var vm = this;
            var layer;

            vm.type='create';

            angular.extend($scope, {
                center: {
                    autoDiscover: true,
                    zoom: 16
                },
                controls: {
                    draw: {circle: false, rectangle: false, polygon: false, marker: false}
                }
           });
           leafletData.getMap().then(function(map) {
              var drawnItems = $scope.controls.edit.featureGroup;
              map.on('draw:created', function (e) {
                layer = e.layer;
                drawnItems.addLayer(layer);
                console.log(layer._latlngs)
              });
           });
           vm.saveRide = function(){
             var latlngObj = layer._latlngs;
             var latlngArry = [];
             for(prop in latlngObj){
               latlngArry.push([latlngObj[prop].lat, latlngObj[prop].lng]);
             }
             vm.rideData.route = latlngArry;

             vm.processing=true;
             vm.message = '';
            $http.post('/api/rides/', vm.rideData);


           };
       }]);

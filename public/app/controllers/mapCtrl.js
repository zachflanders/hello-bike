angular.module('mapCtrl',['leaflet-directive', 'activityService'])
  .controller('mapController',  function( leafletData, $http) {
            var vm = this;
            var layer;

            vm.type='create';

            angular.extend(vm, {
                center: {
                    autoDiscover: true,
                    zoom: 16
                },
                controls: {
                    draw: {circle: false, rectangle: false, polygon: false, marker: false}
                }
           });
           leafletData.getMap().then(function(map) {
              var drawnItems = vm.controls.edit.featureGroup;
              map.on('draw:created', function (e) {
                layer = e.layer;
                drawnItems.addLayer(layer);
                console.log(layer._latlngs)
              });
           });
           vm.saveActivity = function(){
             console.log('working');
             var latlngObj = layer._latlngs;
             var latlngArry = [];
             for(prop in latlngObj){
               latlngArry.push([latlngObj[prop].lat, latlngObj[prop].lng]);
             }
             vm.activityData.route = latlngArry;

             vm.processing=true;
             vm.message = '';
            $http.post('/api/activities/', vm.activityData);


           };
       });

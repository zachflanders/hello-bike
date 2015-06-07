angular.module('activityCtrl',['leaflet-directive', 'activityService'])
  .controller('activityController',  function(Activity,  leafletData){
    var vm = this;
    vm.processing = true;

  // grab all the users at page load
    Activity.all() .success(function(data) {
        // when all the users come back, remove the processing variable
        vm.processing = false;
        // bind the users that come back to vm.users
        vm.activities = data;


  });
  vm.deleteActivity =function(id){
    console.log('delete!');
    vm.processing=true;
    Activity.delete(id)
      .success(function(data){
        Activity.all()
          .success(function(data){
            vm.processing = false;
            vm.activities = data;
          });
      });
  };
})
.directive('mapDirective', function() {
// return the directive link function. (compile function not needed)
return function(scope, element, attrs) {



// watch the expression, and alert the class.
//the directive has access to the whole element
scope.$watch(attrs.mapDirective, function(value) {

    var string = attrs.route;
    var stringArray = string.slice(1,string.length-1);
    var stringArray2 = [];
    while (stringArray.indexOf(']') > -1){
      stringArray2.push(stringArray.slice(1,stringArray.indexOf(']')));
      stringArray = stringArray.slice(stringArray.indexOf(']')+2, stringArray.length);
    };
    var array = [];
    stringArray2.forEach(function(entry){
      var thing = JSON.parse("[" + entry + "]");
      array.push(thing);
    });
    var div = document.getElementById(attrs.id);
    var map = L.map(attrs.id, { zoomControl:false }).setView([51.505, -0.09], 13);

    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var polyline = L.polyline(array).addTo(map);
    var bounds = polyline.getBounds();
    map.fitBounds(bounds);
});

}
})

.controller('activityCreateController', function(Activity, leafletData, $http, $location) {
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
  $location.path('/activities');


 };
})
.controller('activityEditController',function($routeParams, Activity, leafletData, $http, $location){
  var vm=this;
  vm.type='edit';
  var layer;
  console.log(vm);
  Activity.get($routeParams.activity_id)
    .success(function(data){
      console.log(data);
      vm.activityData = data;
    });
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
    Activity.update($routeParams.activity_id, vm.activityData)
      .success(function(data){
        vm.processing = false;
        vm.activityData = {};
        vm.message = data.message;

      });
      $location.path('/activities');
  };
});

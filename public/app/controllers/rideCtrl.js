angular.module('rideCtrl',['leaflet-directive', 'rideService'])
  .controller('rideController', function(Ride, leafletData){
    var vm = this;
    vm.processing = true;
    console.log('hello');
  // grab all the users at page load
    Ride.all() .success(function(data) {
        // when all the users come back, remove the processing variable
        vm.processing = false;
        // bind the users that come back to vm.users
        vm.rides = data;
        console.log(vm.rides);

  });
  angular.extend(vm, {
      center: {
          autoDiscover: true,
          zoom: 16
      },
      controls: {
          draw: {circle: false, rectangle: false, polygon: false, marker: false}
      },
      polyline: {
        marker1:{lat:39.103, lng:-94.583, focus: true}
      }
 });


 //L.polyline(vm.route).addTo(map);
  vm.deleteRide =function(id){
    console.log('delete!');
    vm.processing=true;
    Ride.delete(id)
      .success(function(data){
        Ride.all()
          .success(function(data){
            vm.processing = false;
            vm.rides = data;
          });
      });
  };
})
.controller('rideCreateController', function(Ride) {
  var vm = this;
// variable to hide/show elements of the view // differentiates between create or edit pages
  vm.type = 'create';
  // function to create a user
  vm.saveRide = function() {
    console.log(vm.rideData);
    vm.processing = true;
    // clear the message
    vm.message = '';
    // use the create function in the userService
    Ride.create(vm.rideData)
      .success(function(data) {
        vm.processing = false;
        // clear the form
        vm.rideData = {};
        vm.message = data.message;
      });
  };
})
.controller('rideEditController',function($routeParams, Ride){
  var vm=this;
  vm.type='edit';
  Ride.get($routeParams.ride_id)
    .success(function(data){
      console.log(data);
      vm.rideData = data;
    });
  vm.saveRide = function(){
    console.log('working');
    vm.processing=true;
    vm.message = '';
    Ride.update($routeParams.ride_id, vm.rideData)
      .success(function(data){
        vm.processing = false;
        vm.rideData = {};
        vm.message = data.message;
      });
  };
});

angular.module('activityCtrl',['leaflet-directive', 'activityService'])
  .controller('activityController', function(Activity, leafletData){
    var vm = this;
    vm.processing = true;
    console.log('hello');
  // grab all the users at page load
    Activity.all() .success(function(data) {
        // when all the users come back, remove the processing variable
        vm.processing = false;
        // bind the users that come back to vm.users
        vm.activities = data;
        console.log(vm.activities);

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
.controller('activityCreateController', function(Activity) {
  var vm = this;
// variable to hide/show elements of the view // differentiates between create or edit pages
  vm.type = 'create';
  // function to create a user
  vm.saveActivity = function() {
    console.log(vm.activityData);
    vm.processing = true;
    // clear the message
    vm.message = '';
    // use the create function in the userService
    Activity.create(vm.activityData)
      .success(function(data) {
        vm.processing = false;
        // clear the form
        vm.activityData = {};
        vm.message = data.message;
      });
  };
})
.controller('activityEditController',function($routeParams, Activity){
  var vm=this;
  vm.type='edit';
  Activity.get($routeParams.activity_id)
    .success(function(data){
      console.log(data);
      vm.activityData = data;
    });
  vm.saveActivity = function(){
    console.log('working');
    vm.processing=true;
    vm.message = '';
    Activity.update($routeParams.activity_id, vm.activityData)
      .success(function(data){
        vm.processing = false;
        vm.activityData = {};
        vm.message = data.message;
      });
  };
});

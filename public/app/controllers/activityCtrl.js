angular.module('activityCtrl',['leaflet-directive', 'activityService'])
  .controller('activityController',  function(Activity,  leafletData){
    var vm = this;
    vm.processing = true;
    console.log('hello');
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
    console.log(stringArray, stringArray.indexOf(']'));
    var stringArray2 = [];
    while (stringArray.indexOf(']') > -1){
      stringArray2.push(stringArray.slice(1,stringArray.indexOf(']')));
      stringArray = stringArray.slice(stringArray.indexOf(']')+2, stringArray.length);
    };
    console.log(stringArray2);
    var array = [];
    stringArray2.forEach(function(entry){
      var thing = JSON.parse("[" + entry + "]");
      array.push(thing);
    });
    console.log(array);

    var div = document.getElementById(attrs.id);
    console.log(div);
    var map = L.map(attrs.id).setView([51.505, -0.09], 13);

    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var polyline = L.polyline(array).addTo(map);
});

}
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

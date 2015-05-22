angular.module('userCtrl',['userService'])
.controller('userController', function(User){
  var vm = this;
// set a processing variable to show loading things
vm.processing = true;
  // grab all the users at page load
User.all() .success(function(data) {
      // when all the users come back, remove the processing variable
vm.processing = false;
      // bind the users that come back to vm.users
      vm.users = data;
    });
})

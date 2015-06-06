angular.module('mainCtrl',[])
  .controller('mainController', function($rootScope, $location, Auth){
    var vm = this;

    //get info if a person is logged in
    vm.loggedIn = Auth.isLoggedIn();

    $rootScope.$on('$routeChangeStart', function(){
      vm.loggedIn = Auth.isLoggedIn();

     Auth.getUser()
        .success(function(data){
          vm.user = data;
        });
    });

    vm.doLogin = function(){
      vm.processing=true;
      vm.error='';
      Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data){
          if(data.success){
            $location.path('/rides/' + vm.loginData.username);
          }else{
            vm.error = data.message;
          }
          vm.processing=false;

        });

    };

    vm.doLogout = function(){
      Auth.logout();
      vm.user = {};
      $location.path('/login');
    };

  });

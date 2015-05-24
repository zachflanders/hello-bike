angular.module('bikeApp',[
 'ngAnimate',
 'authService',
  'app.routes',
  'mainCtrl',
  'userCtrl',
  'userService'
])

.config(function($httpProvider) {
// attach our auth interceptor to the http requests
  $httpProvider.interceptors.push('AuthInterceptor');
});

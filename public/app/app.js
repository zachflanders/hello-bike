angular.module('bikeApp',[
 'ngAnimate',
 'rideService',
 'authService',
  'app.routes',
  'mainCtrl',
 'rideCtrl',
  'userCtrl',
  'mapCtrl',
  'userService',

])

.config(function($httpProvider) {
// attach our auth interceptor to the http requests
  $httpProvider.interceptors.push('AuthInterceptor');
});

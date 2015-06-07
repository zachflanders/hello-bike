angular.module('bikeApp',[
 'ngAnimate',
 'activityService',
 'authService',
  'app.routes',
  'mainCtrl',
 'activityCtrl',
  'userCtrl',
  'userService',

])

.config(function($httpProvider) {
// attach our auth interceptor to the http requests
  $httpProvider.interceptors.push('AuthInterceptor');
});

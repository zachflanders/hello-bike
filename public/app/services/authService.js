angular.module('authService', [])

//Factory to login and get information
.factory('Auth',function($http, $q, AuthToken){
  var authFactory = {};

  authFactory.login = function(username, password){
    return $http.post('/api/authenticate', {
      username: username,
      password: password
    })
    .success(function(data){
      AuthToken.setToken(data.token);
      return data;
    });
  };
  authFactory.logout = function(){
    //clear the token
    AuthToken.setToken();
  };
  //Check to see if a user is logged in
  authFactory.isLoggedIn = function(){
    if(AuthToken.getToken()){
      return true;}
    else{
      return false;}
  };
  //get the logged in user
  authFactory.getUser = function(){
    if(AuthToken.getToken()){
      return $http.get('/api/me', {cache: true});}
    else{
      return $q.reject({message: 'User has no token.'});}
  };

  return authFactory;

})


//Factory for handling tokens
//inject $window to store token client side
.factory('AuthToken',function($window){
  var authTokenFactory = {};

  //get token out of local storage
  authTokenFactory.getToken= function(){
    return $window.localStorage.getItem('token');
  };

  //function to set token or clear token
  authTokenFactory.setToken = function(token){
    if(token){
      $window.localStorage.setItem('token', token);
    }else{
      $window.localStorage.removeItem('token');
    }

  };

  return authTokenFactory;

})

//Factory for integrating token into requests
.factory('AuthInterceptor',function($q, $location, AuthToken){
  var interceptorFactory = {};

  interceptorFactory.request = function(config){
    var token = AuthToken.getToken();
    if (token){
      config.headers['x-access-token'] = token;}

    return config;
  };

  interceptorFactory.responseError = function(response){

    if(reponse.status == 403){
      AuthToken.setToken();
      $location.path('/login');
    }
    return $q.reject(response);

  };

  return interceptorFactory;

})

angular.module('userService',[])
  .factory('User', function($http){
    var userFactory = {};

    //Get a single user
    userFactory.get = function(id){
      return $http.get('/api/users/' + id);
    };

    //Get all the users
    userFactory.all = function(){
      return $http.get('/api/users/');
    };

    //Create a user
    userFactory.create = function(userData){
      console.log(userData);
      return $http.post('/api/users/', userData);
    };

    //Update a user
    userFactory.update = function(id, userData){
      return $http.put('/api/users/'+ id, userData);
    };

    //Delete a user
    userFactory.delete = function(id){
      return $http.delete('/api/users/'+id);
    };

    //return our entire User Factory object
    return userFactory;

  });

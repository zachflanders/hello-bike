angular.module('rideService', [])

  .factory('Ride', function($http){
    var rideFactory = {};

    //Get a single user
    rideFactory.get = function(id){
      console.log(id);
      return $http.get('/api/rides/id/' + id);
    };

    //Get all the users
    rideFactory.all = function(){
      return $http.get('/api/rides/');
    };

    //Create a user
    rideFactory.create = function(rideData){
      console.log(rideData);
      return $http.post('/api/rides/', rideData);
    };

    //Update a user
    rideFactory.update = function(id, rideData){
      return $http.put('/api/rides/id/'+ id, rideData);
    };
    rideFactory.delete = function(id){
      return $http.delete('/api/rides/id/'+id);
    };



    //return our entire User Factory object
    return rideFactory;

  });

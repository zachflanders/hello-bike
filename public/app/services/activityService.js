angular.module('activityService', [])

  .factory('Activity', function($http){
    var activityFactory = {};

    //Get a single user
    activityFactory.get = function(id){
      console.log(id);
      return $http.get('/api/activities/id/' + id);
    };

    //Get all the users
    activityFactory.all = function(){
      return $http.get('/api/activities/');
    };

    //Create a user
    activityFactory.create = function(activityData){
      console.log(activityData);
      return $http.post('/api/activities/', activityData);
    };

    //Update a user
    activityFactory.update = function(id, activityData){
      return $http.put('/api/activities/id/'+ id, activityData);
    };
    activityFactory.delete = function(id){
      return $http.delete('/api/activities/id/'+id);
    };



    //return our entire User Factory object
    return activityFactory;

  });

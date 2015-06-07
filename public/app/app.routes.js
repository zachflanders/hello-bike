angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/pages/home.html'
		})

		// login page
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   		controller  : 'mainController',
    	controllerAs: 'login'
		})

		// show all users
		.when('/users', {
			templateUrl: 'app/views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
		})

		// form to create a new user
		// same view as edit page
		.when('/users/create', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

		// page to edit a user
		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})
		// show all rides for a user


		// form to create a new user
		// same view as edit page
		.when('/activities/create', {
			templateUrl: 'app/views/pages/activities/activities-single.html',
			controller: 'mapController',
			controllerAs: 'map'

		})
		.when('/activites/id/:activity_id', {
			templateUrl: 'app/views/pages/activities/activities-single.html',
			controller: 'activityEditController',
			controllerAs: 'activity'
		})
		.when('/activities/:username', {
			templateUrl: 'app/views/pages/activities/activities-all.html',
			controller: 'activityController',
			controllerAs: 'activity'
		})

	$locationProvider.html5Mode(true);

});

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
		.when('/rides/create', {
			templateUrl: 'app/views/pages/rides/rides-single.html',
			controller: 'mapController',
			controllerAs: 'map'

		})
		.when('/rides/id/:ride_id', {
			templateUrl: 'app/views/pages/rides/rides-single.html',
			controller: 'rideEditController',
			controllerAs: 'ride'
		})
		.when('/rides/:username', {
			templateUrl: 'app/views/pages/rides/rides-all.html',
			controller: 'rideController',
			controllerAs: 'ride'
		})

	$locationProvider.html5Mode(true);

});

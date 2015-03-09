// created service so that we can use this service for setting up app level scope 
var myApp = angular.module('myApp', ['App-Fac-Directive', 'App-Service', 'ngRoute']);

 // configure our routes
    myApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'MainCtrl'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
    });

myApp.controller('MainCtrl', function($scope) {

        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });


	

    myApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    myApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

	
	




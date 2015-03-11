// created service so that we can use this service for setting up app level scope 
var myApp = angular.module('myApp', ['layout-left-panel', 'ngRoute', 'Forms-Directive']);

myApp.controller('layoutCtrl', function($scope) {

		$scope.template = {
			"layout": "layout/view/layout.html",
		}

 });


	
	




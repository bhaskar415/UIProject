// created service so that we can use this service for setting up app level scope 
var myApp = angular.module('myApp', ['UIPanel-Directive', 'Forms-Directive']);

myApp.controller('layoutCtrl', function($scope) {

		$scope.template = {
			"layout": "layout/Layout.html",
		}

 });


	
	




var myApp = angular.module('Forms-Controller', ['Forms-Service']);

myApp.controller("FormsController",
			function($scope, FormsService) {
     
			$scope.forms = [];
			
			//READ All user froms List Starts  
			   $scope.getAllUserFroms = function() {
     			FormsService.getForms($scope); // $scope.forms is set in the service.js because have issue in getting the return from httpCURDOperations. because of this limitation we are passing $scope to get function and setting it in the service layer 
				}
			//READ All user froms List Starts 
	}
);

	

	
	




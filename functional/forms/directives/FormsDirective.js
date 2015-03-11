var myApp = angular.module('Forms-Directive', ['Forms-Controller']);

myApp.directive('userForms', function(){  
  return {
    restrict: 'EA', 
	scope: { url: '@', // if it is a object substitution
			columns: '=',
			 },	 
	 controller:"FormsController",		
     templateUrl: 'view/UserFormsView.html'
  };
});
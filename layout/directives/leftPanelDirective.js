var leftPanel = angular.module('layout-left-panel', []);

leftPanel.directive('leftPanel', function(){  
  return {
    restrict: 'EA', 
	scope: { url: '@', // if it is a object substitution
			columns: '=',
			 },	 
	 controller:"",		
     templateUrl: 'layout/view/components/leftPanel.html'
  };
});
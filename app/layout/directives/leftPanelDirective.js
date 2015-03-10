var leftPanel = angular.module('layout-left-panel', []);

leftPanel.directive('leftPanel', function(){  
var htmlTemplate = "<div>"+
                      "<p>Im a junk ass </p>"+
								 "</div>";
 
  return {
    restrict: 'EA', 
	scope: { url: '@', // if it is a object substitution
			columns: '=',
			 },	 
	 controller:"",		
     templateUrl: 'app/layout/html/components/leftPanel.html'
  };
});
var myApp = angular.module('UIPanel-Directive', ['UIPanel-Controller']);

myApp.directive('uiPanel', function(){  
var htmlTemplate="";
htmlTemplate += "<div class=\"panel panel-primary\">";
htmlTemplate += "  <div class=\"panel-heading\">";
htmlTemplate += " 	<h3 class=\"panel-title\">{{title}}<\/h3> <br><br>";
htmlTemplate += "  <\/div>";
htmlTemplate += "  <div class=\"panel-body\">";
htmlTemplate += "	  ";
htmlTemplate += "       <ng-transclude><\/ng-transclude>";
htmlTemplate += "	   ";
htmlTemplate += " <\/div>";
htmlTemplate += "<\/div>  ";
  return {
    restrict: 'EA',
	transclude: true,	
	scope: { title: '@' // if it is a object substitution
			 },	 
	 controller:"UIPanelController",		
     template: htmlTemplate   
  };
});
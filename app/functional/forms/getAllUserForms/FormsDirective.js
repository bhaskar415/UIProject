var myApp = angular.module('Forms-Directive', ['Forms-Controller']);

myApp.directive('userFormsNotUsed', function(){  
  return {
    restrict: 'EA', 
	scope: { url: '@', // if it is a object substitution
			columns: '=',
			 },	 
	 controller:"FormsController",		
     templateUrl: 'getAllUserForms/UserFormsView.html'
  };
});

myApp.directive('userForms', function(){  
var htmlTemplate = "<div>"+
						"<button ng-click='getAllUserFroms()' class='btn btn-info btn-xs'><span class='glyphicon glyphicon-play'></span>All Forms</button>"+
							"<button type='button' class='btn btn-success btn-xs' ng-click='addFormShowView()'><span class='glyphicon glyphicon-plus'></span>Form</button><br><br>"+
							"<p><input type='text' ng-model='searchQuery' class='search-query' placeholder='Search'></p> "+
						 "<table class='table table-striped '>"+
						"<tr ng-repeat='form in forms | filter:searchQuery'>"+					
							 "<td><a ng-click='getFormDetails( form )'>{{ form.formName }} </a></td>"+
							"<td><a ng-click='deleteForm( form )' class='text-danger'> <span class='glyphicon glyphicon-trash'></span> </a></td>"+
							"</tr>"+
							"</table>"+
							"</tr>"+
							"</tbody>"+
							"</table>"+
							"</div>";

  return {
    restrict: 'EA', 
	scope: { url: '@', // if it is a object substitution
			columns: '=',
			 },	 
	 controller:"FormsController",		
     template: htmlTemplate   
  };
});
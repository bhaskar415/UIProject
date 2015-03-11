var myApp = angular.module('Forms-Service', ['http-CURD-Service', 'App-Constants-Service']);

myApp.service(
			"FormsService",
			function( $http, $q, ConstructUrls, httpCURDOperations) {				
		
		var _AllApplicationSearchBaseUrl = '/forms';
		var _FormDataSaveBaseUrl = '/formsDataImpl/cascadeSave';
		
		var url = ConstructUrls.makeUrl(_AllApplicationSearchBaseUrl)

		this.getForms = function($scope) {
			httpCURDOperations.Get(url).then(
                            function( data ) {
							$scope.forms = data._embedded.forms;
                            });
			}


		
	
 }
);		

myApp.service(
			"constructUrls",
			function() {				

			var baseUrl = 'http://10.215.192.72:8080';
			//var baseUrl = 'http://192.168.1.18:8080';
			//var baseUrl = 'http://localhost:8080';
			var _calledUrl = '';
			var _finalUrl = '';

			this.makeUrl = function(calledUrl) { 
               _calledUrl = calledUrl;
			   _finalUrl = baseUrl + calledUrl;
					return _finalUrl;		
			
			};
			
			this.baseUrl = function() { 
			   _finalUrl = baseUrl;
					return _finalUrl;		
			
			};
		
			
			}
		);

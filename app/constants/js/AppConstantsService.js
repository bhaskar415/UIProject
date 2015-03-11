var myApp = angular.module('App-Constants-Service', []);

myApp.service(
			"ConstructUrls",
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
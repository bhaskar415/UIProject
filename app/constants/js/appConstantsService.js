var myApp = angular.module('app-constants', []);

myApp.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call 
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


myApp.service(
			"httpCURDOperations",
			function($http, $q) {				
		
		this.Get = function( url ) {
			var request = $q.defer();
			$http({
					method: "get",
					url: url,
					params: {
						action: "get"
					}
				}).success(function(data){
				request.resolve(data); // retriving particular element dynamically by passing the element name
				}).error(function(){
				request.reject('There is an error')
				})

				return request.promise;					
			};
		
		this.Add = function( url, data ) { 
  
              var request = $q.defer();
				$http({
						method: "post",
						url: url,
						params: {
							action: "add"
						},
						data: data
					}).success(function(data){
					request.resolve(data);
					}).error(function(){
					request.reject('There is an error')
					})

					return request.promise;		
			
			};
		
		this.Delete = function( url ) {			  

      		var request = $q.defer();				
				var request = $http({
						method: "delete",
						url: url,
						params: {
							action: "delete"
						}
					}).error(function(){
					request.reject('There is an error')
					}) 
					
			};

		this.Update = function( url, data ) { 
				
				var request = $q.defer();				
				var request = $http({
						method: "patch",
						url: url,
						params: {
							action: "update"
						},
						data: data
					}).error(function(){
					request.reject('There is an error')
					}) 
					
			};			
			
			}
		)
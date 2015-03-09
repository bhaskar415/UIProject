var myApp = angular.module('App-Service', ['http-CURD-Service']);


myApp.service(
			"tablesService",
			function( $http, $q, constructUrls, httpCURDOperations) {				

		this.getAllTables = function($scope) {
		
			var _AllApplicationSearchBaseUrl = '/appTables';
			var url = constructUrls.makeUrl(_AllApplicationSearchBaseUrl)
			httpCURDOperations.Get(url).then(
                            function( data ) {
							$scope.tables = data._embedded.appTables;
                            });
			}
				
		this.AddTables = function( newTable ) { 

			  	var _AllApplicationSearchBaseUrl = '/appTables';
  
                var request = $q.defer();
				$http({
						method: "post",
						url: constructUrls.makeUrl(_AllApplicationSearchBaseUrl),
						params: {
							action: "add"
						},
						data: newTable
/*						{
								  "tableName" : "APPLICATIONS",
								  "url" : "http://localhost:8080/application",
								  "dateCreated" : "2014-09-08T15:07:00.394+0000",
								  "dateUpdated" : "2014-09-08T15:07:00.394+0000",
  								  "columns" : ["ID", "name", "description", "level", "nodeType", "exclusiveGroup", "exclusive", "leafNode", "displayable", "active", "idName", "provisionable"]	
						}
						*/
						//name,description,level,nodeType,exclusiveGroup,exclusive,leafNode,displayable,active,,facilityName,sequenceID
					}).success(function(data){
					request.resolve(data);
					}).error(function(){
					request.reject('There is an error')
					})

					return request.promise;		
			
			};
			
		this.updateTable = function( application ) { 
				
				var applicationUpdateUrl = application._links.self.href;
				
                
				
				var request = $q.defer();				
				var request = $http({
						method: "patch",
						url: applicationUpdateUrl,
						params: {
							action: "update"
						},
						data: application
					}).success(function(data){
					request.resolve(data);
					}).error(function(){
					request.reject('There is an error')
					}) 
					
			};
			
			
			this.deleteTable = function( table ) { 
			  
				var tableDeleteUrl = table._links.self.href;
				
                var request = $q.defer();				
				var request = $http({
						method: "delete",
						url: tableDeleteUrl,
						params: {
							action: "delete"
						},
						data: table
					}).success(function(data){
					request.resolve(data);
					}).error(function(){
					request.reject('There is an error')
					}) 
					
			};

				
			
			}
		);		
	
		
myApp.service(
			"tableDetailsService",
			function( $http, $q, constructUrls, httpCURDOperations) {				
		
		var _AllApplicationSearchBaseUrl = '/forms';
		var _FormDataSaveBaseUrl = '/formsDataImpl/cascadeSave';
		
		var url = constructUrls.makeUrl(_AllApplicationSearchBaseUrl)

		this.getForms = function($scope) {
			httpCURDOperations.Get(url).then(
                            function( data ) {
							$scope.forms = data._embedded.forms;
                            });
			}


		
		this.addform = function(data) {		
  				httpCURDOperations.Add(url, data);
			}
			
		this.deleteForm = function( deleteData ) {
			 var formDeleteUrl = deleteData._links.self.href;
         	 httpCURDOperations.Delete(formDeleteUrl);
		}
		
		this.updateTableData = function( url, data ) {
		
			var modifiedURL = url.replace("http://localhost:8080/", constructUrls.baseUrl()+"/"); //this is becasue we are storing localhost url as final url in DB and we are using same to retrive the data so we have to modify the url if using dfferent server name as base url 
			httpCURDOperations.Update(modifiedURL, data);
		}

 		this.addFormData = function(data) {				
			var url = constructUrls.makeUrl(_FormDataSaveBaseUrl);	
			httpCURDOperations.Add(url, data);			
			}
				
		
		this.getFormData = function(url, $scope) {
			httpCURDOperations.Get(url).then(
                            function( data ) {
							$scope.formData = data._embedded.formsData;
                            });
			}
 }
);		
			
		
myApp.service(
			"constructUrls",
			function() {				

			var baseUrl = 'http://108.216.90.220:8080';
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
		

// created service so that we can use this service for setting up app level scope 
var myApp = angular.module('myApp', ['App-Fac-Directive', 'App-Service']);

myApp.controller(
			"MainCtrl",
			function($scope, tablesService, tableDetailsService, $timeout, constructUrls) {
     
			$scope.forms = [];
			$scope.form = [];
			$scope.newData = {};
			$scope.formData = [];
			
			
			
			$scope.table = [];
			$scope.columns =[];
			$scope.columnNames =[];
			$scope.showTableDetails = false;
			$scope.data = [];
			$scope.addTableInd = false;
			$scope.showDataTable = false;

			//READ All Tables List Starts  
			   $scope.getAllTables = function() {
     			tableDetailsService.getForms($scope); // $scope.forms is set in the service.js because have issue in getting the return from httpCURDOperations. because of this limitation we are passing $scope to get function and setting it in the service layer 
				}
			//READ All Tables List Starts 

			//ADD New Table function Starts
	     	$scope.addForm = function( newForm ) {
					newForm.data=[];	// added this empty data variable to construct a valid JSON object so that Forms get created with out error if not POST req is not accepted because of the incomplete mapping to the assigned object in Spring backend		
		 			tableDetailsService.addform(newForm);
							$scope.addTableInd = false; // to hide the form div after adding new table
							$scope.getAllTables();	// to refresh the data to show new list				
				};
				
			$scope.addEmptyColumn = function( ) {
				$scope.nt1.push({});
			
			}

			//Add new Tables function to show new form on UI which will change the view
	     	$scope.addFormShowView = function() {	 			
				$scope.addTableInd = true;
				$scope.nt1 = [{}];
			};
			//Cancel Add new Tables function to reset some indicators which will change the view
	     	$scope.addFormCancelView = function() {	 			
				$scope.addTableInd = false;
				
			};
			//ADD Table function Ends
			
			
			//DELETE specific Table from main listing table Starts 
	     	$scope.deleteForm = function( form ) {
				
				tableDetailsService.deleteForm( form );
				//refresh the data after delayed time so that data gets deleted in backend
				$timeout(function() {
                   $scope.getAllTables();			
          		  }, 500);	
				  
				};
			//DELETE specific Table from main listing table Ends 
			
			//READ specific Form DETAILS from main listing $scope.forms Starts 
	     	$scope.getFormDetails = function( form ) {			
				$scope.form = form;		
	          	idUrl = $scope.form._links.self.href
				constructUrls.baseUrl()
				id = idUrl.replace(constructUrls.baseUrl() + "/forms/", "");
			$scope.newData = {"formId": id};
			$scope.formDataUrl = $scope.form._links.formData.href
			$scope.tab = 1;
		  };
			//READ specific Form DETAILS from main listing $scope.forms Ends 

	
	
			//ADD new Form Data function Starts
	     	$scope.addFormData = function( newFormData ) {	 			
			  tableDetailsService.addFormData( newFormData );
			};
	     	
			//ADD new Form Data function ends
	


	      //READ specific Form DATA Starts
	     	$scope.getFormData = function() {
			$scope.data = [];			
			var formDataURL = $scope.formDataUrl;
				tableDetailsService.getFormData( formDataURL , $scope );
				
				angular.forEach($scope.formData, function(data) {
									$scope.data.push(data.data										
				   	  );
					  
					  
		
				});	
				
				
				console.log($scope.data);
				};
			//READ specific Form DATA Ends




			

			
		 	//panel tab switching logic Starts 
				$scope.tab = 1; // initialized to second tab which is the default tab 
               
			   $scope.selectTab = function(setTab){ //for switching to selected tab
					$scope.tab = setTab;
					
					//Automically calling the getTableData function to load on of data tab which is 3
					if ($scope.tab === 2){
					   $scope.getFormData();
					}
					
				}
				$scope.isSelected = function(checkTab){ //for highlighting the selected tab
					return $scope.tab === checkTab;
				} 
			//panel tab switching logic Ends 
	

		
		
			
	}
);

	

	
	




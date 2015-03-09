var table = angular.module('ui-table', ['ui.grid', 'ui.grid.edit', 'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.resizeColumns', 'http-CURD-Service']);


table.controller(
			"TableHttpCtrl",
			function($scope, $timeout, uiGridConstants, httpCURDOperations) {


			$scope.newData = {};
 
 //this function is invoke if any link in the grid is clicked. This config is done in the colDefs as cellTemplate:'<button ng-click="getExternalScopes().showMe()">Click Me</button>'. Also in the <ui-grid external-scopes="myViewModel"> element in the main template as external-scopes="myViewModel"
     $scope.myViewModel = {
    someProp:'abc',
    showMe : function(){
       alert(this.someProp);
    }
 };
	 
	 //READ specific Table DATA of selected table from table listing Starts 
	     	$scope.getTableData = function(url) {				

				var tableDataURL = url;
				var pageNo = pagingOptions.pageNumber-1;
				var pageSize = pagingOptions.pageSize;
				 var pagingURL = tableDataURL +'?page='+ pageNo + '&size='+pageSize;
				httpCURDOperations.Get( pagingURL ).then(
						function( data ) {

						var tableDataAttribute  = tableDataURL.replace("http://localhost:8080/",""); //logic for getting particular data from JSON object by passing the table name dynamically 

						$scope.data = data._embedded[tableDataAttribute];
						$scope.paging =  data.page;
						var totalElements = $scope.paging.totalElements;
						$scope.showDataTable = true;


						//setting dynamic columns and data to the ui-grid Starts
						$scope.gridOpts.columnDefs	= []; // need to clear columns list so that if its run next time it will not append the columns instead sets columns every time 
								
					
						$timeout( function() {
								angular.forEach($scope.columns, function(column) {
							
							$scope.column = column;
			            /*
						//V0.1 basic dynamic columns so that column and data binding value is same Starts
						$scope.gridOpts.columnDefs.push({
								name: column,
								enableCellEdit: true
						  });
						//V0.1 basic dynamic columns so that column and data binding value is same Starts
						*/	
						
                       //V0.2 For dynamic name and dynamic field binding Starts
						if(column.field != null){
						$scope.gridOpts.columnDefs.push({
								displayName: column.name,
								field: column.field,
								enableCellEdit: true,
								cellTemplate:'<a ng-click="getExternalScopes().showMe()" >{{col.displayName}}</a>'
						  });
						}else{
							$scope.gridOpts.columnDefs.push({
								name: column,
								enableCellEdit: true
						  });
						  }
						//V0.2 For dynamic name and dynamic field binding Starts
	  
							   });													  
							  });
						//setting dynamic columns and data to the ui-grid Ends
						
						//Setting paging options based on the data received	Starts									
						 $scope.gridOpts.totalItems = totalElements;
						 var firstRow = (pagingOptions.pageNumber - 1) * pagingOptions.pageSize;
						//Setting paging options based on the data received	Ends									

						 //setting data on the $scope.data Starts
						   $scope.gridOpts.data = $scope.data //   $scope.gridOpts.data = $scope.data.slice(firstRow, firstRow + pagingOptions.pageSize); //this will split all the data received based on the paging options
						 //setting data on the $scope.data Ends
						 
						}
					);		
				};
			//READ specific Table DATA of selected table from table listing Ends 
	 
	 
		  //DELETE Row DATA to specific Table of selected table Starts 
				$scope.deleteTableData = function() {	
				   var deleteDataIDURL = $scope.deleteData._links.self.href;

				   httpCURDOperations.Delete(deleteDataIDURL);

				 //refresh the data after delayed time so that data gets deleted in backend
					$timeout(function() {
					  $scope.getTableData($scope.url);			
					  }, 100);	
					  
				};
	 	  //DELETE Row DATA to specific Table of selected table ends 
	 	 
		     //UPDATE Row DATA to specific Table of selected table Starts 
				$scope.updateTableData = function( data ) {	
				    var updateDataIDURL = data._links.self.href;
					
				   httpCURDOperations.Update(updateDataIDURL, data);
	
				};
     	   //UPDATE Row DATA to specific Table of selected table ends 
	
		
		//ADD New Row DATA to specific Table of selected table Starts 
				$scope.addTableDataShowView = function() {
						$scope.showAddTableDataInd = true;
						$scope.formFields = [];
			          	$scope.formFields = $scope.columns;
						
				};
				$scope.addTableDataCancelView = function() {
						$scope.showAddTableDataInd = false;
					
				};
				$scope.addTablesData = function( newData ) {
				var tableDataURL = $scope.url;

				httpCURDOperations.Add(tableDataURL, newData);

				 //refresh the data after delayed time so that data gets deleted in backend
				$timeout(function() {
                   $scope.getTableData($scope.url);			
          		  }, 100);	
				  
				};  
			 
			  //ADD New Row DATA to specific Table of selected table ends 

		

		//ui-grid settings Starts
			var columnDefs1 = [{ name: 'name' }];
			var data1 = [{"name": "Misty"}];
			
			var pagingOptions = {
				pageNumber: 1,
				pageSize: 100,
				sort: null
			  };
			//initialization without this the UI coulmns css are not showing properly
			$scope.gridOpts = {
			
			// enabling selection Options
			enableRowSelection: true,  
			enableRowHeaderSelection: false, 
			
			// enabling paging options
			paginationPageSizes: [100, 500, 1000],
			paginationPageSize: 100,
			useExternalPagination: true,
			useExternalSorting: false,
			
			data: data1,
			columnDefs: columnDefs1,
			
		    onRegisterApi: function(gridApi) {
			  $scope.gridApi = gridApi;
			  
			  // for external sorting (not working yet) Starts 
			  $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
				if (sortColumns.length == 0) {
				  pagingOptions.sort = null;
				} else {
				  pagingOptions.sort = sortColumns[0].sort.direction;
				}
				//getPage();
			  });
			  // for external sorting (not working yet) Ends
			  
			  // for external paging Starts
			 gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
				pagingOptions.pageNumber = newPage;
				pagingOptions.pageSize = pageSize;
				//getPage();
					  $scope.getTableData($scope.url);			
			  });
			  
			  // for external paging Ends

			//for Row selecting Starts 
			 gridApi.selection.on.rowSelectionChanged($scope,function(row){
					var selectedRowData = angular.copy(row.entity);
					$scope.newData = selectedRowData;
					$scope.deleteData = selectedRowData;
			 });
			 
			 //multiple row selection data (not working)
			 gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
				var msg = 'rows changed ' + rows.length;
			  });
			
       		$scope.gridOpts.multiSelect = false; // for selecting multiple rows make it true
			
			//for Row selecting Ends			 
			 
			//for Grid Row update Starts
			//function is called when there is a change in any field data
			 gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
					 $scope.updateTableData(rowEntity); // rowEntity has whole object so that it can be saved once all the changes are done
      				 $scope.$apply();
			 });
			 
			//for Grid Row update Ends
		  
					  
			}
			
		};
		//ui-grid settings ends

    
	
	//setting dynamic columns and data to the ui-grid Starts
	$scope.$watch('columns', function(){
						$timeout( function() {
								angular.forEach($scope.columns, function(column) {
									$scope.gridOpts.columnDefs.push({
										name: column,
										enableCellEdit: false,
										width: 200
				   	  });
				});													  
			});  
		 });		
	//setting dynamic columns and data to the ui-grid Ends
	
	//setting data and paging option on the data Starts
		$scope.$watch('url', function(){
		var url = $scope.url;
		if(url){
			$scope.addTableDataShowView();
			$scope.newData = {};
			$scope.showTable = true;		
			$timeout(function() {
						 $scope.getTableData(url);		
					  }, 500);	
		}else{
			$scope.showTable = false; // NOT SHOW THE ENTIRE TABLE VIEW IF NOT DATA URL IS PASSED
		}
		
            }); 
			

					
	//setting data and paging option on the data Ends
     
});

table.directive('uiTableHttp', function(){  
var htmlTemplate = "<div ng-show='showTable'>"+
						"<br><br><div class='row'>"+
							"<div class='col-md-6'><div ng-hide='showAddTableDataInd'>&nbsp; &nbsp; <button class='btn btn-primary btn-sm' ng-click='addTableDataShowView()' ><span class='glyphicon glyphicon-plus'></span> Row</button></div> <div ng-show='showAddTableDataInd'> <button ng-click='addTablesData(newData)' class='btn btn-success btn-sm' ><span class='glyphicon glyphicon-plus'></span> Add</span></button>&nbsp; &nbsp;&nbsp; <button ng-click='addTableDataCancelView()' class='btn btn-default btn-sm' ><span class='glyphicon glyphicon-remove'></span> Hide Add</span></button></div> </div>"+
							"<div class='col-md-6'> <button ng-click='deleteTableData()' class='btn btn-Danger btn-sm' ><span class='glyphicon glyphicon-trash'></span> Row</button> <br><br></div>"+
						 "</div>"+
						"<div ng-show='showAddTableDataInd'>"+
					 //  <!--Dynamic table Form using diffrenent columns and ng-table tag Starts-->
							 "<table class='table'>"+
							"<tbody>"+
							"<tr class='success'>"+
							"<td ng-repeat='field in formFields'><input type='text' class='form-control input-sm width:800px'  name='newData[field]' ng-model='newData[field]' placeholder='{{field}}' required></td>"+
							"</tr>"+
							"</tbody>"+
							"</table>"+
							"<div class='alert alert-dismissable alert-warning'><button type='button' class='close' data-dismiss='alert'>x</button>Select any row to copy sample data into form</div>"+
							//<!--Dynamic table Form using diffrenent columns and ng-table tag Ends-->
						"</div>"+ 
					"<br><br> <div id='grid1' ui-grid='gridOpts' ui-grid-pagination ui-grid-edit ui-grid-selection ui-grid-resize-columns external-scopes='myViewModel' class='grid' ></div>"+
			 "</div>";
 
  return {
    restrict: 'EA', 
	scope: { url: '@', // if it is a object substitution
			columns: '=',
			 },	 
	 controller:"TableHttpCtrl",		
     //template: '<br> &nbsp; &nbsp; <button ng-click="addTableDataShowView()" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-plus"></span> Row</button> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; <button ng-click="deleteTableData()" class="btn btn-Danger btn-sm" ><span class="glyphicon glyphicon-trash"></span> Delete</button> <br><br> <div id="grid1" ui-grid="gridOpts" ui-grid-edit ui-grid-paging  ui-grid-selection class="grid" ></div>'
       template: htmlTemplate
  };
});




table.directive('uiSingleColumnTable', function(){  
  return {
    restrict: 'EA',
        scope: { data: '=', // if it is a object substitution
                 header: '@',		
                cssClass: '@' // if it is a String substitution
				},
		template: '<br><b>Total #: {{data.length}}</b></br><table class={{cssClass}}><tr><td><b>{{header}}</b></td></tr><tr ng-repeat="column in data"><td>{{column}}</td></tr></table>'
  };
});


table.directive('uiTableReadOnly', function(){  
var htmlTemplate = '<div id="grid1" ui-grid="gridOpts" class="grid"  ui-grid-edit ui-grid-selection ui-grid-resize-columns>';
  return {
    restrict: 'EA', 
	scope: { tableId: '=', // if it is a object substitution
			 columns: '=',
			 paging: "&"
				},	
	 controller: function ($scope, $timeout, uiGridConstants) {

		//ui-grid settings Starts
		   var columnDefs1 = [{ name: 'name' }];
	       var data1 = [{"name": "Misty"}];
			
			var pagingOptions = {
				pageNumber: 1,
				pageSize: 50,
				sort: null
			  };
			  
		   //initialization without this the UI coulmns css are not showing properly
			$scope.gridOpts = {
			
			// enabling selection Options
			enableRowSelection: true,  
			enableRowHeaderSelection: false, 
			// enabling paging options
			pagingPageSizes: [10, 20, 500],
			pagingPageSize: 10,
			useExternalPaging: false,
			useExternalSorting: false,
			data: data1,
			columnDefs: columnDefs1,
		    onRegisterApi: function(gridApi) {
			  $scope.gridApi = gridApi;
			
			$scope.gridOpts.multiSelect = false; // for selecting multiple rows make it true
			}
			
		};
		//ui-grid settings ends
    
	
	//setting dynamic columns and data to the ui-grid Starts
	$scope.$watch('columns', function(){
			$scope.gridOpts.columnDefs	= []; // need to clear columns list so that if its run next time it will not append the columns instead sets columns every time 
						$timeout( function() {
								angular.forEach($scope.columns, function(column) {
									$scope.gridOpts.columnDefs.push({
										name: column,
										enableCellEdit: false,
										width: 200
				   	  });
				});													  
			});  
		 });		
	//setting dynamic columns and data to the ui-grid Ends
	
	//setting data and paging option on the data Starts
		$scope.$watch('tableId', function(){
		
				$scope.gridOpts.totalItems = $scope.tableId.length;
				 var firstRow = (pagingOptions.pageNumber - 1) * pagingOptions.pageSize;
                $scope.gridOpts.data = $scope.tableId.slice(firstRow, firstRow + pagingOptions.pageSize);	
					
            });  
	//setting data and paging option on the data Ends
        },
		
	template: htmlTemplate
	//template: '<div ui-grid="{data:tableId}" class="myGrid"></div>'
  };
});




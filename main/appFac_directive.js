var appFac = angular.module('App-Fac-Directive', ['ui-table']);

appFac.directive('tableDetails', function(){
  return {
    restrict: 'E',
	template: '<div><br>Table Name: <input type="text" ng-model="table.tableName" ><br>URL: <input type="text" ng-model="table.url" ><br>Date Created: <input type="text" ng-model="table.dateCreated" > <br>Date Updated: <input type="text" ng-model="table.dateUpdated" > <br>Exclusive Group: <input type="text" ng-model="application.exclusiveGroup" > <br><input type="checkbox" ng-model="application.exclusive">{{application.exclusive}} <br><button ng-click="updateApplication()" >Update</button></div></div> <div>'
	//templateUrl: "C:\Users\bxy236\Desktop\website\OIM_Tree_Using_Angula\application-details.html"  //have CORS issue using the differnt html pages 
  };
});		
appFac.directive('formView', function(){
var htmlTemplate =  "<div >"+
						 "<button type='btn btn-primary' class='btn btn-primary' ng-click='addFormData(newData)'>Add</button>"+
					 //  <!--Dynamic table Form using diffrenent columns and ng-table tag Starts-->
							"<table class='table'>"+
							"<tbody>"+
							"<tr class='success' ng-repeat='field in form.fields' >"+
							"<td><input type='text' class='form-control input-sm width:800px'  name='newData[field]' ng-model='newData[field]' placeholder='{{field}}' required></td>"+
							"</tr>"+
							"</tbody>"+
							"</table>"+
							"<div class='alert alert-dismissable alert-warning'><button type='button' class='close' data-dismiss='alert'>x</button>Select any row to copy sample data into form</div>"+
							//<!--Dynamic table Form using diffrenent columns and ng-table tag Ends-->
						"</div>";
  return {
    restrict: 'E',
	//template: '<b>Facilities Details </b><br><table ng-table="tableParams" class="table"><tr><th>Name</th><th>Facility Name</th><th>Description</th><th>Displayable</th></tr><tr ng-repeat="facility in facilities"><td data-title="Name">{{facility.name}}</td><td data-title="Age">{{facility.facilityName}}</td><td>{{facility.description}}</td><td>{{facility.displayable}}</td></tr></table>'
	//templateUrl: "C:\Users\bxy236\Desktop\website\OIM_Tree_Using_Angula\application-details.html"  //have CORS issue using the differnt html pages 
	//template: '<br><b>Total # of Columns: {{columns.length}}</b></br><table class="table table-striped table-bordered table-condensed table-hover"><tr><td><b>Column Name</b></td></tr><tr ng-repeat="column in columns"><td>{{column}}</td></tr></table>'
	//template:'<ui-simple-list-table data="columns"></ui-simple-list-table>'
	// template: '<ui-single-column-table  data="columns" header="Column Name" css-class="table table-striped table-bordered table-condensed table-hover"></ui-single-column-table>' //using a custom reusable directive from the shared package (ui-table)
	template: htmlTemplate			
	};
});
appFac.directive('appfacPanel', function(){
  return {
    restrict: 'E',
	template: '<section><ul class="nav nav-tabs nav-justified"><li ng-class="{active:isSelected(1)}"> <a href ng-click="selectTab(1)">Form</a> </li><li ng-class="{active:isSelected(2)}"> <a href ng-click="selectTab(2)">Form Data</a> </li><li ng-class="{active:isSelected(3)}"> <a href ng-click="selectTab(3)">Form Details</a> </li> </ul></section><div class="panel" ng-show="tab === 1"><form-view></form-view></div><div class="panel" ng-show="tab === 2"><table-data></table-data></div><div class="panel" ng-show="tab === 3"><table-details></table-details></div>'
	//templateUrl: "C:\Users\bxy236\Desktop\website\OIM_Tree_Using_Angula\application-details.html"  //have CORS issue using the differnt html pages 
  };
});
appFac.directive('tableData', function(){
var htmlTemplate =  "<div >"+
					 //  <!--Dynamic table Form using diffrenent columns and ng-table tag Starts-->
							"<table class='table'>"+
							/*	
								"<tr>"+
									"<td class='success' ng-repeat='field in form.fields' >"+
										"{{field}}"+
									"</td>"+
								  "</tr>"+
								*/
								   "<tr ng-repeat='data1 in formData'>"+
									"<td  ng-repeat='data2 in data1.data' >"+
										 "{{data2.formFieldName}} : {{data2.formFieldData}}" +
									"</td>"+
								  "</tr>"+
								  
								/*	"<div ng-repeat='data1 in formData'>"+
									   "<div ng-repeat='data2 in data1.data'>"+
											
											 "{{data2.formFieldData}}"+
											
									   "</div>"+
									"</div>"+
								*/	
							"</table>"+
							//<!--Dynamic table Form using diffrenent columns and ng-table tag Ends-->
						"</div>";
  return {
    restrict: 'E',
		//template: '<p><input type="text" ng-model="searchQuery" class="search-query" placeholder="Search"></p> <b>Activity Details </b><br><b>Total # of Rows: {{data.length}}</b>  &nbsp; &nbsp; &nbsp; &nbsp; <button ng-click="getTableData()" >Get Data</button><table ng-table="tableParams" class="table"><thead><tr><th ng-repeat="column in columns">{{column}}</th></tr></thead><tbody><tr ng-repeat="row in data | filter:searchQuery "><td ng-repeat="column in columns">{{row[column]}} </td></tr></tbody></table>'
		//template: ' <br> &nbsp; &nbsp; <button ng-click="addTableDataShowView()" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-plus"></span> Row</button> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; <button ng-click="deleteTableData()" class="btn btn-Danger btn-sm" ><span class="glyphicon glyphicon-trash"></span> Delete</button> <br><br> <div id="grid1" ui-grid="gridOpts" ui-grid-edit ui-grid-paging  ui-grid-selection class="grid" ng-show="showDataTable" ></div>'
         //template: '<ui-table-http url="{{formDataUrl}}" columns="form.fields"></ui-table-http>'
		 template: htmlTemplate
	};
});

appFac.directive('dynamicTableColumns', function(){
  return {
    restrict: 'E',
	template: ''

	};
});
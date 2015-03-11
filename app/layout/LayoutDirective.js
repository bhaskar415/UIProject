var myApp = angular.module('Layout-Directive', ['Layout-Controller']);

myApp.directive('layout', function(){  
var htmlTemplate="";
htmlTemplate += "<div class=\"container-fluid\">";
htmlTemplate += "    ";
htmlTemplate += "";
htmlTemplate += "	<!--Header Nav bar Starts-->	 ";
htmlTemplate += "	<div class=\"row row-offcanvas row-offcanvas-left\">  ";
htmlTemplate += "        <header>";
htmlTemplate += "            <nav class=\"navbar navbar-default\">";
htmlTemplate += "            <div class=\"container\">";
htmlTemplate += "                <div class=\"navbar-header\">";
htmlTemplate += "                    <a class=\"navbar-brand\" href=\"#\">Dyno Forms<\/a>";
htmlTemplate += "                <\/div>";
htmlTemplate += "";
htmlTemplate += "                <ul class=\"nav navbar-nav navbar-right\">";
htmlTemplate += "                    <li><a href=\"#\/\"><i class=\"fa fa-home\"><\/i> Home<\/a><\/li>";
htmlTemplate += "                    <li><a href=\"#about\"><i class=\"fa fa-shield\"><\/i> About<\/a><\/li>";
htmlTemplate += "                    <li><a href=\"#contact\"><i class=\"fa fa-comment\"><\/i> Contact<\/a><\/li>";
htmlTemplate += "                <\/ul>";
htmlTemplate += "            <\/div>";
htmlTemplate += "            <\/nav>";
htmlTemplate += "        <\/header>";
htmlTemplate += "	<\/div>	";
htmlTemplate += "	<!--Header Nav bar Ends-->	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	<!--Site Title Header Starts-->	 ";
htmlTemplate += "	<div class=\"row row-offcanvas row-offcanvas-center\">  ";
htmlTemplate += "		<h1>Dyno Forms<\/h1>";
htmlTemplate += "	<\/div>	";
htmlTemplate += "	<!--Site Title Header Ends-->	 ";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	 ";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	<!--Main Body Starts-->";
htmlTemplate += "	<div class=\"row row-offcanvas row-offcanvas-left\">        ";
htmlTemplate += "       ";
htmlTemplate += "	   ";
htmlTemplate += "	   <!--Left panel Starts-->";
htmlTemplate += "	   <div class=\"col-sm-3 col-md-2 sidebar-offcanvas\" id=\"sidebar\" role=\"navigation\" style=\"background-color:#FFFFFF;\">";
htmlTemplate += "    		";
htmlTemplate += "			 <ng-transclude><\/ng-transclude>";
htmlTemplate += "			";
htmlTemplate += "	   <\/div>";
htmlTemplate += "	    <!--Left panel Ends-->";
htmlTemplate += "	   ";
htmlTemplate += "	   <!--Right panel main Starts-->";
htmlTemplate += "        <div class=\"col-sm-11 col-md-11 col-lg-10 main\" style=\"background-color:#FFFFFF;\">";
htmlTemplate += "			";
htmlTemplate += "			 <ng-transclude><\/ng-transclude>";
htmlTemplate += "			";
htmlTemplate += "		<\/div>  			";
htmlTemplate += "	    <!--Right panel main Starts-->		";
htmlTemplate += "		";
htmlTemplate += "		";
htmlTemplate += "	<\/div>  ";
htmlTemplate += "	<!--Main Body Ends-->";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	";
htmlTemplate += "	<!--Footer Starts-->";
htmlTemplate += "	<div class=\"row row-offcanvas row-offcanvas-center\">  ";
htmlTemplate += "	  <footer class=\"text-center\">";
htmlTemplate += "		<p>View the tutorial on <a href=\"#\">home<\/a><\/p>";
htmlTemplate += "	  <\/footer>";
htmlTemplate += "	<\/div>	";
htmlTemplate += "	<!--Footer ends-->";
htmlTemplate += "";
htmlTemplate += "";
htmlTemplate += "<\/div>";
htmlTemplate += "";
htmlTemplate += "";
htmlTemplate += "";
htmlTemplate += "";
htmlTemplate += "";


  return {
    restrict: 'EA',
	transclude: true,	
	scope: { },	 
	 controller:"LayoutController",		
     template: htmlTemplate   
  };
});
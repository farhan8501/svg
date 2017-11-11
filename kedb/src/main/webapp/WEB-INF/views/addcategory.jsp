<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>

	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
    <link rel="stylesheet" href="static/css/bootstrap.min.css">
 
 	<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> -->

    <link rel="stylesheet" href="static/css/BootSideMenu.css">
     <!-- <link type="text/css" rel="Stylesheet" href="http://ajax.microsoft.com/ajax/jquery.ui/1.8.6/themes/smoothness/jquery-ui.css"> -->

	<style type="text/css">
        .user {
            padding: 5px;
            margin-bottom: 5px;
            text-align: left;
        }
    </style>

    <!-- <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>  commented to include ajax version of jquery
    <script src="static/js/jquery-1.12.4.min.js"></script>-->
    <script src="static/js/jquery.min.js"></script>
    <script src="static/js/bootstrap.min.js"></script>
    <script src="static/js/BootSideMenu.js"></script>
   
	
<title>KEDB - Add New Category </title>
 

<meta name="GENERATOR" content="MSHTML 11.00.9600.18538">

<link rel="stylesheet" href="static/css/style.css">

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js" charset="utf-8"></script> -->
<script src="static/js/d3.min.js" charset="utf-8"></script>

		
</head>

<body data-page="appcategory" class="html front">

<%@ include file = "header.jsp" %>

	
	<div class="generic-container">

<div class="well lead">Add New Category Form</div>
		<form:form method="POST" commandName="appcategory"  class="form-horizontal">
			<div class="row">
				<div class="form-group col-md-12">
					<label class="col-md-3 control-lable" for="categoryName">Category
						Name</label>
					<div class="col-md-7">
						<form:input type="text" path="categoryName" id="categoryName"
							class="form-control input-sm" />
						<div class="has-error">
							<form:errors path="categoryName" class="help-inline" />
						</div>
					</div>
				</div>
			</div>
 
			 
			<div class="row">
				<div class="form-actions floatRight">
							<input type="submit" value="Save"
								class="btn btn-primary btn-sm" /> or <a
								href="javascript: history.go(-1)">Cancel</a>
				</div>
			</div>
		</form:form>
	</div>




</body>
</html>
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
    <link rel="stylesheet" href="static/css/style.css">
    
 
 	<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> -->


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
    <script src="static/js/admincollapsible.js"></script>

   
	
<title>KEDB - Admin </title>
 

<meta name="GENERATOR" content="MSHTML 11.00.9600.18538">

<link rel="stylesheet" href="static/css/style.css">


		
</head>

<body data-page="userlist" class="html front">

<%@ include file = "header.jsp" %>

 
 <div class="container-fluid bg-grey text-center">
  <div class="row">
    <div class="btn-group btn-group-justified" id="myCollapsible">
       <div class="btn-group">
       <a style="cursor: pointer;"  class="btn btn-info" id="userbtn"  data-parent="#sub" data-toggle="collapse" data-target="#userlist">Users</a>
       </div>
       <div class="btn-group">
       <a style="cursor: pointer;"  class="btn btn-info" id="categorybtn"  data-parent="#sub" data-toggle="collapse" data-target="#applicationcategory ">Application Category</a>
       </div>
        <div class="btn-group">
        <a style="cursor: pointer;"  class="btn btn-info" id="statusbtn"  data-parent="#sub" data-toggle="collapse" data-target="#solutionstatus ">Solution Status </a>
         </div>
         <div class="btn-group">
         <a style="cursor: pointer;"  class="btn btn-info" id="ticketcategorybtn"  data-parent="#sub" data-toggle="collapse" data-target="#ticketcategory">Ticket Category</a>
          </div>
         <div class="btn-group">
         <a style="cursor: pointer;"  class="btn btn-info" id="subcategorybtn"  data-parent="#sub" data-toggle="collapse" data-target="#subcategory">Sub Category</a>
          </div>
          <div class="btn-group">
          <a style="cursor: pointer;"  class="btn btn-info" id="severitybtn"  data-parent="#sub" data-toggle="collapse" data-target="#ticketseverity">Ticket Severity </a>
          </div>
            <div class="btn-group">
          <a style="cursor: pointer;"  class="btn btn-info" id="ticketstatusbtn"  data-parent="#sub" data-toggle="collapse" data-target="#ticketstatus">Ticket Status </a>
          </div>
          
          </div>
     
 </div>
</div>


<div class="row" id="sub">

	<div id="userlist" class="collapse">
		<div class="generic-container">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="lead"><i style="font-size:24px" class="fa">&#xf0c0;</i> List of Users </span>
			</div>
			<script type="text/javascript">
		 		var userlist = [
		       <c:forEach items="${users}" var="user" varStatus="status">
				{
						"First Name":"${user.firstName}",
						"Last Name":"${user.lastName}",
						"email":"${user.email}",
						"SSOID":"${user.ssoId}"
					} <c:if test="${!status.last}">, </c:if>
				</c:forEach>
				];
			</script>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>KEDB Name</th>
						<sec:authorize access="hasRole('ADMIN') or hasRole('DBA')">
							<th width="100"></th>
						</sec:authorize>
						<sec:authorize access="hasRole('ADMIN')">
							<th width="100"></th>
						</sec:authorize>

					</tr>
				</thead>
				<tbody>
					<c:forEach items="${users}" var="user">
						<tr>
							<td>${user.firstName}</td>
							<td>${user.lastName}</td>
							<td>${user.email}</td>
							<td>${user.ssoId}</td>
							<sec:authorize access="hasRole('ADMIN') or hasRole('DBA')">
								<td><a href="<c:url value='/edit-user-${user.ssoId}' />"
									class="btn btn-success custom-width">Edit</a></td>
							</sec:authorize>
							<sec:authorize access="hasRole('ADMIN')">
								<td>
								
								 <a href="#deleteModal_${user.id}" role="button" 
								 class="btn btn-danger custom-width" data-toggle="modal">Delete</a>
								</td>
								<%-- <a href="<c:url value='/delete-user-${user.ssoId}' />"
									class="btn btn-danger custom-width">Delete</a></td> --%>
							</sec:authorize>
						</tr>
						
					<div id="deleteModal_${user.id}" class="modal fade">
    				<div class="modal-dialog">
        			<div class="modal-content">
         			 <div class="modal-header">
         		     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
         	        <h4 class="modal-title">Delete User</h4>
         		    </div>
         		    <div class="modal-body">
         	        <p>Are you sure you want to delete this user "${user.ssoId}" ? </p>
        		    </div>
        		    <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <a href="/webkedb/delete-user-${user.ssoId}" class="btn btn-danger custom-width"  title="Delete"><i class="fa fa-trash-o"></i>Delete</a>
     	     	    </div>
     		 	    </div>
    				</div>
 					</div>  	
					</c:forEach>
				</tbody>
			</table>
		</div>
		<sec:authorize access="hasRole('ADMIN')">
			<div class="well">
				<a href="<c:url value='/newuser' />"><i style="font-size:24px" class="fa">&#xf234;</i> Add New User</a>
			</div>
		</sec:authorize>
	</div>
	</div>
	
	<div id="applicationcategory" class="collapse">
		<div class="generic-container">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="lead"><i style="font-size:24px" class="fa">&#xf0c0;</i> List of Application Categories </span>
			</div>
			 <script type="text/javascript">
		 		var userlist = [
		       <c:forEach items="${categories}" var="category" varStatus="status">
				{
						"Category Name":"${category.categoryName}"
					} <c:if test="${!status.last}">, </c:if>
				</c:forEach>
				];
			</script>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Category Name</th>
						<sec:authorize access="hasRole('ADMIN')">
							<th width="100"></th>
						</sec:authorize>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${categories}" var="category">
						<tr>
							<td>${category.categoryName}</td>
							<sec:authorize access="hasRole('ADMIN')">
								<td>
								<a href="#deleteModal_${category.categoryName}" role="button" 
								 class="btn btn-danger custom-width" data-toggle="modal">Delete</a>
							</sec:authorize>
						</tr>
						<div id="deleteModal_${category.categoryName}" class="modal fade">
    				<div class="modal-dialog">
        			<div class="modal-content">
         			 <div class="modal-header">
         		     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
         	        <h4 class="modal-title">Delete Category</h4>
         		    </div>
         		    <div class="modal-body">
         	        <p>Are you sure you want to delete this Category "${category.categoryName}" ? </p>
        		    </div>
        		    <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <a href="/webkedb/delete-categoryName-${category.categoryName}" class="btn btn-danger custom-width"  title="Delete"><i class="fa fa-trash-o"></i>Delete</a>
     	     	    </div>
     		 	    </div>
    				</div>
 					</div>  	
						
						
					</c:forEach>
				</tbody>
			</table>
		</div>
		<sec:authorize access="hasRole('ADMIN')">
			<div class="well">
				<a href="<c:url value='/newcategoryName' />"><i style="font-size:24px" class="fa">&#xf234;</i> Add New Category</a>
			</div>
		</sec:authorize>
	</div>
	</div>
	
	
	
	<div id="solutionstatus" class="collapse">
	<div class="generic-container">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="lead"><i style="font-size:24px" class="fa">&#xf0c0;</i> List of Solution Status </span>
			</div>
			 <script type="text/javascript">
		 		var userlist = [
		       <c:forEach items="${solutionstatus}"  var="solstatus"  varStatus="status">
				{
						"Solution Status":"${solstatus}"
					} <c:if test="${!status.last}">, </c:if>
				</c:forEach>
				];
			</script>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Solution Status</th>
						<sec:authorize access="hasRole('ADMIN')">
							<th width="100"></th>
						</sec:authorize>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${solutionstatus}" var="solstatus">
						<tr>
							<td>${solstatus}</td>
							<sec:authorize access="hasRole('ADMIN')">
								<td>
								<a href="#deleteModal_${solstatus}" role="button" 
								 class="btn btn-danger custom-width" data-toggle="modal">Delete</a>
								</td>
							</sec:authorize>
						</tr>
						
					<div id="deleteModal_${solstatus}" class="modal fade">
    				<div class="modal-dialog">
        			<div class="modal-content">
         			 <div class="modal-header">
         		     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
         	        <h4 class="modal-title">Delete Solution Status</h4>
         		    </div>
         		    <div class="modal-body">
         	        <p>Are you sure you want to delete this Solution Status "${solstatus}" ? </p>
        		    </div>
        		    <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <a href="/webkedb/delete-solutionstatusname-${solstatus}" class="btn btn-danger custom-width"  title="Delete"><i class="fa fa-trash-o"></i>Delete</a>
     	     	    </div>
     		 	    </div>
    				</div>
 					</div>  
					</c:forEach>
				</tbody>
			</table>
		</div>
		<sec:authorize access="hasRole('ADMIN')">
			<div class="well">
				<a href="<c:url value='/newsolutionstatusname' />"><i style="font-size:24px" class="fa">&#xf234;</i> Add New Solution Status</a>
			</div>
		</sec:authorize>
	</div>
	</div>
 
	
	
	<div id="ticketcategory" class="collapse">
	<div class="generic-container">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="lead"><i style="font-size:24px" class="fa">&#xf0c0;</i> List of Ticket Category </span>
			</div>
			 <script type="text/javascript">
		 		var userlist = [
		       <c:forEach items="${ticketcategories}"  var="ticketcategory"  varStatus="status">
				{
						"Category Name":"${ticketcategory}"
					} <c:if test="${!status.last}">, </c:if>
				</c:forEach>
				];
			</script>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Category Name</th>
						<sec:authorize access="hasRole('ADMIN')">
							<th width="100"></th>
						</sec:authorize>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${ticketcategories}" var="ticketcategory">
						<tr>
							<td>${ticketcategory}</td>
							
							<sec:authorize access="hasRole('ADMIN')">
								<td>
								<a href="#deleteModal_${ticketcategory}" role="button" 
								 class="btn btn-danger custom-width" data-toggle="modal">Delete</a>
								</td>
							</sec:authorize>
						</tr>
						
					<div id="deleteModal_${ticketcategory}" class="modal fade">
    				<div class="modal-dialog">
        			<div class="modal-content">
         			 <div class="modal-header">
         		     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
         	        <h4 class="modal-title">Delete Category</h4>
         		    </div>
         		    <div class="modal-body">
         	        <p>Are you sure you want to delete this Ticket Category "${ticketcategory}" ? </p>
        		    </div>
        		    <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <a href="/webkedb/delete-ticketcategory-${ticketcategory}" class="btn btn-danger custom-width"  title="Delete"><i class="fa fa-trash-o"></i>Delete</a>
     	     	    </div>
     		 	    </div>
    				</div>
 					</div>  
						
						
					</c:forEach>
				</tbody>
			</table>
		</div>
		<sec:authorize access="hasRole('ADMIN')">
			<div class="well">
				<a href="<c:url value='/newticketcategory' />"><i style="font-size:24px" class="fa">&#xf234;</i> Add New Ticket Category</a>
			</div>
		</sec:authorize>
	</div>
	</div>
 
	
	<div id="subcategory" class="collapse">
	<div class="generic-container">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="lead"><i style="font-size:24px" class="fa">&#xf0c0;</i> List of Ticket Sub Category </span>
			</div>
			 <script type="text/javascript">
		 		var userlist = [
		       <c:forEach items="${ticketsubcategories}"  var="ticketsubcategory"  varStatus="status">
				{
						"Sub Category Name":"${ticketsubcategory}"
					} <c:if test="${!status.last}">, </c:if>
				</c:forEach>
				];
			</script>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Sub Category Name</th>
						<sec:authorize access="hasRole('ADMIN')">
							<th width="100"></th>
						</sec:authorize>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${ticketsubcategories}" var="ticketsubcategory">
						<tr>
							<td>${ticketsubcategory}</td>
							
							<sec:authorize access="hasRole('ADMIN')">
								<td>
								<a href="#deleteModal_${ticketsubcategory}" role="button" 
								 class="btn btn-danger custom-width" data-toggle="modal">Delete</a>
								</td>
							</sec:authorize>
						</tr>
						
					<div id="deleteModal_${ticketsubcategory}" class="modal fade">
    				<div class="modal-dialog">
        			<div class="modal-content">
         			 <div class="modal-header">
         		     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
         	        <h4 class="modal-title">Delete Sub Category</h4>
         		    </div>
         		    <div class="modal-body">
         	        <p>Are you sure you want to delete this Sub Category "${ticketsubcategory}" ? </p>
        		    </div>
        		    <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <a href="/webkedb/delete-ticketsubcategory-${ticketsubcategory}" class="btn btn-danger custom-width"  title="Delete"><i class="fa fa-trash-o"></i>Delete</a>
     	     	    </div>
     		 	    </div>
    				</div>
 					</div>  
					</c:forEach>
				</tbody>
			</table>
		</div>
		<sec:authorize access="hasRole('ADMIN')">
			<div class="well">
				<a href="<c:url value='/newticketsubcategory' />"><i style="font-size:24px" class="fa">&#xf234;</i> Add New Ticket Sub Category</a>
			</div>
		</sec:authorize>
	</div>
	</div>
	
	<div id="ticketseverity" class="collapse">
	<div class="generic-container">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="lead"><i style="font-size:24px" class="fa">&#xf0c0;</i> List of Ticket Severity </span>
			</div>
			 <script type="text/javascript">
		 		var userlist = [
		       <c:forEach items="${ticketseverities}"  var="ticketsseverity"  varStatus="status">
				{
						"Ticket Severity":"${ticketsseverity}"
					} <c:if test="${!status.last}">, </c:if>
				</c:forEach>
				];
			</script>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Ticket Severity</th>
						
						<sec:authorize access="hasRole('ADMIN')">
							<th width="100"></th>
						</sec:authorize>

					</tr>
				</thead>
				<tbody>
					<c:forEach items="${ticketseverities}" var="ticketsseverity">
						<tr>
							<td>${ticketsseverity}</td>
							
							<sec:authorize access="hasRole('ADMIN')">
								<td>
								<a href="#deleteModal_${ticketsseverity}" role="button" 
								 class="btn btn-danger custom-width" data-toggle="modal">Delete</a>
								</td>
							</sec:authorize>
						</tr>
						
					<div id="deleteModal_${ticketsseverity}" class="modal fade">
    				<div class="modal-dialog">
        			<div class="modal-content">
         			 <div class="modal-header">
         		     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
         	        <h4 class="modal-title">Delete Ticket Severity</h4>
         		    </div>
         		    <div class="modal-body">
         	        <p>Are you sure you want to delete this Ticket Severity "${ticketsseverity}" ? </p>
        		    </div>
        		    <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <a href="/webkedb/delete-ticketseverity-${ticketsseverity}" class="btn btn-danger custom-width"  title="Delete"><i class="fa fa-trash-o"></i>Delete</a>
     	     	    </div>
     		 	    </div>
    				</div>
 					</div> 
						
					</c:forEach>
				</tbody>
			</table>
		</div>
		<sec:authorize access="hasRole('ADMIN')">
			<div class="well">
				<a href="<c:url value='/newticketseverity' />"><i style="font-size:24px" class="fa">&#xf234;</i> Add New Ticket Severity</a>
			</div>
		</sec:authorize>
	</div>
	</div>
	
	<div id="ticketstatus" class="collapse">
	<div class="generic-container">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="lead"><i style="font-size:24px" class="fa">&#xf0c0;</i> List of Ticket Status </span>
			</div>
			 <script type="text/javascript">
		 		var userlist = [
		       <c:forEach items="${ticketstatus}"  var="ticketstat"  varStatus="status">
				{
						"Ticket Status":"${ticketstat}"
					} <c:if test="${!status.last}">, </c:if>
				</c:forEach>
				];
			</script>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Ticket Status</th>
						
						<sec:authorize access="hasRole('ADMIN')">
							<th width="100"></th>
						</sec:authorize>

					</tr>
				</thead>
				<tbody>
					<c:forEach items="${ticketstatus}" var="ticketstat">
						<tr>
							<td>${ticketstat}</td>
							<sec:authorize access="hasRole('ADMIN')">
								<td>
								<a href="#deleteModal_${ticketstat}" role="button" 
								 class="btn btn-danger custom-width" data-toggle="modal">Delete</a>
								</td>
							</sec:authorize>
						</tr>
					<div id="deleteModal_${ticketstat}" class="modal fade">
    				<div class="modal-dialog">
        			<div class="modal-content">
         			 <div class="modal-header">
         		     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
         	        <h4 class="modal-title">Delete Ticket Status</h4>
         		    </div>
         		    <div class="modal-body">
         	        <p>Are you sure you want to delete this Ticket Status "${ticketstat}" ? </p>
        		    </div>
        		    <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <a href="/webkedb/delete-ticketstatus-${ticketstat}" class="btn btn-danger custom-width"  title="Delete"><i class="fa fa-trash-o"></i>Delete</a>
     	     	    </div>
     		 	    </div>
    				</div>
 					</div> 
						
					</c:forEach>
				</tbody>
			</table>
		</div>
		<sec:authorize access="hasRole('ADMIN')">
			<div class="well">
				<a href="<c:url value='/newticketstatus' />"><i style="font-size:24px" class="fa">&#xf234;</i> Add New Ticket Status</a>
			</div>
		</sec:authorize>
	</div>
	</div>
	</div>
	
</body>
</html>
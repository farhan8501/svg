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
 
 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="static/css/BootSideMenu.css">
     <link type="text/css" rel="Stylesheet" href="http://ajax.microsoft.com/ajax/jquery.ui/1.8.6/themes/smoothness/jquery-ui.css">

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
   
	
<title>KEDB - Solution List </title>
 

<meta name="GENERATOR" content="MSHTML 11.00.9600.18538">

<link rel="stylesheet" href="static/css/style.css">

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js" charset="utf-8"></script> -->
<script src="static/js/d3.min.js" charset="utf-8"></script>

		
</head>

<body data-page="solutionlist" class="html front">

<%@ include file = "header.jsp" %>
	<div  class="generic-container">
		
		<div class="panel panel-default">
			<!-- Default panel contents -->
			<div class="panel-heading">
				<span class="lead"><i style="font-size:24px" class="fa">&#xf0c0;</i> List of Solutions </span>
			</div>

			<script type="text/javascript">
		 var solutionlist = [
		       <c:forEach items="${Solutions}" var="solution" varStatus="status">
				{
						"Solution Description":"${solution.solution_description}",
						"Search Keyword":"${solution.search_keyword}",
						"Created By":"${solution.created_by}",
						"Created Date":"${solution.created_date}",
						"Last Updated Date":"${solution.last_update_date}",
						"Status":"${solution.status}",
						"Category":"${solution.applicationCategory}",
						"Ticket Number":"${solution.incident}"
						
					} <c:if test="${!status.last}">, </c:if>
				</c:forEach>
				];
</script>
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Solution Description </th>
						<th>Search Keyword </th>
						<th>Created By </th>
						<th>Created Date</th>
						<th>Updated Date </th>
						<th>Status </th>
						<th>Category </th>
						<th>Ticket Number </th>
						 
						<sec:authorize access="hasRole('ADMIN') or hasRole('DBA')">
							<th width="100"></th>
						</sec:authorize>
						<sec:authorize access="hasRole('ADMIN')">
							<th width="100"></th>
						</sec:authorize>

					</tr>
				</thead>
				<tbody>
					<c:forEach items="${Solutions}" var="solution">
						<tr>
							<td>${solution.solution_description}</td>
							<td>${solution.search_keyword}</td>
							<td>${solution.created_by}</td>
							<td><fmt:formatDate value="${solution.created_date}" pattern="dd-MM-yyyy" var="createdDate" />
							<c:out value="${createdDate}" /> </td>
							<td><fmt:formatDate value="${solution.last_update_date}" pattern="dd-MM-yyyy" var="updatedDate" />
							<c:out value="${updatedDate}" /> </td>
							<td>${solution.status}</td>
							<td>
							<c:forEach items="${solution.applicationCategory}" var="applicationCategory">
							 ${applicationCategory.categoryName} 
							</c:forEach>
							</td>
							<td>
							<c:forEach items="${solution.incident}" var="incident">
							<a href="<c:url value='/ticket/${incident.ticket_id}' />" > ${incident.ticket_number} </a>
							</c:forEach>
							</td>
					<sec:authorize access="hasRole('ADMIN') or hasRole('DBA')">
								<td><a href="<c:url value='/edit-solution-${solution.solution_id}' />"
									class="btn btn-success custom-width">Edit</a></td>
							</sec:authorize>
							<sec:authorize access="hasRole('ADMIN')">
								<td><a href="<c:url value='/delete-solution-${solution.solution_id}' />"
									class="btn btn-danger custom-width">Delete</a></td>
							</sec:authorize>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
		<sec:authorize access="hasRole('ADMIN')">
			<div class="well">
				<a href="<c:url value='/newsolution' />"><i style="font-size:24px" class="fa">&#xf234;</i> Add New Solution</a>
			</div>
		</sec:authorize>
	</div>
	<br>
<br>
<br>
<br>
<%@ include file = "footer.jsp" %>
</body>
</html>
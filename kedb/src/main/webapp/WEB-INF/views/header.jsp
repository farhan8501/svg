<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<header>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<div class="container-fluid">
<div class="row">
  <div class="col-sm-2" >
  <a class="logo navbar-btn pull-left" href="" title="Home">
 	<img src="static/image/capgemini_logo_new.png" alt="Home" />
 </a>
 </div>
 <div class="col-sm-10 nav navbar-top-links navbar-right">
 <ul>
 <li>
 <h2>Known Error Database Management</h2>
 </li>
  <li><span>Welcome:</span>  <strong class="glyphicon glyphicon-user" id="user">${loggedinuser}</strong> 
 </li>
 	<li><a href="<c:url value="/logout"/>" class="region-banner-right-logoff glyphicon glyphicon-off">Logout</a>
 </li>
 </ul>
 </div>
 </div>

<div class="row">
 <nav class="navbar navbar-inverse" style="background-color:#337ab7 !important; color:#fff !important">
  <div class="container-fluid">
       <ul class="nav navbar-nav makeActive" id="myList">
        	<li ><a href="/webkedb/home" target="_self" class="glyphicon glyphicon-home">Home</a></li>
        	<li ><a href="/webkedb/ticket"class="glyphicon glyphicon-asterisk">Tickets</a></li>
        	 
        	<li><a class="navigation-link dropdown dropdown-toggle"
						href="/webkedb/solutions" id="solMenu"class="glyphicon glyphicon-check">Solution <span
						class="caret"></span>
						<table border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td>
									<ul class="dropdown-menu">
										<li><a href="/webkedb/newsolution" class="glyphicon glyphicon-edit">Create Solution</a></li>
										<li><a href="/webkedb/solutions" class="glyphicon glyphicon-check">Publish Solution</a></li>
									</ul>
								</td>
							</tr>
						</table>
					</a>
			</li> 
 
      		<li ><a href="/webkedb/search" class="glyphicon glyphicon-search">Search</a></li>
      		<sec:authorize access="hasRole('ADMIN')">
      		<li ><a href="/webkedb/admin">Administration</a></li>  
      		</sec:authorize>	
      		<sec:authorize access="hasRole('USER')">
      		<li ><a href="/webkedb/notification"class="glyphicon glyphicon-bell">My_Notifications</a></li>  	
      		</sec:authorize>	
         </ul>
  </div>
</nav>
</div>
</div>
<style>
 a.current:link, a.current:visited  {
	text-decoration: underline;
	color: white;
} 
</style>
</header>
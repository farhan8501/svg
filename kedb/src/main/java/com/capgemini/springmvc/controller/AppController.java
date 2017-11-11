package com.capgemini.springmvc.controller;

import java.io.IOException;
import java.util.List;
import java.util.Locale;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.capgemini.springmvc.model.AppCategory;
import com.capgemini.springmvc.model.ApplicationCategory;
import com.capgemini.springmvc.model.Incident;
import com.capgemini.springmvc.model.Solution;
import com.capgemini.springmvc.model.SolutionStatus;
import com.capgemini.springmvc.model.TicketCategory;
import com.capgemini.springmvc.model.TicketSeverity;
import com.capgemini.springmvc.model.TicketSubcategory;
import com.capgemini.springmvc.model.Ticketstatus;
import com.capgemini.springmvc.model.User;
import com.capgemini.springmvc.model.UserProfile;
import com.capgemini.springmvc.service.ApplicationCategoryService;
import com.capgemini.springmvc.service.IncidentService;
import com.capgemini.springmvc.service.SolutionService;
import com.capgemini.springmvc.service.UserProfileService;
import com.capgemini.springmvc.service.UserService;

import sun.security.action.GetPropertyAction;


@Controller
@RequestMapping("/")
@SessionAttributes({"roles","incidents","categories"})
 
public class AppController {

	@Autowired
	UserService userService;

	@Autowired
	UserProfileService userProfileService;

	@Autowired
	MessageSource messageSource;

	@Autowired
	PersistentTokenBasedRememberMeServices persistentTokenBasedRememberMeServices;

	@Autowired
	AuthenticationTrustResolver authenticationTrustResolver;

	@Autowired
	IncidentService incidentService;

	@Autowired
	SolutionService solutionService;

	@Autowired
	ApplicationCategoryService applicationCategoryService;
	
  
 

	/**
	 * This method will list all existing users.
	 */
	@RequestMapping(value = { "/admin" }, method = RequestMethod.GET)
	public String listUsers(ModelMap model) {

		List<User> users = userService.findAllUsers();
		
		model.addAttribute("users", users);
		model.addAttribute("loggedinuser", getPrincipal());
		model.addAttribute("categories", applicationCategoryService.findAllCategories());
		model.addAttribute("solutionstatus", solutionService.findAllSolutionStatus());
		model.addAttribute("ticketcategories", incidentService.findAllCategories());
		
		model.addAttribute("ticketsubcategories", incidentService.findAllticketsubcategories());
		model.addAttribute("ticketseverities", incidentService.findAllticketseverities());
		model.addAttribute("ticketstatus", incidentService.findAllticketstatus());
		
		return "userslist";
	}


	/**
	 * This method will list all existing Solutions.
	 */
	@RequestMapping(value = { "/allsolutions" }, method = RequestMethod.GET)
	public String listSolutions(ModelMap model) {

		List<Solution> solutions = solutionService.findAllSolutions();
		model.addAttribute("Solutions", solutions);
		model.addAttribute("loggedinuser", getPrincipal());
		return "solutionlist";

	}
	
	@RequestMapping(value = { "/", "/home" }, method = RequestMethod.GET)
	public String homePage(ModelMap model) {
		List<Solution> topsolutions = solutionService.getTopsolutions();
		List<Solution> recentsolutions= solutionService.getrecentsolutions();
		model.addAttribute("loggedinuser", getPrincipal());
		model.addAttribute("topsolutions", topsolutions);
		model.addAttribute("recentsolutions", recentsolutions);
		return "welcome";
	}

	@RequestMapping(value = "/db", method = RequestMethod.GET)
	public String dbaPage(ModelMap model) {
		model.addAttribute("loggedinuser", getPrincipal());
		return "welcome";
	}

	/**
	 * This method will provide the medium to add a new user.
	 */
	@RequestMapping(value = { "/newuser" }, method = RequestMethod.GET)
	public String newUser(ModelMap model) {
		User user = new User();
		model.addAttribute("user", user);
		model.addAttribute("roles",userProfileService.findAll());
		model.addAttribute("categories", applicationCategoryService.findAllCategories());
		model.addAttribute("edit", false);
		model.addAttribute("loggedinuser", getPrincipal());
		return "registration";
	}

	/**
	 * This method will be called on form submission, handling POST request for
	 * saving user in database. It also validates the user input
	 */
	@RequestMapping(value = { "/newuser" }, method = RequestMethod.POST)
	public String saveUser(@ModelAttribute("user") @Valid User user, BindingResult result,
			ModelMap model, String[] applicationCategory) {
		

		if (result.hasErrors()) {
			model.addAttribute("loggedinuser", getPrincipal());
			return "registration";
		}

		/*
		 * Preferred way to achieve uniqueness of field [sso] should be
		 * implementing custom @Unique annotation and applying it on field [sso]
		 * of Model class [User].
		 * 
		 * Below mentioned peace of code [if block] is to demonstrate that you
		 * can fill custom errors outside the validation framework as well while
		 * still using internationalized messages.
		 */
		if (!userService.isUserSSOUnique(user.getId(), user.getSsoId())) {
			FieldError ssoError = new FieldError("user", "ssoId",
					messageSource.getMessage("non.unique.ssoId",
							new String[] { user.getSsoId() },
							Locale.getDefault()));
			result.addError(ssoError);
			return "registration";
		}

		userService.saveUser(user);

		model.addAttribute("success", "User " + user.getFirstName() + " "
				+ user.getLastName() + " registered successfully");
		model.addAttribute("loggedinuser", getPrincipal());
		// return "success";
		return "registrationsuccess";
	}

	/**
	 * This method will provide the medium to update an existing user.
	 */
	@RequestMapping(value = { "/edit-user-{ssoId}" }, method = RequestMethod.GET)
	public String editUser(@PathVariable String ssoId, ModelMap model) {
		User user = userService.findBySSO(ssoId);
		model.addAttribute("user", user);
		model.addAttribute("roles",userProfileService.findAll());
		model.addAttribute("edit", true);
		model.addAttribute("categories", applicationCategoryService.findAllCategories());
		model.addAttribute("loggedinuser", getPrincipal());
		return "registration";
	}

	/**
	 * This method will be called on form submission, handling POST request for
	 * updating user in database. It also validates the user input
	 */
	@RequestMapping(value = { "/edit-user-{ssoId}" }, method = RequestMethod.POST)
	public String updateUser(@Valid User user, BindingResult result,
			ModelMap model, @PathVariable String ssoId) {

		if (result.hasErrors()) {
			model.addAttribute("loggedinuser", getPrincipal());
			return "registration";
		}

		/*
		 * //Uncomment below 'if block' if you WANT TO ALLOW UPDATING SSO_ID in
		 * UI which is a unique key to a User.
		 * if(!userService.isUserSSOUnique(user.getId(), user.getSsoId())){
		 * FieldError ssoError =new
		 * FieldError("user","ssoId",messageSource.getMessage
		 * ("non.unique.ssoId", new String[]{user.getSsoId()},
		 * Locale.getDefault())); result.addError(ssoError); return
		 * "registration"; }
		 */

		userService.updateUser(user);

		model.addAttribute("success", "User " + user.getFirstName() + " "
				+ user.getLastName() + " updated successfully");
		model.addAttribute("loggedinuser", getPrincipal());
		return "registrationsuccess";
	}

	/**
	 * This method will delete an user by it's SSOID value.
	 */
	@RequestMapping(value = { "/delete-user-{ssoId}" }, method = RequestMethod.GET)
	public String deleteUser(@PathVariable String ssoId) {
		userService.deleteUserBySSO(ssoId);
		 
		return "redirect:/admin";
	}

	/**
	 * This method will provide UserProfile list to views
	 */
	@ModelAttribute("roles")
	public List<UserProfile> initializeProfiles() {
		return userProfileService.findAll();
	}

	/**
	 * This method handles Access-Denied redirect.
	 */
	@RequestMapping(value = "/Access_Denied", method = RequestMethod.GET)
	public String accessDeniedPage(ModelMap model) {
		model.addAttribute("loggedinuser", getPrincipal());
		return "accessDenied";
	}

	/**
	 * This method handles login GET requests. If users is already logged-in and
	 * tries to goto login page again, will be redirected to list page.
	 */
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginPage() {
		if (isCurrentAuthenticationAnonymous()) {
			return "login";
		} else {
			return "redirect:/admin";
		}
	}

	/**
	 * This method handles logout requests. Toggle the handlers if you are
	 * RememberMe functionality is useless in your app.
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logoutPage(HttpServletRequest request,
			HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext()
				.getAuthentication();
		if (auth != null) {
			persistentTokenBasedRememberMeServices.logout(request, response,
					auth);
			SecurityContextHolder.getContext().setAuthentication(null);
		}
		return "redirect:/login?logout";
	}

	/**
	 * This method returns the principal[user-name] of logged-in user.
	 */
	private String getPrincipal() {
		String userName = null;
		Object principal = SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			userName = ((UserDetails) principal).getUsername();
		} else {
			userName = principal.toString();
		}
		return userName;
	}

	/**
	 * This method returns true if users is already authenticated [logged-in],
	 * else false.
	 */
	private boolean isCurrentAuthenticationAnonymous() {
		final Authentication authentication = SecurityContextHolder
				.getContext().getAuthentication();
		return authenticationTrustResolver.isAnonymous(authentication);
	}

	/**
	 * This method will provide the list of incidents in json format.
	 */
	@RequestMapping(value = { "/incidents" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Incident> getAllIncidents() {
		
		return incidentService.getAllTickets();
	}
	
	/**
	 * This method will provide the list of application categories in json format.
	 */
	
	@RequestMapping(value = { "/solutioncategoriescount" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Solution> getSolutioncategories() {
		
		return solutionService.getSolutionscategorycount();
	}
	
	@RequestMapping(value = { "/categoriescount" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Solution> getTicketCategories() {
		
		return solutionService.getTicketCategories();
	}
	
	/**
	 * This method will provide the list of Incidents Status in json format.
	 */
	
	@RequestMapping(value = { "/incidentstatuscount" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Incident> getIncidentStatuscount() {
		
		return incidentService.getIncidentstatuscount();
	}
	
	/**
	 * This method will provide the list of Contributer user count in json format.
	 */
	
	@RequestMapping(value = { "/contributerscount" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Solution> getContributercount(){
		
		return solutionService.getContributercount();
	}


	
	/**
	 * This method will provide the list of Solutions count in json format.
	 */
	
	@RequestMapping(value = { "/solutionslist" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Solution> getYearlysolutions(){
		
		return solutionService.getSolutionyearlycount();
	}
	
	
	@RequestMapping(value = { "/topsolutions" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Solution> getTopsolutions(){
		
		return solutionService.getTopsolutions();
	}
	
	@RequestMapping(value = { "/recentsolutions" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Solution> getrecentsolutions(){
		
		return solutionService.getrecentsolutions();
	}
	
	
	/**
	 * This method will provide the bubble tickets to the user.
	 */
	@RequestMapping(value = { "/ticket" }, method = RequestMethod.GET)
	public String incident(ModelMap model) {
		List<Solution> ticketCategories = solutionService.getTicketCategories();
		List<Solution> ticketStatus = solutionService.getTicketStatus();
		List<Solution> ticketSeverity = solutionService.getTicketSeverity();
		model.addAttribute("loggedinuser", getPrincipal());
		model.addAttribute("categorytypes", ticketCategories);
		model.addAttribute("status", ticketStatus);
		model.addAttribute("severity", ticketSeverity);
		return "tickets";
	}

	/**
	 * This method will provide the bubble solutions to the user.
	 */
	@RequestMapping(value = { "/solutions" }, method = RequestMethod.GET)
	public String solution(ModelMap model) {
		model.addAttribute("loggedinuser", getPrincipal());
		List<Solution> topsolutions = solutionService.getTopsolutions();
		List<Solution> recentsolutions= solutionService.getrecentsolutions();
		List<Solution> solutionCategories = solutionService.getTicketCategories();
		List<Solution> solutionStatus = solutionService.getSolutionStatus();
		model.addAttribute("categorytypes", solutionCategories);
		model.addAttribute("status", solutionStatus);
		model.addAttribute("loggedinuser", getPrincipal());
		model.addAttribute("topsolutions", topsolutions);
		model.addAttribute("recentsolutions", recentsolutions);
		return "solutions";
	}
	
	
	/**
	 * This method will provide the Notifications  to the user.
	 */
	@RequestMapping(value = { "/notification" }, method = RequestMethod.GET)
	public String notification(ModelMap model) {
		model.addAttribute("loggedinuser", getPrincipal());
		model.addAttribute("tickets", incidentService.getProfileTickets(getPrincipal()));
		return "notification";
	}
	
	/**
	 * This method will provide the list of Profile Tickets in json format.
	 */
	
	@RequestMapping(value = { "/profiletickets" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Incident> getProfileTickets() {
		
		return incidentService.getProfileTickets(getPrincipal());
		
	}
	
	/**
	 * This method will provide the list of Solution Status in json format.
	 */
	
	@RequestMapping(value = { "/solutionstatuscount" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Solution> getSolutionstatuscount() {
		
		return solutionService.getSolutionstatuscount();
		
	}
	
	/**
	 * This method will provide the list of Solution linked and not linked count in json format.
	 */
	
	@RequestMapping(value = { "/Solutionlinkedcount" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Solution> getSolutionlinkedcount() {
		
		return solutionService.getSolutionlinkedcount();
		
	}
	
	/**
	 * This method will provide the list of Incident linked and not linked count in json format.
	 */
	
	@RequestMapping(value = { "/Incidentlinkedcount" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Incident> getIncidentlinkedcount() {
		
		return incidentService.getIncidentlinkedcount();
		
	}
	
	/**
	 * This method will return solution creation page.
	 */
 
	@RequestMapping(value = { "/newsolution" }, method = RequestMethod.GET)
	public String createSolution(ModelMap model) {
		model.addAttribute("solution", new Solution());
		model.addAttribute("ApplicationCategory", new ApplicationCategory());
		model.addAttribute("Incident", new Incident());
		model.addAttribute("categories", applicationCategoryService.findAllCategories());
		model.addAttribute("edit", false);
		model.addAttribute("loggedinuser", getPrincipal());
		return "addsolutions";
	}
	
	
	@RequestMapping(value = { "/newsolution" }, method = RequestMethod.POST)
	public String saveSolution(@ModelAttribute("solution") @Valid Solution solution, BindingResult result,ModelMap model)throws IOException {
		if (result.hasErrors()) {
			model.addAttribute("loggedinuser", getPrincipal());
			return "addsolutions";
		}
		model.addAttribute("edit", false);
		solution.setStatus("Created");
		solution.setCreated_by(getPrincipal());
		solutionService.saveSolution(solution);
		Solution solutions = solutionService.findById(solution.getSolution_id());
		int count= solutionService.findStatus(solution.getSolution_id());
		if(count==0){
			model.addAttribute("Approve", true);
		}
		model.addAttribute("solution", solutions);
		model.addAttribute("loggedinuser", getPrincipal());
		return "viewsolution";

	}
 
	@RequestMapping(value = { "/releavancesearchjson/{id}" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Solution> getRelevanceIncidents(ModelMap model, @PathVariable("id") String id) {
		return solutionService.getRelevanceIncidents(id);
	}

	/**
	 * This method will return view solution page.
	 */
	@RequestMapping(value = { "/solutions/{id}" }, method = RequestMethod.GET)
	public String showSolution(ModelMap model, @PathVariable("id") int id) {
		
		Solution solutions = solutionService.findById(id);
		int count= solutionService.findStatus(id);
		if(count==0){
			model.addAttribute("Approve", true);
		}
		
		model.addAttribute("ApplicationCategory", new ApplicationCategory());
		model.addAttribute("Incident", new Incident());
		model.addAttribute("categories", applicationCategoryService.findAllCategories());
		
		model.addAttribute("edit", solutionService.findByUser(id,getPrincipal()));
		
		model.addAttribute("solution", solutions);
		model.addAttribute("loggedinuser", getPrincipal());
		return "viewsolution";
	}

	
	@RequestMapping(value = { "/status-solution-{id}" }, method = RequestMethod.GET)
	public String solutionapprove(@PathVariable int id, ModelMap model) {
		solutionService.approveSolution(id);
		Solution solutions = solutionService.findById(id);
		int count= solutionService.findStatus(id);
		if(count==0){
			model.addAttribute("Approve", true);
		}
		model.addAttribute("solution", solutions);
		model.addAttribute("loggedinuser", getPrincipal());
		return "viewsolution";
	}
	
	/**
	 * This method will provide applicationcategory list to views
	 */
	@ModelAttribute("incidents")
	public List<Incident> initializeIncidentCategories() {
		return incidentService.getAllIncidents();
	}
	
	
	@ModelAttribute("categories")
	public List<ApplicationCategory> initializeCategories() {
		return applicationCategoryService.findAllCategories();
	}
	
	
	@RequestMapping(value = { "/search" }, method = RequestMethod.GET)
	public String listIncidents(ModelMap model) {
		List<Incident> incidents = incidentService.getAllIncidents();
		model.addAttribute("incidents", incidents);
		model.addAttribute("loggedinuser", getPrincipal());
		 
		return "search";
	}
	 
	@RequestMapping(value = { "/edit-solution-{id}" }, method = RequestMethod.GET)
	public String editSolution(@PathVariable int id, ModelMap model) {
		
		String status = solutionService.findByUser(id,getPrincipal());
		if (status=="true"){
	    Solution solution =solutionService.findById(id);
		List<Incident> incidents= incidentService.getAllIncidents();
		model.addAttribute("edit", true);
		model.addAttribute("solution", solution);
		model.addAttribute("incidents", incidents);
		model.addAttribute("categories", applicationCategoryService.findAllCategories());
		model.addAttribute("loggedinuser", getPrincipal());
		return "addsolutions";
		}
		else{
			return "redirect:/Access_Denied";
		}
			
	}
	
	@RequestMapping(value = { "/edit-solution-{id}" }, method = RequestMethod.POST)
	public String updateSolution(@Valid Solution solution, BindingResult result,
	@PathVariable int id, ModelMap model) {
		
		model.addAttribute("edit", true);
		if (result.hasErrors()) {
			model.addAttribute("loggedinuser", getPrincipal());
			return "addsolutions";
		}
		
		solution.setCreated_by(getPrincipal());
		solutionService.updateSolution(solution);
		Solution solutions = solutionService.findById(solution.getSolution_id());
		int count= solutionService.findStatus(solution.getSolution_id());
		if(count==0){
			model.addAttribute("Approve", true);
		}
		model.addAttribute("solution", solutions);
		model.addAttribute("loggedinuser", getPrincipal());
		return "viewsolution";

	}
	
	@RequestMapping(value = { "/delete-solution-{id}" }, method = RequestMethod.GET)
	public String deleteSolution(@PathVariable("id") int id, ModelMap model) {
		solutionService.deleteSolutionByID(id);
		model.addAttribute("success", "Solution " + id + " "
				 + " Deleted successfully");
		model.addAttribute("loggedinuser", getPrincipal());
		return "solutiondeletesuccess";
	}
	
	 

	@RequestMapping(value = { "/solution_ticket-{status}-{sid}-{tid}" }, method = RequestMethod.GET)
	@ResponseBody
	public String linkDelinkSolution(@PathVariable("status") String status,@PathVariable("sid") String sid,@PathVariable("tid") String tid, ModelMap model) {
		return solutionService.linkDelinkSolution(status,sid,tid);
	}
	
	@RequestMapping(value = { "/solutionlink-{sid}-{id}" }, method = RequestMethod.GET)
	@ResponseBody
	public String Solutionlink(@PathVariable("sid") String sid,@PathVariable("id") String id, ModelMap model) {
		return solutionService.SolutionLink(sid, id);
	}
	
	@RequestMapping(value = { "/solutionrating/{sid}" }, method = RequestMethod.GET)
	@ResponseBody
	public int solutionRating(@PathVariable("sid") int id, ModelMap model) {
		return solutionService.solutionRating(id);
	}
	
	@RequestMapping(value = { "/solutionratingvalue/{sid}" }, method = RequestMethod.GET)
	@ResponseBody
	public int solutionRatingValue(@PathVariable("sid") int id, ModelMap model) {
		return solutionService.solutionRatingvalue(id);
	}
	
	/**
	 * This method will provide the list of incident details in josn format.
	 */
	@RequestMapping(value = { "/ticket/{id}" }, method = RequestMethod.GET)

	public String getIncident(@PathVariable("id") int id, ModelMap model) {
		Incident incident = incidentService.getTicket(id);
		model.addAttribute("incident", incident);
		model.addAttribute("loggedinuser", getPrincipal());
		
		return "viewticket";
	}

	/**
	 * This method will provide the list of Solutions  in json format.
	 */
	@RequestMapping(value = { "/solution" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Solution> getAllSolutions() {
		return solutionService.getAllSolutions();
	}
	
	
	@RequestMapping(value = { "/newcategoryName" }, method = RequestMethod.GET)
	public String newcategoryName( ModelMap model) {
		 
		model.addAttribute("appcategory", new AppCategory() );
		model.addAttribute("edit", false);
		model.addAttribute("loggedinuser", getPrincipal());
		return "addcategory";
	}
	
	
	@RequestMapping(value = { "/newcategoryName" },  method = RequestMethod.POST)
	public String savenewCategory(@Valid @ModelAttribute("appcategory") AppCategory appcategory, BindingResult result,
			ModelMap model ) {
		
		if (result.hasErrors()) {
			model.addAttribute("loggedinuser", getPrincipal());
			return "addcategory";
		}
		applicationCategoryService.savenewCagetory(appcategory);
		model.addAttribute("loggedinuser", getPrincipal());
		return "redirect:/admin";
		
	}
	
	@RequestMapping(value = { "/delete-categoryName-{categoryName}" }, method = RequestMethod.GET)
	public String deletecategoryName( @PathVariable String categoryName) {
		
		applicationCategoryService.deletecategoryName(categoryName);
		return "redirect:/admin";
		 
	}
	
	
	@RequestMapping(value = { "/newsolutionstatusname" }, method = RequestMethod.GET)
	public String newsolutionstatusName( ModelMap model) {
		 
		model.addAttribute("statusname", new SolutionStatus() );
		model.addAttribute("edit", false);
		model.addAttribute("loggedinuser", getPrincipal());
		return "addsolutionstatus";
	}
	
	@RequestMapping(value = { "/newsolutionstatusname" },  method = RequestMethod.POST)
	public String savenewCategory(@Valid @ModelAttribute("statusname") SolutionStatus solutionStatus, BindingResult result,
			ModelMap model ) {
		
		if (result.hasErrors()) {
			
			model.addAttribute("loggedinuser", getPrincipal());
			return "addsolutionstatus";
		}
		solutionService.savenewStatus(solutionStatus);
		model.addAttribute("loggedinuser", getPrincipal());
		return "redirect:/admin";
		
	}
	
	@RequestMapping(value = { "/delete-solutionstatusname-{solstatus}" }, method = RequestMethod.GET)
	public String deletesolutionstatusname( @PathVariable String solstatus) {
		
		solutionService.deletesolutionstatusname(solstatus);
		return "redirect:/admin";
		 
	}
	
	@RequestMapping(value = { "/newticketcategory" }, method = RequestMethod.GET)
	public String newticketcategory( ModelMap model) {
		 
		model.addAttribute("ticketcategories", new TicketCategory() );
		model.addAttribute("edit", false);
		model.addAttribute("loggedinuser", getPrincipal());
		return "addticketcategory";
	}
	

	@RequestMapping(value = { "/newticketcategory" },  method = RequestMethod.POST)
	public String savenewCategory(@Valid @ModelAttribute("ticketcategories") TicketCategory ticketCategory, BindingResult result,
			ModelMap model ) {
		
		if (result.hasErrors()) {
			model.addAttribute("loggedinuser", getPrincipal());
			return "addticketcategory";
		}
		incidentService.savenewticketcategory(ticketCategory);
		model.addAttribute("loggedinuser", getPrincipal());
		return "redirect:/admin";
		
	}
	
	@RequestMapping(value = { "/delete-ticketcategory-{ticketcategory}" }, method = RequestMethod.GET)
	public String deleteticketcategory( @PathVariable String ticketcategory) {
		
		incidentService.deleteticketcategory(ticketcategory);
		return "redirect:/admin";
		 
	}
	
	@RequestMapping(value = { "/newticketseverity" }, method = RequestMethod.GET)
	public String newticketseverity( ModelMap model) {
		 
		model.addAttribute("ticketseverity", new TicketSeverity() );
		model.addAttribute("edit", false);
		model.addAttribute("loggedinuser", getPrincipal());
		return "addticketseverity";
	}
	
	@RequestMapping(value = { "/newticketseverity" },  method = RequestMethod.POST)
	public String savenewticketseverity(@Valid @ModelAttribute("ticketseverity") TicketSeverity ticketseverity, BindingResult result,
			ModelMap model ) {
		if (result.hasErrors()) {
			model.addAttribute("loggedinuser", getPrincipal());
			return "addticketseverity";
		}
		
		incidentService.savenewticketseverity(ticketseverity);
		model.addAttribute("loggedinuser", getPrincipal());
		return "redirect:/admin";
	}
	
	@RequestMapping(value = { "/delete-ticketseverity-{ticketsseverity}" }, method = RequestMethod.GET)
	public String deleteticketseverity( @PathVariable String ticketsseverity) {
		incidentService.deleteticketseverity(ticketsseverity);
		return "redirect:/admin";
	}
	
	@RequestMapping(value = { "/newticketsubcategory" }, method = RequestMethod.GET)
	public String newticketsubcategory( ModelMap model) {
		model.addAttribute("ticketsubcategory", new TicketSubcategory() );
		model.addAttribute("edit", false);
		model.addAttribute("loggedinuser", getPrincipal());
		return "addticketsubcategory";
	}
	
	@RequestMapping(value = { "/newticketsubcategory" },  method = RequestMethod.POST)
	public String savenewticketsubcategory(@Valid @ModelAttribute("ticketsubcategory") TicketSubcategory ticketsubcategory, BindingResult result,
			ModelMap model ) {
		
		if (result.hasErrors()) {
			model.addAttribute("loggedinuser", getPrincipal());
			return "addticketsubcategory";
		}
		
		incidentService.savenewticketsubcategory(ticketsubcategory);
		model.addAttribute("loggedinuser", getPrincipal());
		return "redirect:/admin";
	}
	
	@RequestMapping(value = { "/delete-ticketsubcategory-{ticketsubcategory}" }, method = RequestMethod.GET)
	public String deleteticketsubcategory( @PathVariable String ticketsubcategory) {
		
		incidentService.deleteticketsubcategory(ticketsubcategory);
		return "redirect:/admin";
	}
	 
	@RequestMapping(value = { "/newticketstatus" }, method = RequestMethod.GET)
	public String newticketstatus( ModelMap model) {
		 
		model.addAttribute("ticketstatus", new Ticketstatus() );
		model.addAttribute("edit", false);
		model.addAttribute("loggedinuser", getPrincipal());
		return "addticketstatus";
	}
	
	@RequestMapping(value = { "/newticketstatus" },  method = RequestMethod.POST)
	public String savenewticketstatus(@Valid @ModelAttribute("ticketstatus") Ticketstatus ticketstatus, BindingResult result,
			ModelMap model ) {
		
		if (result.hasErrors()) {
			model.addAttribute("loggedinuser", getPrincipal());
			return "addticketstatus";
		}
		
		incidentService.savenewticketstatus(ticketstatus);
		model.addAttribute("loggedinuser", getPrincipal());
		return "redirect:/admin";
	}
	
	@RequestMapping(value = { "/delete-ticketstatus-{ticketstat}" }, method = RequestMethod.GET)
	public String deleteticketstatus( @PathVariable String ticketstat) {
		incidentService.deleteticketticketstatus(ticketstat);
		return "redirect:/admin";
	}
	
	
	@RequestMapping(value = { "/searchticketid/{id}" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Incident> searchticketid(ModelMap model, @PathVariable("id") String id) {
		 
		return  incidentService.searchticketid(id);
	}
	
	@RequestMapping(value = { "/searchticketdesc/{desc}" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Incident> searchticketdesc(ModelMap model, @PathVariable("desc") String desc) {
		 
		return  incidentService.searchticketdesc(desc);
	}
	
	@RequestMapping(value = { "/searchsolutiondesc/{desc}" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Solution> searchsolutiondesc(ModelMap model, @PathVariable("desc") String desc) {
		 
		return  solutionService.searchsolutiondesc(desc);
	}
	
	
	

}
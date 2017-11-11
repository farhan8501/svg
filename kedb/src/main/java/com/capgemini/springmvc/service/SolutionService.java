package com.capgemini.springmvc.service;

import java.util.List;

import com.capgemini.springmvc.model.Solution;
import com.capgemini.springmvc.model.SolutionStatus;
import com.capgemini.springmvc.model.User;

public interface SolutionService {

	void deleteSolutionByID(int id);

	Solution  findById(int id);
	
	List<Solution> getSolutionStatus();
	
	String findByUser(int id,String userName);

	List<Solution> getRelevanceIncidents(String id);

	List<Solution> getSolutionscategorycount();

	List<Solution> getSolutionstatuscount();

	List<Solution> getSolutionlinkedcount();

	List<Solution> getContributercount();

	List<Solution> getSolutionyearlycount();
	
	List<Solution> getTopsolutions();
	
	List<Solution> getrecentsolutions();
	
	List<Solution> findAllSolutions(); 
	
	void saveSolution(Solution solution);
	
	void updateSolution(Solution solution);
	
	String linkDelinkSolution(String status,String sid,String tid);
	
	int solutionRating(int id);
	
	 int solutionRatingvalue(int id);
	
	String SolutionLink(String sid, String id);
	
    int	findStatus(int id);
	
	void approveSolution(int id);
	
	List<Solution> getAllSolutions();
	
	List<Solution> getTicketCategories();

	List<Solution> getTicketStatus();
	
	List<Solution> getTicketSeverity();
	
	List<Solution> findAllSolutionStatus();
	
	void savenewStatus(SolutionStatus solutionStatus);
	
	void deletesolutionstatusname(String solstatus);
	
	List<Solution> searchsolutiondesc(String desc);
}
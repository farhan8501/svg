package com.capgemini.springmvc.dao;

import java.util.List;

import com.capgemini.springmvc.model.Solution;
import com.capgemini.springmvc.model.SolutionStatus;

public interface SolutionDao {

	void deleteBySolutionID(int id);

	Solution findById(int id);
	String findByUser(int id, String userName);
	List<Solution> getSolutionStatus();
	List<Solution> getRelevanceIncidents(String id);
	List<Solution> getSolutionscategorycount();
	List<Solution> getSolutionstatuscount();
	List<Solution> getSolutionlinkedcount();
	List<Solution> getContributercount();
	List<Solution> getSolutionyearlycount();
	List<Solution> getTopsolutions();
	List<Solution> getrecentsolutions();
	List<Solution> findAllSolutions();
	void save(Solution solution);
    String linkDelinkSolution(String status,String sid, String tid);
    int solutionRating(int id);
    int solutionRatingvalue(int id);
    void approveSolution(int id);
    int	findStatus(int id);
    List<Solution> getAllSolutions();
    String SolutionLink(String sid, String id);
    List<Solution> getTicketCategories();
    List<Solution> getTicketStatus();
    List<Solution> getTicketSeverity();
    List<Solution> findAllSolutionStatus();
    void savenewStatus(SolutionStatus solutionStatus);
    void deletesolutionstatusname(String solstatus);
    List<Solution> searchsolutiondesc(String desc);
}

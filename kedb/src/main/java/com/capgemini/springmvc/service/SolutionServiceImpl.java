package com.capgemini.springmvc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capgemini.springmvc.dao.SolutionDao;
import com.capgemini.springmvc.model.Solution;
import com.capgemini.springmvc.model.SolutionStatus;
import com.capgemini.springmvc.model.User;

@Service("solutionService")
@Transactional
public class SolutionServiceImpl implements SolutionService {

	@Override
	public List<Solution> getTicketStatus() {
		return dao.getTicketStatus();
	}

	@Override
	public int findStatus(int id) {
		return dao.findStatus(id);
	}

	@Override
	public void approveSolution(int id) {
		dao.approveSolution(id);
	}

	@Autowired
	private SolutionDao dao;

	@Override
	public void deleteSolutionByID(int id) {
		dao.deleteBySolutionID(id);
	}

	@Override
	public Solution findById(int id) {
		return dao.findById(id);
		
	}

	@Override
	public List<Solution> getRelevanceIncidents(String id) {
		return dao.getRelevanceIncidents(id);
	}

	@Override
	public int solutionRating(int id) {
		 
		return dao.solutionRating(id);
	}

	@Override
	public void saveSolution(Solution solution) {
		dao.save(solution);
	}

	@Override
	public List<Solution> getSolutionscategorycount() {

		return dao.getSolutionscategorycount();
	}

	@Override
	public List<Solution> getSolutionstatuscount() {

		return dao.getSolutionstatuscount();
	}

	@Override
	public List<Solution> getSolutionlinkedcount() {
		return dao.getSolutionlinkedcount();
	}

	@Override
	public List<Solution> getContributercount() {
		return dao.getContributercount();
	}

	
	
	@Override
	public List<Solution> getTicketCategories() {
		return dao.getTicketCategories();
	}

	@Override
	public List<Solution> getSolutionyearlycount(){
		return dao.getSolutionyearlycount();
	}
	 
	@Override
	public List<Solution> getTopsolutions(){
		return dao.getTopsolutions();
	}
	
	@Override
	public List<Solution> getrecentsolutions(){
		return dao.getrecentsolutions();
	}
	
	public List<Solution> findAllSolutions(){
		return dao.findAllSolutions();
		
	}
	public List<Solution> getTicketSeverity(){
		return dao.getTicketSeverity();
	}
	
	@Override
	public List<Solution> getAllSolutions() {
		return dao.getAllSolutions();
	}
	
	@Override
	public List<Solution> getSolutionStatus(){
		return dao.getSolutionStatus();
	}

	@Override
	public void updateSolution(Solution solution) {
		Solution entity = dao.findById(solution.getSolution_id());
		if(entity!=null){
			entity.setSearch_keyword(solution.getSearch_keyword());
			entity.setSolution_description(solution.getSolution_description());
			entity.setApplicationCategory(solution.getApplicationCategory());
			entity.setIncident(solution.getIncident());
			entity.setStatus(solution.getStatus());
			
			
		}
		
	}
	@Override
	public String linkDelinkSolution(String status,String sid,String tid){
		return dao.linkDelinkSolution(status,sid,tid);
		
	}

	@Override
	public String findByUser(int id,String userName){
		return dao.findByUser(id,userName);
	}
	
	@Override
	public String SolutionLink(String sid, String id) {
		
		return  dao.SolutionLink(sid,id);
	}
	
	@Override
	public int solutionRatingvalue(int id){
		return  dao.solutionRatingvalue(id);
	}
	@Override
	public List<Solution> findAllSolutionStatus(){
		return  dao.findAllSolutionStatus();
	}
	 
	@Override
	public void savenewStatus(SolutionStatus solutionStatus){
		dao.savenewStatus(solutionStatus);
	}
	
	@Override
	public void deletesolutionstatusname(String solstatus){
		dao.deletesolutionstatusname(solstatus);
	}
	
	@Override
	public List<Solution> searchsolutiondesc(String desc){
		return  dao.searchsolutiondesc(desc);
		
	}
}

package com.capgemini.springmvc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capgemini.springmvc.dao.IncidentDao;
import com.capgemini.springmvc.model.ApplicationCategory;
import com.capgemini.springmvc.model.Incident;
import com.capgemini.springmvc.model.TicketCategory;
import com.capgemini.springmvc.model.TicketSeverity;
import com.capgemini.springmvc.model.TicketSubcategory;
import com.capgemini.springmvc.model.Ticketstatus;


@Service("incidentService")
@Transactional
public class IncidentServiceImpl  implements IncidentService{

	@Autowired
	IncidentDao dao;


	@Override
	public List<Incident> getAllIncidents() {
		return dao.getAllIncidents();
	}

	public List<Incident> getIncidentstatuscount(){
		return dao.getIncidentstatuscount();
		
	}
	public List<Incident> getIncidentlinkedcount(){
		return dao.getIncidentlinkedcount();
		
	}
	@Override
	public Incident findById(int id) {
		return dao.findById(id);
	}
	public List<Incident> getAllTickets(){
		return dao.getAllTickets();
	}
	@Override
	public Incident getTicket(int id){
		return dao.getTicket(id);
	}
	
	@Override
	public List<Incident> getProfileTickets(String profileUser){
		return dao.getProfileTickets(profileUser);
	}
	
	@Override
	public List<Incident> findAllCategories(){
		return dao.findAllCategories();
	}
	
	@Override
	public void savenewticketcategory(TicketCategory ticketCategory){
		dao.savenewticketcategory(ticketCategory);
	}
	@Override
	public void deleteticketcategory(String ticketcategoryname){
		dao.deleteticketcategory(ticketcategoryname);
	}
	@Override
	public List<Incident> findAllticketsubcategories(){
		return dao.findAllticketsubcategories();
		
	}
	
	@Override
	public List<Incident> findAllticketseverities(){
		return dao.findAllticketseverities();
		
	}
	@Override
	public List<Incident> findAllticketstatus(){
		return dao.findAllticketstatus();
		
	}
	@Override
	public void savenewticketseverity(TicketSeverity ticketseverity){
		dao.savenewticketseverity(ticketseverity);
	}
	@Override
	public void deleteticketseverity(String ticketsseverity){
		dao.deleteticketseverity(ticketsseverity);
	}
	
	@Override
	public void savenewticketsubcategory(TicketSubcategory ticketsubcategory){
		dao.savenewticketsubcategory(ticketsubcategory);
		
	}
	@Override
	public void deleteticketsubcategory(String ticketsubcategory){
		dao.deleteticketsubcategory(ticketsubcategory);
		
	}
	
	@Override
	public void savenewticketstatus(Ticketstatus ticketstatus){
		dao.savenewticketstatus(ticketstatus);
	}
	
	@Override
	public void deleteticketticketstatus(String ticketstat){
		dao.deleteticketticketstatus(ticketstat);
		
	}
	
	@Override
	public List<Incident> searchticketid(String id){
		return dao.searchticketid(id);
	}
	
	@Override
	public List<Incident> searchticketdesc(String desc){
		return dao.searchticketdesc(desc);
	}
	

}

package com.capgemini.springmvc.service;

import java.util.List;

import com.capgemini.springmvc.model.Incident;
import com.capgemini.springmvc.model.TicketCategory;
import com.capgemini.springmvc.model.TicketSeverity;
import com.capgemini.springmvc.model.TicketSubcategory;
import com.capgemini.springmvc.model.Ticketstatus;

public interface IncidentService {

	public List<Incident> getAllIncidents();
	public List<Incident> getIncidentstatuscount();
	public List<Incident> getIncidentlinkedcount();
	public Incident findById(int id);
	public List<Incident> getAllTickets();
	public Incident getTicket(int id);
	public List<Incident> getProfileTickets(String profileUser);
	public List<Incident> findAllCategories();
	void savenewticketcategory(TicketCategory ticketCategory);
	void deleteticketcategory(String ticketcategoryname);
	public List<Incident> findAllticketsubcategories();
	public List<Incident> findAllticketseverities();
	public List<Incident> findAllticketstatus();
	void savenewticketseverity(TicketSeverity ticketseverity);
	void deleteticketseverity(String ticketsseverity);
	void savenewticketsubcategory(TicketSubcategory ticketsubcategory);
	void deleteticketsubcategory(String ticketsubcategory);
	void savenewticketstatus(Ticketstatus ticketstatus);
	void deleteticketticketstatus(String ticketstat);
	public List<Incident> searchticketid(String id);
	public List<Incident> searchticketdesc(String desc);
}

package com.capgemini.springmvc.dao;

import java.util.List;

import com.capgemini.springmvc.model.Incident;
import com.capgemini.springmvc.model.TicketCategory;
import com.capgemini.springmvc.model.TicketSeverity;
import com.capgemini.springmvc.model.TicketSubcategory;
import com.capgemini.springmvc.model.Ticketstatus;

public interface IncidentDao {

	List<Incident> getAllIncidents();
	List<Incident> getIncidentstatuscount();
	List<Incident> getIncidentlinkedcount();
	Incident findById(int id);
	List<Incident> getAllTickets();
	Incident getTicket(int id);
	List<Incident> getProfileTickets(String profileUser);
	List<Incident> findAllCategories();
	void savenewticketcategory(TicketCategory ticketCategory);
	void deleteticketcategory(String ticketcategoryname);
	List<Incident> findAllticketsubcategories();
	List<Incident> findAllticketseverities();
	List<Incident> findAllticketstatus();
	void savenewticketseverity(TicketSeverity ticketseverity);
	void deleteticketseverity(String ticketsseverity);
	void savenewticketsubcategory(TicketSubcategory ticketsubcategory);
	void deleteticketsubcategory(String ticketsubcategory);
	void savenewticketstatus(Ticketstatus ticketstatus);
	void deleteticketticketstatus(String ticketstat);
	List<Incident> searchticketid(String id);
	List<Incident> searchticketdesc(String desc);
}

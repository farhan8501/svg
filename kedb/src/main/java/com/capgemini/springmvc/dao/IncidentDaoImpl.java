package com.capgemini.springmvc.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.capgemini.springmvc.model.AllIncidents;
import com.capgemini.springmvc.model.Incident;
import com.capgemini.springmvc.model.IncidentStatuscount;
import com.capgemini.springmvc.model.ProfileIncidents;
import com.capgemini.springmvc.model.Solution;
import com.capgemini.springmvc.model.Solution_Categorycount;
import com.capgemini.springmvc.model.Solutionlinkedcount;
import com.capgemini.springmvc.model.TicketCategory;
import com.capgemini.springmvc.model.TicketSeverity;
import com.capgemini.springmvc.model.TicketSubcategory;
import com.capgemini.springmvc.model.Ticketstatus;

@Repository("incidentDao")
public class IncidentDaoImpl extends AbstractDao<Integer, Incident> implements IncidentDao {

	static final Logger logger = LoggerFactory.getLogger(IncidentDaoImpl.class);

	/*
	 * @Override
	 * 
	 * @SuppressWarnings("unchecked") public List<Incident> getAllIncidents() {
	 * 
	 * List<Incident> incidents = getEntityManager().createQuery(
	 * "SELECT u FROM Incident u ORDER BY u.id ASC").getResultList(); return
	 * incidents; }
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<Incident> getAllIncidents() {
		Criteria crit = createEntityCriteria();
		crit.addOrder(Order.asc("ticket_id"));
		return crit.list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Incident> getAllTickets() {

		Session session = getSession();
		String sql_query = "SELECT DISTINCT t.ticket_id,  t.ticket_number, t.ticket_priority, t.ticket_status, t.category_name, t.subcategory_name, t.ratingclassvalue, 'Linked' as solutionLinked FROM solution s, solution_id_ticket_id st, ticket t WHERE s.solution_id = st.solutions_id  AND st.ticket_id = t.ticket_id  union all  select DISTINCT t.ticket_id,  t.ticket_number, t.ticket_priority, t.ticket_status, t.category_name, t.subcategory_name, t.ratingclassvalue, 'NotLinked' as solutionLinked from ticket t where t.ticket_id not in (select DISTINCT st.ticket_id from  solution_id_ticket_id st WHERE st.ticket_id  IS NOT NULL )";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(AllIncidents.class);
		List result = query.list();
		return result;

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Incident> getIncidentstatuscount() {

		Session session = getSession();
		String sql_query = "SELECT i.status as status, count(i.status) as count FROM incident i GROUP BY  i.status order by count desc";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(IncidentStatuscount.class);
		List result = query.list();
		return result;

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Incident> getIncidentlinkedcount() {

		Session session = getSession();
		String sql_query = "SELECT 'Linked' as name , count(distinct ticket_id) as count FROM kedb.solution_id_ticket_id UNION ALL SELECT 'Not linked' as name, count(distinct ticket_id) as count FROM ticket  where ticket_id not in(SELECT distinct ticket_id FROM kedb.solution_id_ticket_id) ";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(Solutionlinkedcount.class);
		List result = query.list();
		return result;

	}

	@Override
	public Incident findById(int id) {
		return getByKey(id);
	}

	public Incident getTicket(int id) {
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("ticket_id", id));
		Incident incident = (Incident) crit.uniqueResult();
		logger.info("abc Solution abc : {}", incident);
		if (incident != null) {
			Hibernate.initialize(Incident.class);
		}
		return incident;

		/*
		 * Session session = getSession(); String sql_query =
		 * "SELECT * FROM kedb.ticket where ticket_id =" +id;; SQLQuery query =
		 * session.createSQLQuery(sql_query); query.addEntity(Incident.class);
		 * Incident result = (Incident)query.uniqueResult(); return result;
		 */
	}

	@Override
	public List<Incident> getProfileTickets(String profileUser) {
		Session session = getSession();
		String sql_query = "SELECT ticket_id, ticket_number, ticket_desc, ticket_priority, ticket_status, category_name, "
				+ "opened_date, closed_date, assigned_to FROM ticket where assigned_to like :User and ticket_status in('In-Progress', 'Open') "
				+ "order by opened_date desc";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.setParameter("User", profileUser);
		query.addEntity(ProfileIncidents.class);
		List result = query.list();
		return result;
	}
	
	@Override
	public  List<Incident> findAllCategories(){
		Session session = getSession();
		String sql_query = "SELECT category_name FROM kedb.ticket_category; ";
		SQLQuery query = session.createSQLQuery(sql_query);
		List result = query.list();
		return result;
		
	}
	
	@Override
	public void savenewticketcategory(TicketCategory ticketCategory){
		Session session = getSession();
		 String sql_query = "insert into ticket_category (category_name) values (:categoryname);";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.setParameter("categoryname", ticketCategory.getCategoryName());
		 query.executeUpdate();
	}
	
	@Override
	public void deleteticketcategory(String ticketcategoryname){
		 Session session = getSession();
		 String sql_query = "delete from ticket_category where category_name = '" + ticketcategoryname + "'";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.executeUpdate();
	}
	
	@Override
	public List<Incident>  findAllticketsubcategories(){
		Session session = getSession();
		String sql_query = "SELECT subcategory_name FROM ticket_subcategory; ";
		SQLQuery query = session.createSQLQuery(sql_query);
		List result = query.list();
		return result;
	}
	
	@Override
	public List<Incident>  findAllticketseverities(){
		Session session = getSession();
		String sql_query = "SELECT severity_name FROM ticket_severity;";
		SQLQuery query = session.createSQLQuery(sql_query);
		List result = query.list();
		return result;
	}
	@Override
	public  List<Incident> findAllticketstatus(){
		Session session = getSession();
		String sql_query = "SELECT ticket_status_name FROM ticket_status;";
		SQLQuery query = session.createSQLQuery(sql_query);
		List result = query.list();
		return result;
	}
	@Override
	public void savenewticketseverity(TicketSeverity ticketseverity){
		 Session session = getSession();
		 String sql_query = "insert into ticket_severity (severity_name) values (:severityyname);";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.setParameter("severityyname", ticketseverity.getSeverityname());
		 query.executeUpdate();
	}

	@Override
	public void deleteticketseverity(String ticketsseverity){
		 Session session = getSession();
		 String sql_query = "delete from ticket_severity where severity_name = '" + ticketsseverity + "'";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.executeUpdate();
	}
	
	@Override
	public void savenewticketsubcategory(TicketSubcategory ticketsubcategory){
		 Session session = getSession();
		 String sql_query = "insert into ticket_subcategory (subcategory_name) values (:ticketsubcategory);";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.setParameter("ticketsubcategory", ticketsubcategory.getSubcategoryName());
		 query.executeUpdate();
		
	}
	
	@Override
	public void deleteticketsubcategory(String ticketsubcategory){
		 Session session = getSession();
		 String sql_query = "delete from ticket_subcategory where subcategory_name = '" + ticketsubcategory + "'";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.executeUpdate();
		
	}
	
	@Override
	public void savenewticketstatus(Ticketstatus ticketstatus){
		 Session session = getSession();
		 String sql_query = "insert into ticket_status (ticket_status_name) values (:ticketstatus);";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.setParameter("ticketstatus", ticketstatus.getTicketstatusname());
		 query.executeUpdate();
		
	}
	
	@Override
	public void deleteticketticketstatus(String ticketstat){
		 Session session = getSession();
		 String sql_query = "delete from ticket_status where ticket_status_name = '" + ticketstat + "'";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.executeUpdate();
	}
	
	@Override
	public List<Incident> searchticketid(String id){
		Session session = getSession();
		String sql_query = "SELECT * FROM kedb.ticket where ticket_number =  '" + id + "'";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(Incident.class);
		List result = query.list();
		return result;
	}
	@Override
	public List<Incident> searchticketdesc(String desc){
		Session session = getSession();
		String sql_query = "SELECT * FROM kedb.ticket where ticket_desc like  '%"+desc+"%'";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(Incident.class);
		List result = query.list();
		return result;
	}
}

package com.capgemini.springmvc.dao;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.capgemini.springmvc.model.AllSolutions;
import com.capgemini.springmvc.model.AppCategory;
import com.capgemini.springmvc.model.Contributercount;
import com.capgemini.springmvc.model.Incident;
import com.capgemini.springmvc.model.Solution;
import com.capgemini.springmvc.model.SolutionStatus;
import com.capgemini.springmvc.model.SolutionStatuscount;
import com.capgemini.springmvc.model.Solution_Categorycount;
import com.capgemini.springmvc.model.Solution_Relevances;
import com.capgemini.springmvc.model.Solution_Relveance;
import com.capgemini.springmvc.model.Solutionlinkedcount;
import com.capgemini.springmvc.model.Solutionstop;
import com.capgemini.springmvc.model.Solutionyearlycount;

@Repository("solutionDao")
public class SolutionDaoImpl extends AbstractDao<Integer, Solution> implements SolutionDao {

	@Override
	public int findStatus(int id) {
		Session session = getSession();
		String sql_query = "select Count(*) from solution where solution_status_name =:string and solution_id =:id";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.setParameter("id", id);
		 query.setParameter("string", "Approved");
		 BigInteger count=(BigInteger)query.uniqueResult();
		 return count.intValue();
	}

	static final Logger logger = LoggerFactory.getLogger(SolutionDaoImpl.class);

	@Override
	public void deleteBySolutionID(int id) {
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("solution_id", id));
		Solution solution = (Solution) crit.uniqueResult();
		delete(solution);
	}

	@Override
	public Solution findById(int id) {
		
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("solution_id", id));
		Solution solution = (Solution) crit.uniqueResult();
		logger.info("abc Solution abc : {}", solution);
		if(solution!=null){
			Hibernate.initialize(solution.getApplicationCategory()); 
			Hibernate.initialize(solution.getIncident());
		}
		return solution;
	}

	@SuppressWarnings("unchecked")
	public List<Solution> findAllSolutions() {
		Session session = getSession();
		String sql_query = "SELECT * FROM kedb.solution";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(Solution.class);
		List<Solution> result = query.list();
		return result;
		
	}

	@Override
	public List<Solution> getAllSolutions() {
		Session session = getSession();
		String sql_query = "SELECT  s.solution_id,  COUNT(st.ticket_id) as   count, s.solution_search_keyword, s.created_by, "
				+ "s.solution_status_name, s.ratingclassvalue, s.sortcolumn , ac.category_name,'Linked' as solutionLinked "
				+ "FROM solution s, solution_id_ticket_id st, ticket t , solution_id_application_category sa, application_category ac "
				+ "WHERE s.solution_id = st.solutions_id  AND st.ticket_id = t.ticket_id and s.solution_id = sa.solution_id and "
				+ "sa.application_category_id=ac.category_id  GROUP BY st.solutions_id " 
				+ "union all select s.solution_id, ' ' as count, s.solution_search_keyword, s.created_by, "
				+ "s.solution_status_name, s.ratingclassvalue, s.sortcolumn , ac.category_name, 'Not Linked' as solutionLinked "
				+ "FROM solution s,solution_id_application_category sa, application_category ac "
				+ "where  s.solution_id  = sa.solution_id and ac.category_id = sa.application_category_id "
				+ "and s.solution_id not in (select DISTINCT st.solutions_id from  solution_id_ticket_id st WHERE st.solutions_id  IS NOT NULL)";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(AllSolutions.class);
		List<Solution> result = query.list();
		return result;
	}

	@Override
	public List<Solution> getRelevanceIncidents(String id) {
    	Session session = getSession();
    	
    	String sql_ticketid="select ticket_id from ticket where ticket_number =:id";
    	SQLQuery qId = session.createSQLQuery(sql_ticketid);
    	qId.setParameter("id", id);
    	BigInteger ticketid =  (BigInteger) qId.uniqueResult();
    	
    	
    	String sql_desc=" SELECT ticket_desc as descrption FROM ticket where ticket_number =:id";
    	SQLQuery qDesc = session.createSQLQuery(sql_desc);
    	qDesc.setParameter("id", id);
    	String description =  (String)qDesc.uniqueResult();
    	
    	String sql_solutionId ="Select result.solution_id From solution_id_ticket_id t, (SELECT solution_id,solution_search_keyword, ROUND(((MATCH(solution_search_keyword) AGAINST (:description)) / scores.max_score) * 100) as relevance FROM solution s,(SELECT MAX(MATCH(solution_search_keyword) AGAINST(:description)) as max_score FROM solution LIMIT 1)"
    						+ "scores HAVING relevance > 0 ) as result where  t.ticket_id=:ticketid and result.solution_id=t.solutions_id  ORDER BY relevance DESC" ;
    	SQLQuery qSolutionid = session.createSQLQuery(sql_solutionId);
    	qSolutionid.setParameter("ticketid", ticketid);
    	qSolutionid.setParameter("description", description);
    	List<BigInteger> solutionIds =  (List<BigInteger>)qSolutionid.list();
    	String sId;
    	if(solutionIds.isEmpty()){
    		sId="0";
    	}
    	else{
    	sId=solutionIds.toString();
    	sId = sId.substring(1,sId.length()-1);
    	}
    	
    	
    	String sql_solutionslink ="Select result.solution_id, result.solution_search_keyword, result.relevance, 'DeLink' as solutionlinked From solution_id_ticket_id t, (SELECT solution_id,solution_search_keyword, ROUND(((MATCH(solution_search_keyword) AGAINST (:description)) / scores.max_score) * 100) as relevance FROM solution s,(SELECT MAX(MATCH(solution_search_keyword) AGAINST(:description)) as max_score FROM solution LIMIT 1)"
    						+ "scores where s.solution_status_name like 'Approved' HAVING relevance > 0 ) as result where  t.ticket_id= :ticketid and result.solution_id=t.solutions_id  ORDER BY relevance DESC" ;
    	SQLQuery qSolutionlink = session.createSQLQuery(sql_solutionslink);
    	qSolutionlink.setParameter("ticketid", ticketid);
    	qSolutionlink.setParameter("description", description);
    	qSolutionlink.addEntity(Solution_Relveance.class);
    	List solutionlink =  qSolutionlink.list();
    	
    	
    	String sql_solutionsnotlink ="SELECT solution_id, solution_search_keyword as search_keywords, ROUND(((MATCH(solution_search_keyword) AGAINST (:description)) / scores.max_score) * 100) as relevance ,'Link' as solutionlinked FROM solution , (SELECT MAX(MATCH(solution_search_keyword) AGAINST(:description)) as max_score   FROM solution LIMIT 1) scores where solution_status_name like 'Approved' and solution_id not in(:sId) HAVING relevance > 0  ORDER BY relevance DESC";
    	SQLQuery qSolutionnotlink = session.createSQLQuery(sql_solutionsnotlink);
    	qSolutionnotlink.setParameter("sId", sId);
    	qSolutionnotlink.setParameter("description", description);
    	qSolutionnotlink.addEntity(Solution_Relevances.class);
    	List solutionnotlink =  qSolutionnotlink.list();
    	
    	List allSolutions = new ArrayList();
    	allSolutions.addAll(solutionlink);
    	allSolutions.addAll(solutionnotlink);

		return allSolutions;
		
	}

	@Override
	public List<Solution> getSolutionscategorycount() {
		Session session = getSession();
		String sql_query = "SELECT category_name as name, count(*) as count FROM application_category c INNER JOIN kedb.solution_id_application_category r ON c.category_id = r.application_category_id group by application_category_id order by count desc LIMIT 5 "; 
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(Solution_Categorycount.class);
		List result = query.list();
		return result;
	}
	
	@Override
	public List<Solution> getSolutionStatus(){
		Session session = getSession();
		String sql_query = "SELECT * FROM kedb.solution_status"; 
		SQLQuery query = session.createSQLQuery(sql_query);
		List result = query.list();
		return result;
	}

	
	@SuppressWarnings("unchecked")
	@Override
	public List<Solution> getSolutionstatuscount() {
		Session session = getSession();
		String sql_query = "SELECT s.solution_status_name as status, count(s.solution_status_name)  as count FROM solution s GROUP BY  s.solution_status_name order by count desc";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(SolutionStatuscount.class);
		List result = query.list();
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public String findByUser(int id, String userName){
		Session session = getSession();
		String sql_query = "select count(*) from solution where solution_id= :id and created_by like :user ";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.setParameter("id", id);
		query.setParameter("user", userName);
		BigInteger count = (BigInteger)query.uniqueResult();
		if (count.intValue()==0){
				return "false";
		}
		else
			return "true";
		 
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Solution> getSolutionlinkedcount() {
		Session session = getSession();
		String sql_query = "Select  'Linked' as name , count( DISTINCT s.solution_id) as count  From solution_id_ticket_id t , solution s "
				+ "where s.solution_status_name like 'Approved' and s.solution_id=t.solutions_id "
				+ "UNION ALL "
				+ "Select  'Not Linked' as name, count(s.solution_id) - (Select count( DISTINCT s.solution_id) as count  From solution_id_ticket_id t , solution s "
				+ "where s.solution_status_name like 'Approved' and s.solution_id=t.solutions_id ) as count  From   solution s "
				+ "where s.solution_status_name like 'Approved' "; 
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(Solutionlinkedcount.class);
		List result = query.list();
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Solution> getContributercount() {
		Session session = getSession();
		String sql_query = "SELECT s.created_by as username, count(s.created_by)  as count FROM solution s GROUP BY  s.created_by order by count desc LIMIT 5";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(Contributercount.class);
		List result = query.list();
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Solution> getSolutionyearlycount() {
		Session session = getSession();
		String sql_query = " SELECT  created_date as 'date', count(*) as count FROM kedb.solution WHERE created_date <= CURDATE() GROUP BY date";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(Solutionyearlycount.class);
		List result = query.list();
		return result;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Solution> getTopsolutions() {
		Session session = getSession(); 
		String sql_query = "SELECT st.solutions_id, s.ratingclassvalue, COUNT(st.solutions_id) AS count "
				+ "FROM solution s, solution_id_ticket_id st, ticket t , solution_id_application_category sa, application_category ac "
				+ "WHERE s.solution_id = st.solutions_id  AND st.ticket_id = t.ticket_id and s.solution_id = sa.solution_id and "
				+ "sa.application_category_id=ac.category_id and s.solution_status_name like 'Approved' GROUP BY st.solutions_id ORDER BY count desc LIMIT 5";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(Solutionstop.class);
		List<Solution> result = query.list();
		return result;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Solution> getrecentsolutions() {
		Session session = getSession();
		String sql_query = " SELECT Solution_id from kedb.solution where solution_status_name like 'Approved' ORDER BY  last_update_date desc LIMIT 5";
		SQLQuery query = session.createSQLQuery(sql_query);
		List<Solution> result = query.list();
		return result;
	}
	
	@Override
	public void save(Solution solution) {
		persist(solution);
	}
	@Override
	public String linkDelinkSolution(String status,String sid, String id){
		Session session = getSession();
		String sql_query="";
		String name="";
		if(status.equals("Link")){
			 sql_query = "insert into solution_id_ticket_id (solutions_id,ticket_id) values (:sid,:id)";
			 SQLQuery query = session.createSQLQuery(sql_query);
			 query.setParameter("sid", sid);
			 query.setParameter("id", id);
			 int count = query.executeUpdate();
				if (count > 0) {
				   name="DeLink";
				}
		}
		if(status.equals("DeLink")){
			 sql_query = "delete from solution_id_ticket_id where solutions_id =:sid  and ticket_id=:id ";
			 SQLQuery query = session.createSQLQuery(sql_query);
			 query.setParameter("sid", sid);
			 query.setParameter("id", id);
			 int count = query.executeUpdate();
				if (count > 0) {
				   name="Link";
				}
		}
		
	return name;
		
	}

	@Override
	public int solutionRating(int id) {
		Session session = getSession();
		String sql_query = "SELECT ratingclassvalue FROM solution WHERE solution_id =:id";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.setParameter("id", id);
		 BigInteger count = (BigInteger)query.uniqueResult();
		 String sql_queryadd = "UPDATE solution SET ratingclassvalue = ratingclassvalue +1 WHERE solution_id =:id";
		 SQLQuery queryadd = session.createSQLQuery(sql_queryadd);
		 queryadd.setParameter("id", id);
		 queryadd.executeUpdate();
		 	
		return 1;
	}
	
	@Override
	public int solutionRatingvalue(int id) {
		Session session = getSession();
		String sql_query = "SELECT ratingclassvalue FROM solution WHERE solution_id =:id";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.setParameter("id", id);
		 BigInteger count = (BigInteger)query.uniqueResult();
		 return count.intValue();
	}
	@Override
	public String SolutionLink(String sid, String id) {
		Session session = getSession();
		String name;
		BigInteger count;
		String sql_query = "Select count(*) From solution_id_ticket_id  where  ticket_id=:id and solutions_id=:sid";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.setParameter("id", id);
		query.setParameter("sid", sid);
		count = (BigInteger) query.uniqueResult();
		if (count.intValue() > 0) {

			name = "DeLink";
		} else {
			name = "Link";

		}

		return name;

	}

	@Override
	public void approveSolution(int id){
		Session session = getSession();
		 String sql_queryadd = "UPDATE solution SET  solution_status_name =:string WHERE solution_id =:id";
		 SQLQuery queryupdate = session.createSQLQuery(sql_queryadd);
		 queryupdate.setParameter("id", id);
		 queryupdate.setParameter("string", "Approved");
		 queryupdate.executeUpdate();
	}

	@Override
	public List<Solution> getTicketCategories() {
		Session session = getSession();
		String sql_query = "SELECT category_name  FROM kedb.application_category order by category_name"; 
		SQLQuery query = session.createSQLQuery(sql_query);
		List result = query.list();
		return result;
	}

	@Override
	public List<Solution> getTicketStatus() {
		Session session = getSession();
		String sql_query = "SELECT ticket_status_name as status FROM kedb.ticket_status"; 
		SQLQuery query = session.createSQLQuery(sql_query);
		List result = query.list();
		return result;
	}
	
	@Override
	public List<Solution> getTicketSeverity(){
			Session session = getSession();
			String sql_query = "SELECT severity_name FROM kedb.ticket_severity"; 
			SQLQuery query = session.createSQLQuery(sql_query);
			List result = query.list();
			return result;
		}
	
	@Override
	public List<Solution> findAllSolutionStatus(){
		Session session = getSession();
		String sql_query = "SELECT solution_status_name FROM kedb.solution_status;"; 
		SQLQuery query = session.createSQLQuery(sql_query);
		List result = query.list();
		return result;
	}
	
	@Override
	public void savenewStatus(SolutionStatus solutionStatus) {
		 Session session = getSession();
		 String sql_query = "insert into solution_status (solution_status_name) values (:status);";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.setParameter("status", solutionStatus.getSolution_status_name());
		 query.executeUpdate();
	}
	@Override
	public void deletesolutionstatusname(String solstatus){
		 Session session = getSession();
		 String sql_query = "delete from solution_status where solution_status_name = '" + solstatus + "'";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.executeUpdate();
	}  
	@Override
	public List<Solution> searchsolutiondesc(String desc){
		Session session = getSession();
		String sql_query = "SELECT * FROM kedb.solution where solution_desc like  '%"+desc+"%'";
		SQLQuery query = session.createSQLQuery(sql_query);
		query.addEntity(Solution.class);
		List result = query.list();
		return result;
	}
	
}
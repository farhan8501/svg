package com.capgemini.springmvc.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.capgemini.springmvc.model.AppCategory;
import com.capgemini.springmvc.model.ApplicationCategory;
import com.capgemini.springmvc.model.Solution;
import com.capgemini.springmvc.model.UserProfile;

@Repository("applicationCategoryDao")
public class ApplicationCategoryDaoImpl extends
AbstractDao<Integer, ApplicationCategory> implements
ApplicationCategoryDao {

	static final Logger logger = LoggerFactory
			.getLogger(ApplicationCategoryDaoImpl.class);

	@Override
	@SuppressWarnings("unchecked")
	public List<ApplicationCategory> findAllCategories() {
		Criteria crit = createEntityCriteria();
		crit.addOrder(Order.asc("categoryName"));
		return crit.list();
	}
   	 
	@Override
	public ApplicationCategory findById(int id) {
		return getByKey(id);
	}
	
	
	@Override
	public void savenewCagetory(AppCategory applicationCategory) {
		 Session session = getSession();
		 String sql_query = "insert into application_category (category_name) values (:categoryname);";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.setParameter("categoryname", applicationCategory.getCategoryName());
		 query.executeUpdate();
	}
	
	@Override
	public void deletecategoryName(String categoryName){
		 Session session = getSession();
		 String sql_query = "delete from application_category where category_name ='" + categoryName + "'";
		 SQLQuery query = session.createSQLQuery(sql_query);
		 query.executeUpdate();
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public List<AppCategory> findCategories(){
		Session session = getSession();
		String sql_query = "SELECT category_name FROM kedb.application_category;";
		SQLQuery query = session.createSQLQuery(sql_query);
		List<AppCategory> result = query.list();
		return result;
	}
	
}

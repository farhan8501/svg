package com.capgemini.springmvc.dao;

import java.util.List;

import com.capgemini.springmvc.model.AppCategory;
import com.capgemini.springmvc.model.ApplicationCategory;
import com.capgemini.springmvc.model.UserProfile;

public interface ApplicationCategoryDao {

	List<ApplicationCategory> findAllCategories();
	ApplicationCategory findById(int id);
	void savenewCagetory(AppCategory applicationCategory);
	void deletecategoryName(String categoryName);
	List<AppCategory> findCategories();
}

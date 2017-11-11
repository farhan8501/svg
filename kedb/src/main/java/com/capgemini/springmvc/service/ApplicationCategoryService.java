package com.capgemini.springmvc.service;

import java.util.List;

import com.capgemini.springmvc.model.AppCategory;
import com.capgemini.springmvc.model.ApplicationCategory;
import com.capgemini.springmvc.model.Solution;

public interface ApplicationCategoryService {

	List<ApplicationCategory> findAllCategories();
	ApplicationCategory findById(int id);
	List<AppCategory> findCategories();
	
	void savenewCagetory(AppCategory applicationCategory);
	void deletecategoryName(String categoryName);
	

}

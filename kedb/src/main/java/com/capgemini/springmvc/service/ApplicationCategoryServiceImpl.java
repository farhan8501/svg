package com.capgemini.springmvc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capgemini.springmvc.dao.ApplicationCategoryDao;
import com.capgemini.springmvc.model.AppCategory;
import com.capgemini.springmvc.model.ApplicationCategory;
import com.capgemini.springmvc.model.UserProfile;

@Service("applicationcategoryService")
@Transactional

public class ApplicationCategoryServiceImpl implements ApplicationCategoryService {

	@Autowired
	private ApplicationCategoryDao dao;

	@Override
	public List<ApplicationCategory> findAllCategories() {
		return dao.findAllCategories();
	}
	
	@Override
	public ApplicationCategory findById(int id) {
		return dao.findById(id);
	}
	
	@Override
	public void savenewCagetory(AppCategory applicationCategory){
	      dao.savenewCagetory(applicationCategory);
	}
	
	@Override
	public void deletecategoryName(String categoryName){
		dao.deletecategoryName(categoryName);
	}
	@Override
	public List<AppCategory> findCategories(){
		return dao.findCategories();
		
	}
}

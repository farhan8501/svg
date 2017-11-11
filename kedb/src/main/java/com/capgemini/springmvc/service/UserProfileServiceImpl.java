package com.capgemini.springmvc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capgemini.springmvc.dao.UserProfileDao;
import com.capgemini.springmvc.model.UserProfile;


@Service("userProfileService")
@Transactional
public class UserProfileServiceImpl implements UserProfileService{

	@Autowired
	UserProfileDao dao;

	@Override
	public List<UserProfile> findAll() {
		return dao.findAll();
	}

	@Override
	public UserProfile findById(int id) {
		return dao.findById(id);
	}

	@Override
	public UserProfile findByType(String type){
		return dao.findByType(type);
	}

	@Override
	public List<UserProfile> getUsersList() {
		return dao.getUsersList();
	}
}

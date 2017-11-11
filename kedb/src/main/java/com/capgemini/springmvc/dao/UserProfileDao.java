package com.capgemini.springmvc.dao;

import java.util.List;

import com.capgemini.springmvc.model.UserProfile;


public interface UserProfileDao {

	List<UserProfile> findAll();

	UserProfile findById(int id);

	UserProfile findByType(String type);

	List<UserProfile> getUsersList();
}

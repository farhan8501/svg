package com.capgemini.springmvc.service;

import java.util.List;

import com.capgemini.springmvc.model.UserProfile;


public interface UserProfileService {

	List<UserProfile> findAll();

	UserProfile findById(int id);

	UserProfile findByType(String type);

	public List<UserProfile> getUsersList();

}

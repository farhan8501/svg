package com.capgemini.springmvc.converter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;

import com.capgemini.springmvc.model.ApplicationCategory;
import com.capgemini.springmvc.service.ApplicationCategoryService;

public class RolesToApplicationCategoryConverter implements Converter<Object, ApplicationCategory>{

	static final Logger logger = LoggerFactory.getLogger(RolesToApplicationCategoryConverter.class);
	
	@Autowired
	ApplicationCategoryService applicationCategoryService;

	/**
	 * Gets UserProfile by Id
	 * @see org.springframework.core.convert.converter.Converter#convert(java.lang.Object)
	 */
	public ApplicationCategory convert(Object element) {
		Integer id = Integer.parseInt((String)element);
		ApplicationCategory profile= applicationCategoryService.findById(id);
		logger.info("Profile : {}",profile);
		return profile;
	}
	
}
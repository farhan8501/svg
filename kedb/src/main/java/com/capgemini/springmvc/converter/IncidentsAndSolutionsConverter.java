package com.capgemini.springmvc.converter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;

import com.capgemini.springmvc.model.Incident;
import com.capgemini.springmvc.service.IncidentService;

public class IncidentsAndSolutionsConverter implements Converter<Object, Incident>{
	static final Logger logger = LoggerFactory.getLogger(IncidentsAndSolutionsConverter.class);
	
	@Autowired
	IncidentService incidentService;
	
	/**
	 * Gets UserProfile by Id
	 * @see org.springframework.core.convert.converter.Converter#convert(java.lang.Object)
	 */
	public Incident convert(Object element) {
		Integer id = Integer.parseInt((String)element);
		Incident profile= incidentService.findById(id);
		logger.info("Profile : {}",profile);
		return profile;
		
	}
	
}

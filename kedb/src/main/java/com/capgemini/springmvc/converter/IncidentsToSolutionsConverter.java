package com.capgemini.springmvc.converter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;

import com.capgemini.springmvc.model.Incident;
import com.capgemini.springmvc.service.IncidentService;

public class IncidentsToSolutionsConverter implements Converter<Object, Incident>{
	static final Logger logger = LoggerFactory.getLogger(IncidentsToSolutionsConverter.class);
	
	@Autowired
	IncidentService incidentService;
	
	public Incident convert(Object element) {
		Integer id = Integer.parseInt((String)element);
		Incident profile= incidentService.findById(id);
		logger.info("Profile : {}",profile);
		return profile;
	
	}

}

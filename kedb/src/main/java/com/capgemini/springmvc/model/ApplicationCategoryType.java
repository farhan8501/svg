package com.capgemini.springmvc.model;

import java.io.Serializable;

public enum ApplicationCategoryType implements Serializable{
		CLAIMS("CLAIMS"),
		POLICY("POLICY"),
		BILLING("BILLING");
	
		String applicationCategoryType;
		
		private ApplicationCategoryType(String applicationCategoryType){
			this.applicationCategoryType = applicationCategoryType;
		}
		
		public String getUserProfileType(){
			return applicationCategoryType;
		}
	}

 

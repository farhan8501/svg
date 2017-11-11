package com.capgemini.springmvc.model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

@Entity
@Table(name = "SOLUTION")
public class Solution implements Serializable {


	private static final long serialVersionUID = 1L;
 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SOLUTION_ID", unique = true, nullable = true)
	private Integer solution_id;
	
	@NotEmpty
	@Column(name = "SOLUTION_DESC", unique = true, nullable = false)
	private String solution_description;
	
	@NotEmpty
	@Column(name = "SOLUTION_SEARCH_KEYWORD", unique = true, nullable = false)
	private String search_keyword;
	
	
	@Column(name = "CREATED_BY", unique = true, nullable = false)
	private String created_by;

	@CreationTimestamp
	@Column(name = "CREATED_DATE", unique = true, nullable = true)
	private Date created_date;
	
	@UpdateTimestamp
	@Column(name = "LAST_UPDATE_DATE", unique = true, nullable = true)
	private Date last_update_date;
	
	
	@Column(name = "SOLUTION_STATUS_NAME", unique = true, nullable = false)
	private String status;
	
	@Column(name = "RATINGCLASSVALUE", unique = true, nullable = false)
	private Integer ratingclassvalue;
  
	@NotEmpty
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "SOLUTION_ID_APPLICATION_CATEGORY", 
             joinColumns = { @JoinColumn(name = "SOLUTION_ID") }, 
             inverseJoinColumns = { @JoinColumn(name = "APPLICATION_CATEGORY_ID") })
	private Set<ApplicationCategory> applicationCategory = new HashSet<ApplicationCategory>();
	
	@NotEmpty
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "SOLUTION_ID_TICKET_ID", 
             joinColumns = { @JoinColumn(name = "SOLUTIONS_ID") }, 
             inverseJoinColumns = { @JoinColumn(name = "TICKET_ID") })
	private Set<Incident> incident = new HashSet<Incident>();

	public Integer getSolution_id() {
		return solution_id;
	}

	public void setSolution_id(Integer solution_id) {
		this.solution_id = solution_id;
	}

	public String getSolution_description() {
		return solution_description;
	}

	public void setSolution_description(String solution_description) {
		this.solution_description = solution_description;
	}

	public String getSearch_keyword() {
		return search_keyword;
	}

	public void setSearch_keyword(String search_keyword) {
		this.search_keyword = search_keyword;
	}

	public String getCreated_by() {
		return created_by;
	}

	public void setCreated_by(String created_by) {
		this.created_by = created_by;
	}

	public Date getCreated_date() {
		return created_date;
	}

	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}

	public Date getLast_update_date() {
		return last_update_date;
	}

	public void setLast_update_date(Date last_update_date) {
		this.last_update_date = last_update_date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Set<ApplicationCategory> getApplicationCategory() {
		return applicationCategory;
	}

	public void setApplicationCategory(Set<ApplicationCategory> applicationCategory) {
		this.applicationCategory = applicationCategory;
	}

	public Set<Incident> getIncident() {
		return incident;
	}

	public void setIncident(Set<Incident> incident) {
		this.incident = incident;
	}
	
	

	public Integer getRatingclassvalue() {
		return ratingclassvalue;
	}

	
	public void setRatingclassvalue(Integer ratingclassvalue) {
		this.ratingclassvalue = ratingclassvalue;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((applicationCategory == null) ? 0 : applicationCategory.hashCode());
		result = prime * result + ((created_by == null) ? 0 : created_by.hashCode());
		result = prime * result + ((created_date == null) ? 0 : created_date.hashCode());
		result = prime * result + ((incident == null) ? 0 : incident.hashCode());
		result = prime * result + ((last_update_date == null) ? 0 : last_update_date.hashCode());
		result = prime * result + ((ratingclassvalue == null) ? 0 : ratingclassvalue.hashCode());
		result = prime * result + ((search_keyword == null) ? 0 : search_keyword.hashCode());
		result = prime * result + ((solution_description == null) ? 0 : solution_description.hashCode());
		result = prime * result + ((solution_id == null) ? 0 : solution_id.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Solution other = (Solution) obj;
		if (applicationCategory == null) {
			if (other.applicationCategory != null)
				return false;
		} else if (!applicationCategory.equals(other.applicationCategory))
			return false;
		if (created_by == null) {
			if (other.created_by != null)
				return false;
		} else if (!created_by.equals(other.created_by))
			return false;
		if (created_date == null) {
			if (other.created_date != null)
				return false;
		} else if (!created_date.equals(other.created_date))
			return false;
		if (incident == null) {
			if (other.incident != null)
				return false;
		} else if (!incident.equals(other.incident))
			return false;
		if (last_update_date == null) {
			if (other.last_update_date != null)
				return false;
		} else if (!last_update_date.equals(other.last_update_date))
			return false;
		if (ratingclassvalue == null) {
			if (other.ratingclassvalue != null)
				return false;
		} else if (!ratingclassvalue.equals(other.ratingclassvalue))
			return false;
		if (search_keyword == null) {
			if (other.search_keyword != null)
				return false;
		} else if (!search_keyword.equals(other.search_keyword))
			return false;
		if (solution_description == null) {
			if (other.solution_description != null)
				return false;
		} else if (!solution_description.equals(other.solution_description))
			return false;
		if (solution_id == null) {
			if (other.solution_id != null)
				return false;
		} else if (!solution_id.equals(other.solution_id))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		 
		return true;
	}

	@Override
	public String toString() {
		return "Solution [solution_id=" + solution_id + ", solution_description=" + solution_description
				+ ", search_keyword=" + search_keyword + ",created_by=" + created_by
				+ ", created_date=" + created_date + ", last_update_date=" + last_update_date + ", status=" + status
				+ ", ratingclassvalue=" + ratingclassvalue + ", applicationCategory=" + applicationCategory
				+ ", incident=" + incident + "]";
	}

	
	
}
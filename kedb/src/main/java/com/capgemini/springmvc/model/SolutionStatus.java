package com.capgemini.springmvc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "SOLUTION_STATUS")
public class SolutionStatus {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "CATEGORY_ID")
	private Integer categoryId;
	
	@NotEmpty
	@Column(name = "SOLUTION_STATUS_NAME")
	private String solution_status_name;

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getSolution_status_name() {
		return solution_status_name;
	}

	public void setSolution_status_name(String solution_status_name) {
		this.solution_status_name = solution_status_name;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((categoryId == null) ? 0 : categoryId.hashCode());
		result = prime * result + ((solution_status_name == null) ? 0 : solution_status_name.hashCode());
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
		SolutionStatus other = (SolutionStatus) obj;
		if (categoryId == null) {
			if (other.categoryId != null)
				return false;
		} else if (!categoryId.equals(other.categoryId))
			return false;
		if (solution_status_name == null) {
			if (other.solution_status_name != null)
				return false;
		} else if (!solution_status_name.equals(other.solution_status_name))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "SolutionStatus [categoryId=" + categoryId + ", solution_status_name=" + solution_status_name + "]";
	}

	
	
}

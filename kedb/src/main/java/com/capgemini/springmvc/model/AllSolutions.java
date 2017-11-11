package com.capgemini.springmvc.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "SOLUTION")
public class AllSolutions {

 
	@Id
	@Column(name = "SOLUTION_ID", unique = true, nullable = true)
	private Integer solution_id;
	
	@Column(name = "SOLUTION_SEARCH_KEYWORD", unique = true, nullable = false)
	private String search_keyword;
	
	@Column(name = "CREATED_BY", unique = true, nullable = false)
	private String created_by;

	@Column(name = "SOLUTION_STATUS_NAME", unique = true, nullable = false)
	private String status;
	
	@Column(name = "RATINGCLASSVALUE", unique = true, nullable = false)
	private Integer ratingclassvalue;
	
	@NotEmpty
	@Column(name="SORTCOLUMN", nullable=false)
	private Integer sortcolumn;
	
	@NotEmpty
	@Column(name="CATEGORY_NAME", nullable=false)
	private String category_name;
	
	@NotEmpty
	@Column(name="COUNT", nullable=false)
	private String ticket_count;
	
	@NotEmpty
	@Column(name="SOLUTIONLINKED", nullable=false)
	private String solutionLinked;

	public Integer getSolution_id() {
		return solution_id;
	}

	public void setSolution_id(Integer solution_id) {
		this.solution_id = solution_id;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getRatingclassvalue() {
		return ratingclassvalue;
	}

	public void setRatingclassvalue(Integer ratingclassvalue) {
		this.ratingclassvalue = ratingclassvalue;
	}

	public Integer getSortcolumn() {
		return sortcolumn;
	}

	public void setSortcolumn(Integer sortcolumn) {
		this.sortcolumn = sortcolumn;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	public String getTicket_count() {
		return ticket_count;
	}

	public void setTicket_count(String ticket_count) {
		this.ticket_count = ticket_count;
	}

	public String getSolutionLinked() {
		return solutionLinked;
	}

	public void setSolutionLinked(String solutionLinked) {
		this.solutionLinked = solutionLinked;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((category_name == null) ? 0 : category_name.hashCode());
		result = prime * result + ((created_by == null) ? 0 : created_by.hashCode());
		result = prime * result + ((ratingclassvalue == null) ? 0 : ratingclassvalue.hashCode());
		result = prime * result + ((search_keyword == null) ? 0 : search_keyword.hashCode());
		result = prime * result + ((solutionLinked == null) ? 0 : solutionLinked.hashCode());
		result = prime * result + ((solution_id == null) ? 0 : solution_id.hashCode());
		result = prime * result + ((sortcolumn == null) ? 0 : sortcolumn.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result + ((ticket_count == null) ? 0 : ticket_count.hashCode());
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
		AllSolutions other = (AllSolutions) obj;
		if (category_name == null) {
			if (other.category_name != null)
				return false;
		} else if (!category_name.equals(other.category_name))
			return false;
		if (created_by == null) {
			if (other.created_by != null)
				return false;
		} else if (!created_by.equals(other.created_by))
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
		if (solutionLinked == null) {
			if (other.solutionLinked != null)
				return false;
		} else if (!solutionLinked.equals(other.solutionLinked))
			return false;
		if (solution_id == null) {
			if (other.solution_id != null)
				return false;
		} else if (!solution_id.equals(other.solution_id))
			return false;
		if (sortcolumn == null) {
			if (other.sortcolumn != null)
				return false;
		} else if (!sortcolumn.equals(other.sortcolumn))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		if (ticket_count == null) {
			if (other.ticket_count != null)
				return false;
		} else if (!ticket_count.equals(other.ticket_count))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "AllSolutions [solution_id=" + solution_id + ", search_keyword=" + search_keyword + ", created_by="
				+ created_by + ", status=" + status + ", ratingclassvalue=" + ratingclassvalue + ", sortcolumn="
				+ sortcolumn + ", category_name=" + category_name + ", ticket_count=" + ticket_count
				+ ", solutionLinked=" + solutionLinked + "]";
	}

}
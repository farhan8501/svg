package com.capgemini.springmvc.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name="TICKET")
public class AllIncidents {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer ticket_id;
	
	@NotEmpty
	@Column(name="TICKET_NUMBER", nullable=false)
	private String ticket_number;

	@NotEmpty
	@Column(name="TICKET_PRIORITY", nullable=false)
	private String ticket_priority;

	@NotEmpty
	@Column(name="TICKET_STATUS", nullable=false)
	private String ticket_status;
	
	@NotEmpty
	@Column(name="CATEGORY_NAME", nullable=false)
	private String category_name;

	@NotEmpty
	@Column(name="SUBCATEGORY_NAME", nullable=false)
	private String subcategory_name;
	
	@NotEmpty
	@Column(name="RATINGCLASSVALUE", nullable=false)
	private String ratingclassvalue;
	

	@NotEmpty
	@Column(name="SOLUTIONLINKED", nullable=false)
	private String solutionLinked;


	public Integer getTicket_id() {
		return ticket_id;
	}


	public void setTicket_id(Integer ticket_id) {
		this.ticket_id = ticket_id;
	}


	public String getTicket_number() {
		return ticket_number;
	}


	public void setTicket_number(String ticket_number) {
		this.ticket_number = ticket_number;
	}


	public String getTicket_priority() {
		return ticket_priority;
	}


	public void setTicket_priority(String ticket_priority) {
		this.ticket_priority = ticket_priority;
	}


	public String getTicket_status() {
		return ticket_status;
	}


	public void setTicket_status(String ticket_status) {
		this.ticket_status = ticket_status;
	}


	public String getCategory_name() {
		return category_name;
	}


	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}


	public String getSubcategory_name() {
		return subcategory_name;
	}


	public void setSubcategory_name(String subcategory_name) {
		this.subcategory_name = subcategory_name;
	}


	public String getRatingclassvalue() {
		return ratingclassvalue;
	}


	public void setRatingclassvalue(String ratingclassvalue) {
		this.ratingclassvalue = ratingclassvalue;
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
		result = prime * result + ((ratingclassvalue == null) ? 0 : ratingclassvalue.hashCode());
		result = prime * result + ((solutionLinked == null) ? 0 : solutionLinked.hashCode());
		result = prime * result + ((subcategory_name == null) ? 0 : subcategory_name.hashCode());
		result = prime * result + ((ticket_id == null) ? 0 : ticket_id.hashCode());
		result = prime * result + ((ticket_number == null) ? 0 : ticket_number.hashCode());
		result = prime * result + ((ticket_priority == null) ? 0 : ticket_priority.hashCode());
		result = prime * result + ((ticket_status == null) ? 0 : ticket_status.hashCode());
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
		AllIncidents other = (AllIncidents) obj;
		if (category_name == null) {
			if (other.category_name != null)
				return false;
		} else if (!category_name.equals(other.category_name))
			return false;
		if (ratingclassvalue == null) {
			if (other.ratingclassvalue != null)
				return false;
		} else if (!ratingclassvalue.equals(other.ratingclassvalue))
			return false;
		if (solutionLinked == null) {
			if (other.solutionLinked != null)
				return false;
		} else if (!solutionLinked.equals(other.solutionLinked))
			return false;
		if (subcategory_name == null) {
			if (other.subcategory_name != null)
				return false;
		} else if (!subcategory_name.equals(other.subcategory_name))
			return false;
		if (ticket_id == null) {
			if (other.ticket_id != null)
				return false;
		} else if (!ticket_id.equals(other.ticket_id))
			return false;
		if (ticket_number == null) {
			if (other.ticket_number != null)
				return false;
		} else if (!ticket_number.equals(other.ticket_number))
			return false;
		if (ticket_priority == null) {
			if (other.ticket_priority != null)
				return false;
		} else if (!ticket_priority.equals(other.ticket_priority))
			return false;
		if (ticket_status == null) {
			if (other.ticket_status != null)
				return false;
		} else if (!ticket_status.equals(other.ticket_status))
			return false;
		return true;
	}


	@Override
	public String toString() {
		return "AllIncidents [ticket_id=" + ticket_id + ", ticket_number=" + ticket_number + ", ticket_priority="
				+ ticket_priority + ", ticket_status=" + ticket_status + ", category_name=" + category_name
				+ ", subcategory_name=" + subcategory_name + ", ratingclassvalue=" + ratingclassvalue
				+ ", solutionLinked=" + solutionLinked + "]";
	}
	
	
	

}

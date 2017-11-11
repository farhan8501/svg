package com.capgemini.springmvc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name="TICKET")
public class ProfileIncidents {
	
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer ticket_id;
	
	@NotEmpty
	@Column(name="TICKET_NUMBER", nullable=false)
	private String ticket_number;
	
	@NotEmpty
	@Column(name="TICKET_DESC", nullable=false)
	private String ticket_desc;

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
	@Column(name="OPENED_DATE", nullable=false)
	private String opened_date;
	
	@NotEmpty
	@Column(name="CLOSED_DATE", nullable=false)
	private String closed_date;
	
	@NotEmpty
	@Column(name="ASSIGNED_TO", nullable=false)
	private String assigned_to;

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

	public String getTicket_desc() {
		return ticket_desc;
	}

	public void setTicket_desc(String ticket_desc) {
		this.ticket_desc = ticket_desc;
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

	public String getOpened_date() {
		return opened_date;
	}

	public void setOpened_date(String opened_date) {
		this.opened_date = opened_date;
	}

	public String getClosed_date() {
		return closed_date;
	}

	public void setClosed_date(String closed_date) {
		this.closed_date = closed_date;
	}

	public String getAssigned_to() {
		return assigned_to;
	}

	public void setAssigned_to(String assigned_to) {
		this.assigned_to = assigned_to;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((assigned_to == null) ? 0 : assigned_to.hashCode());
		result = prime * result + ((category_name == null) ? 0 : category_name.hashCode());
		result = prime * result + ((closed_date == null) ? 0 : closed_date.hashCode());
		result = prime * result + ((opened_date == null) ? 0 : opened_date.hashCode());
		result = prime * result + ((ticket_desc == null) ? 0 : ticket_desc.hashCode());
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
		ProfileIncidents other = (ProfileIncidents) obj;
		if (assigned_to == null) {
			if (other.assigned_to != null)
				return false;
		} else if (!assigned_to.equals(other.assigned_to))
			return false;
		if (category_name == null) {
			if (other.category_name != null)
				return false;
		} else if (!category_name.equals(other.category_name))
			return false;
		if (closed_date == null) {
			if (other.closed_date != null)
				return false;
		} else if (!closed_date.equals(other.closed_date))
			return false;
		if (opened_date == null) {
			if (other.opened_date != null)
				return false;
		} else if (!opened_date.equals(other.opened_date))
			return false;
		if (ticket_desc == null) {
			if (other.ticket_desc != null)
				return false;
		} else if (!ticket_desc.equals(other.ticket_desc))
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
		return "ProfileIncidents [ticket_id=" + ticket_id + ", ticket_number=" + ticket_number + ", ticket_desc="
				+ ticket_desc + ", ticket_priority=" + ticket_priority + ", ticket_status=" + ticket_status
				+ ", category_name=" + category_name + ", opened_date=" + opened_date + ", closed_date=" + closed_date
				+ ", assigned_to=" + assigned_to + "]";
	}
	
	
	
}

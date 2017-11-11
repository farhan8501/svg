package com.capgemini.springmvc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "TICKET_STATUS")
public class Ticketstatus {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "STATUS_ID")
	private Integer statusId;
	
	@NotEmpty
	@Column(name = "TICKET_STATUS_NAME")
	private String ticketstatusname;

	public Integer getStatusId() {
		return statusId;
	}

	public void setStatusId(Integer statusId) {
		this.statusId = statusId;
	}

	public String getTicketstatusname() {
		return ticketstatusname;
	}

	public void setTicketstatusname(String ticketstatusname) {
		this.ticketstatusname = ticketstatusname;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((statusId == null) ? 0 : statusId.hashCode());
		result = prime * result + ((ticketstatusname == null) ? 0 : ticketstatusname.hashCode());
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
		Ticketstatus other = (Ticketstatus) obj;
		if (statusId == null) {
			if (other.statusId != null)
				return false;
		} else if (!statusId.equals(other.statusId))
			return false;
		if (ticketstatusname == null) {
			if (other.ticketstatusname != null)
				return false;
		} else if (!ticketstatusname.equals(other.ticketstatusname))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Ticketstatus [statusId=" + statusId + ", ticketstatusname=" + ticketstatusname + "]";
	}
	
	

}

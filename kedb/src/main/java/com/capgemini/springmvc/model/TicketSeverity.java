package com.capgemini.springmvc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;
@Entity
@Table(name = "TICKET_SEVERITY")
public class TicketSeverity {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SEVERITY_ID")
	private Integer severityId;
	
	@NotEmpty
	@Column(name = "SEVERITY_NAME")
	private String severityname;

	public Integer getSeverityId() {
		return severityId;
	}

	public void setSeverityId(Integer severityId) {
		this.severityId = severityId;
	}

	public String getSeverityname() {
		return severityname;
	}

	public void setSeverityname(String severityname) {
		this.severityname = severityname;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((severityId == null) ? 0 : severityId.hashCode());
		result = prime * result + ((severityname == null) ? 0 : severityname.hashCode());
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
		TicketSeverity other = (TicketSeverity) obj;
		if (severityId == null) {
			if (other.severityId != null)
				return false;
		} else if (!severityId.equals(other.severityId))
			return false;
		if (severityname == null) {
			if (other.severityname != null)
				return false;
		} else if (!severityname.equals(other.severityname))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "TicketSeverity [severityId=" + severityId + ", severityname=" + severityname + "]";
	}

	
}

package com.capgemini.springmvc.model;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "SOLUTION")
public class Solution_Relveance implements Serializable {

	@Id
	@Column(name = "SOLUTION_ID")
	private Integer solutionid;
	
	@Column(name = "SOLUTION_SEARCH_KEYWORD")
	private String search_keywords;

	@Column(name = "RELEVANCE")
	private Integer relevance;
	
	@Column(name = "SOLUTIONLINKED")
	private String solutionlinked;

	public Integer getSolutionid() {
		return solutionid;
	}

	public void setSolutionid(Integer solutionid) {
		this.solutionid = solutionid;
	}

	public String getSearch_keywords() {
		return search_keywords;
	}

	public void setSearch_keywords(String search_keywords) {
		this.search_keywords = search_keywords;
	}

	public Integer getRelevance() {
		return relevance;
	}

	public void setRelevance(Integer relevance) {
		this.relevance = relevance;
	}

	public String getSolutionlinked() {
		return solutionlinked;
	}

	public void setSolutionlinked(String solutionlinked) {
		this.solutionlinked = solutionlinked;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((relevance == null) ? 0 : relevance.hashCode());
		result = prime * result + ((search_keywords == null) ? 0 : search_keywords.hashCode());
		result = prime * result + ((solutionid == null) ? 0 : solutionid.hashCode());
		result = prime * result + ((solutionlinked == null) ? 0 : solutionlinked.hashCode());
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
		Solution_Relveance other = (Solution_Relveance) obj;
		if (relevance == null) {
			if (other.relevance != null)
				return false;
		} else if (!relevance.equals(other.relevance))
			return false;
		if (search_keywords == null) {
			if (other.search_keywords != null)
				return false;
		} else if (!search_keywords.equals(other.search_keywords))
			return false;
		if (solutionid == null) {
			if (other.solutionid != null)
				return false;
		} else if (!solutionid.equals(other.solutionid))
			return false;
		if (solutionlinked == null) {
			if (other.solutionlinked != null)
				return false;
		} else if (!solutionlinked.equals(other.solutionlinked))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Solution_Relveance [solutionid=" + solutionid + ", search_keywords=" + search_keywords + ", relevance="
				+ relevance + ", solutionlinked=" + solutionlinked + "]";
	}

	
	

}
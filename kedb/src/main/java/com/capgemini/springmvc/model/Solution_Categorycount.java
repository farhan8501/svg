package com.capgemini.springmvc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SOLUTION")
public class Solution_Categorycount {

	@Id
	@Column(name = "NAME") 
	String category_name;
	
	@Column(name = "COUNT")
	Integer count;
	
	public String getCategoryname() {
		return category_name;
	}

	public void setCategoryname(String categoryname) {
		this.category_name = categoryname;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Solution_Categorycount other = (Solution_Categorycount) obj;
		if (category_name == null) {
			if (other.category_name != null)
				return false;
		} else if (!category_name.equals(other.category_name))
			return false;
		if (count == null) {
			if (other.count != null)
				return false;
		} else if (!count.equals(other.count))
			return false;
		return true;
	}
	


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((category_name == null) ? 0 : category_name.hashCode());
		result = prime * result + ((count == null) ? 0 : count.hashCode());
		return result;
	}


	
	@Override
	public String toString() {
		return "Solution_Categorycount [count=" + count + ",categoryname=" + category_name + "]";
	}
}

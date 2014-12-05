package ru.fake.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class EaCase implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer eaCaseId;

	private String caseNumber;

	private String caseTitle;

	private String remark;

	private Set<EaDocument> eaDocumentSet = new HashSet<EaDocument>();

	public EaCase() {
	}

	public EaCase(Integer eaCaseId) {
		this.eaCaseId = eaCaseId;
	}

	public EaCase(Integer eaCaseId, String caseNumber, String caseTitle, String remark) {
		this.eaCaseId = eaCaseId;
		this.caseNumber = caseNumber;
		this.caseTitle = caseTitle;
		this.remark = remark;
	}

	public Integer getEaCaseId() {
		return eaCaseId;
	}

	public void setEaCaseId(Integer eaCaseId) {
		this.eaCaseId = eaCaseId;
	}

	public String getCaseNumber() {
		return caseNumber;
	}

	public void setCaseNumber(String caseNumber) {
		this.caseNumber = caseNumber;
	}

	public String getCaseTitle() {
		return caseTitle;
	}

	public void setCaseTitle(String caseTitle) {
		this.caseTitle = caseTitle;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Set<EaDocument> getEaDocumentSet() {
		return eaDocumentSet;
	}

	public void addEaDocument(EaDocument doc) {
		EaCase acase = doc.getEaCase();
		if (acase != null) {
			acase.eaDocumentSet.remove(doc);
		}
		eaDocumentSet.add(doc);
		doc.setEaCase(this);
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (eaCaseId != null ? eaCaseId.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are not set
		if (!(object instanceof EaCase)) {
			return false;
		}
		EaCase other = (EaCase) object;
		if ((this.eaCaseId == null && other.eaCaseId != null) || (this.eaCaseId != null && !this.eaCaseId.equals(other.eaCaseId))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "ru.fake.model.EaCase[ eaCaseId=" + eaCaseId + " ]";
	}

}

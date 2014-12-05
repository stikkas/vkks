package ru.fake.model;

import java.io.Serializable;
import java.util.Date;
import java.util.GregorianCalendar;

public class EaDocument implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer eaDocumentId;

	private Short volume;

	private String docNumber;

	private String docTitle;

	private Short startPage;

	private Short endPage;

	private Date docDate;

	private String remark;

	private String court;

	private String fio;

	private EaCase eaCase;

	public EaDocument() {
	}

	public EaDocument(String[] init) {
		volume = Short.parseShort(init[0]);
		docTitle = init[1];
		startPage = Short.parseShort(init[2]);
		endPage = Short.parseShort(init[3]);
		docDate = new GregorianCalendar(Integer.parseInt(init[4]),
			Integer.parseInt(init[5]), Integer.parseInt(init[6])).getTime();
		remark = init[7];
	}

	public Integer getEaDocumentId() {
		return eaDocumentId;
	}

	public void setEaDocumentId(Integer eaDocumentId) {
		this.eaDocumentId = eaDocumentId;
	}

	public Short getVolume() {
		return volume;
	}

	public void setVolume(Short volume) {
		this.volume = volume;
	}

	public String getDocNumber() {
		return docNumber;
	}

	public void setDocNumber(String docNumber) {
		this.docNumber = docNumber;
	}

	public String getDocTitle() {
		return docTitle;
	}

	public void setDocTitle(String docTitle) {
		this.docTitle = docTitle;
	}

	public Short getStartPage() {
		return startPage;
	}

	public void setStartPage(Short startPage) {
		this.startPage = startPage;
	}

	public Short getEndPage() {
		return endPage;
	}

	public void setEndPage(Short endPage) {
		this.endPage = endPage;
	}

	public Date getDocDate() {
		return docDate;
	}

	public void setDocDate(Date docDate) {
		this.docDate = docDate;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getCourt() {
		return court;
	}

	public void setCourt(String court) {
		this.court = court;
	}

	public String getFio() {
		return fio;
	}

	public void setFio(String fio) {
		this.fio = fio;
	}

	public EaCase getEaCase() {
		return eaCase;
	}

	public void setEaCase(EaCase eaCase) {
		this.eaCase = eaCase;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (eaDocumentId != null ? eaDocumentId.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are not set
		if (!(object instanceof EaDocument)) {
			return false;
		}
		EaDocument other = (EaDocument) object;
		if ((this.eaDocumentId == null && other.eaDocumentId != null) || (this.eaDocumentId != null && !this.eaDocumentId.equals(other.eaDocumentId))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "ru.fake.model.EaDocument[ eaDocumentId=" + eaDocumentId + " ]";
	}

}

package ru.fake.model;

import java.io.Serializable;
import java.util.Date;

public class EaDocument implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer eaDocumentId;

	private Long volume;

	private String docNumber;

	private String docTitle;

	private Long startPage;

	private Long endPage;

	private Date docDate;

	private String remark;

	private String court;

	private String fio;

	private EaCase eaCase;

	private String type;
	private String pdf;

	public String getPdf() {
		return pdf;
	}

	public void setPdf(String pdf) {
		this.pdf = pdf;
	}

	public EaDocument() {
	}

	public EaDocument(Integer eaDocumentId, Long volume, String docNumber,
		String docTitle, Long startPage, Long endPage, Date docDate,
		String remark, String court, String fio, String type, String pdf) {
		this.eaDocumentId = eaDocumentId;
		this.volume = volume;
		this.docNumber = docNumber;
		this.docTitle = docTitle;
		this.startPage = startPage;
		this.endPage = endPage;
		this.docDate = docDate;
		this.remark = remark;
		this.court = court;
		this.fio = fio;
		this.type = type;
		this.pdf = pdf;
	}

	public Integer getEaDocumentId() {
		return eaDocumentId;
	}

	public void setEaDocumentId(Integer eaDocumentId) {
		this.eaDocumentId = eaDocumentId;
	}

	public Long getVolume() {
		return volume;
	}

	public void setVolume(Long volume) {
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

	public Long getStartPage() {
		return startPage;
	}

	public void setStartPage(Long startPage) {
		this.startPage = startPage;
	}

	public Long getEndPage() {
		return endPage;
	}

	public void setEndPage(Long endPage) {
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "ru.fake.model.EaDocument[ eaDocumentId=" + eaDocumentId + " ]";
	}

}

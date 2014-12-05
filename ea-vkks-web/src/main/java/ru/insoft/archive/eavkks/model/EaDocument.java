package ru.insoft.archive.eavkks.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 *
 * @author melnikov
 */
@Entity
@Table(name = "EA_DOCUMENT")
public class EaDocument implements JsonOut
{
    @Id
    @SequenceGenerator(sequenceName = "ea_document_ea_document_id_seq", name = "seqDocument", allocationSize = 1)
    @GeneratedValue(generator = "seqDocument", strategy = GenerationType.SEQUENCE)
    @Column(name = "ea_document_id")
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ea_case_id")
    private EaCase eaCase;
    
    @Column(name = "doc_type_id")
    private Long typeId;
    
    @Column(name = "volume")
    private Integer volume;
    
    @Column(name = "doc_number")
    private String number;
    
    @Column(name = "doc_title")
    private String title;
    
    @Column(name = "start_page")
    private Integer startPage;
    
    @Column(name = "end_page")
    private Integer endPage;
    
    @Column(name = "doc_date")
    private Date date;
    
    @Column(name = "remark")
    private String remark;
    
    @Column(name = "court")
    private String court;
    
    @Column(name = "fio")
    private String fio;
    
    @Column(name = "add_user_id")
    private Long addUserId;
    
    @Column(name = "mod_user_id")
    private Long modUserId;
    
    @Column(name = "insert_date")
    private Date insertDate;
    
    @Column(name = "last_update_date")
    private Date lastUpdateDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EaCase getEaCase() {
        return eaCase;
    }

    public void setEaCase(EaCase eaCase) {
        this.eaCase = eaCase;
    }

    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long typeId) {
        this.typeId = typeId;
    }

    public Integer getVolume() {
        return volume;
    }

    public void setVolume(Integer volume) {
        this.volume = volume;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getStartPage() {
        return startPage;
    }

    public void setStartPage(Integer startPage) {
        this.startPage = startPage;
    }

    public Integer getEndPage() {
        return endPage;
    }

    public void setEndPage(Integer endPage) {
        this.endPage = endPage;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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

    public Long getAddUserId() {
        return addUserId;
    }

    public void setAddUserId(Long addUserId) {
        this.addUserId = addUserId;
    }

    public Long getModUserId() {
        return modUserId;
    }

    public void setModUserId(Long modUserId) {
        this.modUserId = modUserId;
    }

    public Date getInsertDate() {
        return insertDate;
    }

    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }

    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    public void setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }
}

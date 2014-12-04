package ru.insoft.archive.eavkks.model;

import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 *
 * @author melnikov
 */
@Entity
@Table(name = "EA_CASE")
public class EaCase implements JsonOut
{
    @Id
    @SequenceGenerator(sequenceName = "ea_case_ea_case_id_seq", name = "seqCase", allocationSize = 1)
    @GeneratedValue(generator = "seqCase", strategy = GenerationType.SEQUENCE)
    @Column(name = "ea_case_id")
    private Long id;
    
    @Column(name = "case_number")
    private String number;
    
    @Column(name = "case_type_id")
    private Long typeId;
    
    @Column(name = "store_life_type_id")
    private Long storeLifeTypeId;
    
    @Column(name = "case_title")
    private String title;
    
    @Column(name = "toporef_id")
    private Long toporefId;
    
    @Column(name = "remark")
    private String remark;
    
    @Column(name = "add_user_id")
    private Long addUserId;
    
    @Column(name = "mod_user_id")
    private Long modUserId;
    
    @Column(name = "insert_date")
    private Date insertDate;
    
    @Column(name = "last_update_date")
    private Date lastUpdateDate;
    
    @OneToMany(mappedBy = "eaCase")
    @OrderBy("volume, startPage")
    List<EaDocument> documents;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long typeId) {
        this.typeId = typeId;
    }

    public Long getStoreLifeTypeId() {
        return storeLifeTypeId;
    }

    public void setStoreLifeTypeId(Long storeLifeTypeId) {
        this.storeLifeTypeId = storeLifeTypeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getToporefId() {
        return toporefId;
    }

    public void setToporefId(Long toporefId) {
        this.toporefId = toporefId;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
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

    public List<EaDocument> getDocuments() {
        return documents;
    }

    public void setDocuments(List<EaDocument> documents) {
        this.documents = documents;
    }
}

package ru.insoft.archive.eavkks.model;

import java.util.Date;
import java.util.List;
import ru.insoft.archive.extcommons.json.JsonExclude;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 *
 * @author melnikov
 */
//@Entity
//@Table(name = "EA_CASE")
public class EaCase implements JsonOut
{
    //@Id
    //@SequenceGenerator(sequenceName = "ea_case_ea_case_id_seq", name = "seqCase", allocationSize = 1)
    //@GeneratedValue(generator = "seqCase", strategy = GenerationType.SEQUENCE)
    //@Column(name = "ea_case_id")
    private String id;
    
    //@Column(name = "case_number")
    private String number;
    
    //@Column(name = "case_type_id")
    private Long type;
    
    //@Column(name = "store_life_type_id")
    private Long storeLife;
    
    //@Column(name = "case_title")
    private String title;
    
    private Date startDate;
    
    private Date endDate;
    
    //@Column(name = "toporef_id")
    private Long toporef;
    
    //@Column(name = "remark")
    private String remark;
    
    //@Column(name = "add_user_id")
    @JsonExclude
    private Long addUserId;
    
    //@Column(name = "mod_user_id")
    @JsonExclude
    private Long modUserId;
    
    //@Column(name = "insert_date")
    @JsonExclude
    private Date insertDate;
    
    //@Column(name = "last_update_date")
    @JsonExclude
    private Date lastUpdateDate;
    
    //@OneToMany(mappedBy = "eaCase")
    //@OrderBy("volume, startPage")
    @JsonExclude
    List<EaDocument> documents;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Long getType() {
        return type;
    }

    public void setType(Long type) {
        this.type = type;
    }

    public Long getStoreLife() {
        return storeLife;
    }

    public void setStoreLife(Long storeLife) {
        this.storeLife = storeLife;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Long getToporef() {
        return toporef;
    }

    public void setToporef(Long toporef) {
        this.toporef = toporef;
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

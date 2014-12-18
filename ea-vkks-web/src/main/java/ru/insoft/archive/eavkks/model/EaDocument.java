package ru.insoft.archive.eavkks.model;

import java.util.Date;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.entity.HasUserInfo;
import ru.insoft.archive.extcommons.json.JsonExclude;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 *
 * @author melnikov
 */
//@Entity
//@Table(name = "EA_DOCUMENT")
public class EaDocument implements JsonOut, JsonIn, HasId, HasUserInfo
{
    //@Id
    //@SequenceGenerator(sequenceName = "ea_document_ea_document_id_seq", name = "seqDocument", allocationSize = 1)
    //@GeneratedValue(generator = "seqDocument", strategy = GenerationType.SEQUENCE)
    //@Column(name = "ea_document_id")
    private String id;
    
    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "ea_case_id")
    private String caseId;
    private String caseTitle;
    
    //@Column(name = "doc_type_id")
    private Long type;
    
    //@Column(name = "volume")
    private Integer volume;
    
    //@Column(name = "doc_number")
    private String number;
    
    //@Column(name = "doc_title")
    private String title;
    
    //@Column(name = "start_page")
    private Integer startPage;
    
    //@Column(name = "end_page")
    private Integer endPage;
    
    //@Column(name = "doc_date")
    private String date;
    
    //@Column(name = "remark")
    private String remark;
    
    //@Column(name = "court")
    private String court;
    
    //@Column(name = "fio")
    private String fio;
    
    private String graph;
    
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

    @Override
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCaseId() {
        return caseId;
    }

    public void setCaseId(String caseId) {
        this.caseId = caseId;
    }

    public String getCaseTitle() {
        return caseTitle;
    }

    public void setCaseTitle(String caseTitle) {
        this.caseTitle = caseTitle;
    }

    public Long getType() {
        return type;
    }

    public void setType(Long type) {
        this.type = type;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
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

    public String getGraph() {
        return graph;
    }

    public void setGraph(String graph) {
        this.graph = graph;
    }

    @Override
    public Long getAddUserId() {
        return addUserId;
    }

    @Override
    public void setAddUserId(Long addUserId) {
        this.addUserId = addUserId;
    }

    @Override
    public Long getModUserId() {
        return modUserId;
    }

    @Override
    public void setModUserId(Long modUserId) {
        this.modUserId = modUserId;
    }

    @Override
    public Date getInsertDate() {
        return insertDate;
    }

    @Override
    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }

    @Override
    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    @Override
    public void setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }
}

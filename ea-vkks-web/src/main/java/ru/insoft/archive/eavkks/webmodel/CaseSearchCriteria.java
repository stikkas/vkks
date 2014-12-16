package ru.insoft.archive.eavkks.webmodel;

import java.util.Date;
import java.util.Set;
import ru.insoft.archive.extcommons.json.JsonIn;

/**
 *
 * @author melnikov
 */
public class CaseSearchCriteria implements JsonIn
{
    private String number;
    private Long type;
    private Long storeLife;
    private String title;
    private Date startDate;
    private Date endDate;
    private Long toporef;
    private Set<Long> toporefIds;
    private String remark;

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

    public Set<Long> getToporefIds() {
        return toporefIds;
    }

    public void setToporefIds(Set<Long> toporefIds) {
        this.toporefIds = toporefIds;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}

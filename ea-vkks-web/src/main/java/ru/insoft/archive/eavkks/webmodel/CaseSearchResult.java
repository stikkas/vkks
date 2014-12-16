package ru.insoft.archive.eavkks.webmodel;

import ru.insoft.archive.extcommons.json.JsonOut;

/**
 *
 * @author melnikov
 */
public class CaseSearchResult implements JsonOut
{
    private String id;
    private String number;
    private String type;
    private String storeLife;
    private String title;
    private String dates;
    private String toporef;
    private String remark;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStoreLife() {
        return storeLife;
    }

    public void setStoreLife(String storeLife) {
        this.storeLife = storeLife;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDates() {
        return dates;
    }

    public void setDates(String dates) {
        this.dates = dates;
    }

    public String getToporef() {
        return toporef;
    }

    public void setToporef(String toporef) {
        this.toporef = toporef;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}

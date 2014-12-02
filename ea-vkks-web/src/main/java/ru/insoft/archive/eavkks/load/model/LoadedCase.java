package ru.insoft.archive.eavkks.load.model;

import java.util.List;
import ru.insoft.archive.extcommons.json.JsonIn;

/**
 *
 * @author melnikov
 */
public class LoadedCase implements JsonIn
{
    private String number;
    private String type;
    private String storeLife;
    private String title;
    private LoadedToporef toporef;
    private String remark;
    private List<LoadedDocument> documents;

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

    public LoadedToporef getToporef() {
        return toporef;
    }

    public void setToporef(LoadedToporef toporef) {
        this.toporef = toporef;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public List<LoadedDocument> getDocuments() {
        return documents;
    }

    public void setDocuments(List<LoadedDocument> documents) {
        this.documents = documents;
    }
}

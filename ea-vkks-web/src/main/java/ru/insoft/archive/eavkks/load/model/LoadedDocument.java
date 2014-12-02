package ru.insoft.archive.eavkks.load.model;

import java.util.Date;
import ru.insoft.archive.extcommons.json.JsonIn;

/**
 *
 * @author melnikov
 */
public class LoadedDocument implements JsonIn
{
    private Integer volume;
    private String number;
    private String type;
    private String title;
    private Integer startPage;
    private Integer endPage;
    private Date date;
    private String remark;
    private String court;
    private String fio;
    private String graph;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public String getGraph() {
        return graph;
    }

    public void setGraph(String graph) {
        this.graph = graph;
    }
}

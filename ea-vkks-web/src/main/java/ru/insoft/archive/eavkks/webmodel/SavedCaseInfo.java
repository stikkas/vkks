package ru.insoft.archive.eavkks.webmodel;

import ru.insoft.archive.extcommons.json.JsonOut;

/**
 *
 * @author melnikov
 */
public class SavedCaseInfo implements JsonOut
{
    private Boolean success = true;
    private String id;
    private String numPrefix;
    private Integer numNumber;

    public Boolean isSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNumPrefix() {
        return numPrefix;
    }

    public void setNumPrefix(String numPrefix) {
        this.numPrefix = numPrefix;
    }

    public Integer getNumNumber() {
        return numNumber;
    }

    public void setNumNumber(Integer numNumber) {
        this.numNumber = numNumber;
    }
}

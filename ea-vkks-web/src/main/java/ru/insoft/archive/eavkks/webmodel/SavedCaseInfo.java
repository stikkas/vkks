package ru.insoft.archive.eavkks.webmodel;

import ru.insoft.archive.extcommons.json.JsonOut;

/**
 *
 * @author melnikov
 */
public class SavedCaseInfo implements JsonOut
{
    private String id;
    private String number;

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
}

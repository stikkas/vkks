package ru.insoft.archive.eavkks.load.model;

import ru.insoft.archive.extcommons.json.JsonIn;

/**
 *
 * @author melnikov
 */
public class LoadedToporef implements JsonIn
{
    private Integer room;
    private Integer rack;
    private Integer shelf;

    public Integer getRoom() {
        return room;
    }

    public void setRoom(Integer room) {
        this.room = room;
    }

    public Integer getRack() {
        return rack;
    }

    public void setRack(Integer rack) {
        this.rack = rack;
    }

    public Integer getShelf() {
        return shelf;
    }

    public void setShelf(Integer shelf) {
        this.shelf = shelf;
    }
}

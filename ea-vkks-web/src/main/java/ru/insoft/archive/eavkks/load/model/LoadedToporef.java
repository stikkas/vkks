package ru.insoft.archive.eavkks.load.model;

import java.util.Objects;
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

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 79 * hash + Objects.hashCode(this.room);
        hash = 79 * hash + Objects.hashCode(this.rack);
        hash = 79 * hash + Objects.hashCode(this.shelf);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final LoadedToporef other = (LoadedToporef) obj;
        if (!Objects.equals(this.room, other.room)) {
            return false;
        }
        if (!Objects.equals(this.rack, other.rack)) {
            return false;
        }
        if (!Objects.equals(this.shelf, other.shelf)) {
            return false;
        }
        return true;
    }
}

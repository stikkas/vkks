package ru.insoft.archive.eavkks.webmodel;

import ru.insoft.archive.extcommons.webmodel.TreeItem;

/**
 *
 * @author melnikov
 */
public class ToporefItem extends TreeItem
{
    private String path;
    
    public ToporefItem(TreeItem copyItem)
    {
        setId(copyItem.getId());
        setText(copyItem.getText());
        setLeaf(copyItem.isLeaf());
        setChildren(copyItem.getChildren());
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}

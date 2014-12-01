package ru.insoft.archive.eavkks.servlets;

import java.util.List;
import javax.inject.Inject;
import javax.json.JsonStructure;
import javax.servlet.annotation.WebServlet;
import ru.insoft.archive.eavkks.webmodel.ToporefItem;
import ru.insoft.archive.extcommons.ejb.CommonDBHandler;
import ru.insoft.archive.extcommons.ejb.JsonTools;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.extcommons.webmodel.TreeItem;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/dict")
public class DescValuesProvider extends ru.insoft.archive.extcommons.servlet.DescValuesProvider
{
    @Inject
    CommonDBHandler dbHandler;
    @Inject
    JsonTools jsonTools;       
    
    @Override
    protected CommonDBHandler getDbHandler() 
    {
        return dbHandler;
    }

    @Override
    protected JsonTools getJsonTools() 
    {
        return jsonTools;
    }

    @Override
    protected JsonStructure processCustomAction(String action) throws Exception 
    {
        if ("getToporef".equals(action))
        {
            TreeItem obj = (TreeItem)dbHandler.getDescValuesForGroupHierarch("TOPOREF", true);
            obj.setChildren(setToporefPath(obj.getChildren(), null));
            return jsonTools.getJsonForEntity(obj);
        }
        return null;
    }
    
    private List<JsonOut> setToporefPath(List<JsonOut> items, String parentPath)
    {
        for (int i = 0; i < items.size(); i++)
        {
            TreeItem src = (TreeItem)items.get(i);
            ToporefItem topoItem = new ToporefItem(src);
            if (parentPath == null)
                topoItem.setPath(src.getTextShort());
            else
                topoItem.setPath(parentPath + "; " + src.getTextShort());
            items.set(i, topoItem);
            if (!topoItem.isLeaf())
                topoItem.setChildren(setToporefPath(topoItem.getChildren(), topoItem.getPath()));
        }
        return items;
    }
    
}

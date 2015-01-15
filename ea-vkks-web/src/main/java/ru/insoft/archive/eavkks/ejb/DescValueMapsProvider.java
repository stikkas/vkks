package ru.insoft.archive.eavkks.ejb;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.ejb.Stateless;
import javax.inject.Inject;
import ru.insoft.archive.eavkks.webmodel.ToporefItem;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.extcommons.webmodel.ScalarItem;
import ru.insoft.archive.extcommons.webmodel.TreeItem;

/**
 *
 * @author melnikov
 */
@Stateless
public class DescValueMapsProvider 
{
    @Inject
    CommonDBHandler dbHandler;
    
    private Map<Long, String> documentTypes;
    private Map<Long, Set<Long>> toporefHierarchy;
    private Map<Long, String> toporefNames;
    private Map<Long, String> caseTypes;
    private Map<Long, String> caseStoreLifeTypes;
    
    protected String getDocumentTypeName(Long typeId)
    {
        return getDocumentTypes().get(typeId);
    }
    
    protected String getCaseTypeName(Long typeId)
    {
        return getCaseTypes().get(typeId);
    }
    
    protected String getStoreLifeName(Long storeLifeId)
    {
        return getStoreLifeTypes().get(storeLifeId);
    }
    
    protected String getToporefItemName(Long toporefId)
    {
        return getToporefNames().get(toporefId);
    }
    
    protected Map<Long, String> getDocumentTypes()
    {
        if (documentTypes == null)
            documentTypes = getFlatDescMap("DOCUMENT_TYPE");
        return documentTypes;
    }
    
    protected Map<Long, String> getCaseTypes()
    {
        if (caseTypes == null)
            caseTypes = getFlatDescMap("CASE_TYPE");
        return caseTypes;
    }
    
    protected Map<Long, String> getStoreLifeTypes()
    {
        if (caseStoreLifeTypes == null)
            caseStoreLifeTypes = getFlatDescMap("CASE_STORE_LIFE");
        return caseStoreLifeTypes;
    }
    
    protected Map<Long, String> getFlatDescMap(String desc)
    {
        Map<Long, String> map = new HashMap<>();
        List<JsonOut> values = dbHandler.getDescValuesForGroup(desc, false, false);
        for (JsonOut val : values)
        {
            ScalarItem item = (ScalarItem)val;
            map.put(item.getId(), item.getName());
        }
        return map;
    }
    
    protected Map<Long, Set<Long>> getToporefHierarchy()
    {
        if (toporefHierarchy == null)
            makeToporefMaps();
        return toporefHierarchy;
    }
    
    protected Map<Long, String> getToporefNames()
    {
        if (toporefNames == null)
            makeToporefMaps();
        return toporefNames;
    }
    
    protected void makeToporefMaps()
    {
        toporefHierarchy = new HashMap<>();
        toporefNames     = new HashMap<>();
        TreeItem tree = dbHandler.getToporef();
        makeToporefMaps(tree.getChildren(), null);
    }
    
    protected Set<Long> makeToporefMaps(List<JsonOut> values, Long parent)
    {
        Set<Long> childrenIds = new HashSet<>();
        if (parent != null)
            childrenIds.add(parent);
            
        for (JsonOut jo : values)
        {
            ToporefItem item = (ToporefItem)jo;
            toporefNames.put(item.getId(), item.getPath());
            childrenIds.add(item.getId());
            childrenIds.addAll(makeToporefMaps(item.getChildren(), item.getId()));
        }
        if (parent != null)
            toporefHierarchy.put(parent, childrenIds);
        return childrenIds;
    }
}

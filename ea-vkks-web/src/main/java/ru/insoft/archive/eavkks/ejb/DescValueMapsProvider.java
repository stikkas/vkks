package ru.insoft.archive.eavkks.ejb;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.ejb.Stateless;
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
    private Map<Long, String> documentTypes;
    private Map<Long, Set<Long>> toporefHierarchy;
    private Map<Long, String> toporefNames;
    private Map<Long, String> caseTypes;
    private Map<Long, String> caseStoreLifeTypes;
    
    public String getDocumentTypeName(Long typeId)
    {
        return getDocumentTypes().get(typeId);
    }
    
    public String getCaseTypeName(Long typeId)
    {
        return getCaseTypes().get(typeId);
    }
    
    public String getStoreLifeName(Long storeLifeId)
    {
        return getStoreLifeTypes().get(storeLifeId);
    }
    
    public String getToporefItemName(Long toporefId)
    {
        return getToporefNames().get(toporefId);
    }
    
    public void initFlatMap(String code, List<JsonOut> values)
    {
        Map<Long, String> map = getFlatDescMap(values);
        switch (code)
        {
            case "CASE_TYPE":
                caseTypes = map;
                break;
            case "DOCUMENT_TYPE":
                documentTypes = map;
                break;
            case "CASE_STORE_LIFE":
                caseStoreLifeTypes = map;
                break;
        }
    }
    
    public void initToporefMaps(TreeItem tree)
    {
        toporefHierarchy = new HashMap<>();
        toporefNames     = new HashMap<>();
        makeToporefMaps(tree.getChildren(), null);
    }    
    
    protected Map<Long, String> getDocumentTypes()
    {
        return documentTypes;
    }
    
    protected Map<Long, String> getCaseTypes()
    {
        return caseTypes;
    }
    
    protected Map<Long, String> getStoreLifeTypes()
    {
        return caseStoreLifeTypes;
    }
    
    protected Map<Long, String> getFlatDescMap(List<JsonOut> values)
    {
        Map<Long, String> map = new HashMap<>();
        for (JsonOut val : values)
        {
            ScalarItem item = (ScalarItem)val;
            map.put(item.getId(), item.getName());
        }
        return map;
    }
    
    public Map<Long, Set<Long>> getToporefHierarchy()
    {
        return toporefHierarchy;
    }
    
    protected Map<Long, String> getToporefNames()
    {
        return toporefNames;
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

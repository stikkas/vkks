package ru.insoft.archive.eavkks.ejb;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import ru.insoft.archive.eavkks.ejb.es.EsSearchHelper;
import ru.insoft.archive.eavkks.webmodel.DocumentSearchCriteria;
import ru.insoft.archive.eavkks.webmodel.DocumentSearchResult;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.extcommons.webmodel.ScalarItem;
import ru.insoft.archive.extcommons.webmodel.SearchResult;

/**
 *
 * @author melnikov
 */
@Stateless
public class SearchHandler 
{
    @Inject
    EsSearchHelper esSearch;
    @Inject
    CommonDBHandler dbHandler;
    
    private Logger logger;
    private Map<Long, String> documentTypes;
    private String LINK_PREFIX;
    
    public SearchHandler()
    {
        logger = Logger.getLogger(getClass().getName());
    }
    
    public SearchResult searchDocuments(DocumentSearchCriteria q, Integer start, Integer limit)
    {
        return processSearchHits(esSearch.searchDocuments(q, start, limit));
    }
    
    protected SearchResult processSearchHits(SearchHits hits)
    {
        SearchResult res = new SearchResult();
        res.setResults(hits.getTotalHits());
        List<DocumentSearchResult> values = new ArrayList<>();
        for (SearchHit hit : hits.getHits())
        {
            DocumentSearchResult dsr = new DocumentSearchResult();
            dsr.setId(hit.getId());
            Map<String, Object> source = hit.getSource();
            dsr.setAcase((String)source.get("acase"));
            dsr.setVolume((Integer)source.get("volume"));
            dsr.setNumber((String)source.get("number"));
            dsr.setType(getDocumentTypeName(((Number)source.get("type")).longValue()));
            dsr.setTitle((String)source.get("title"));
            
            Integer startPage = (Integer)source.get("startPage");
            Integer endPage   = (Integer)source.get("endPage");
            if (startPage.equals(endPage))
                dsr.setPages(startPage.toString());
            else
                dsr.setPages(MessageFormat.format("{0} - {1}", startPage, endPage));
            
            dsr.setDate((String)source.get("date"));
            dsr.setRemark((String)source.get("remark"));
            dsr.setCourt((String)source.get("court"));
            dsr.setFio((String)source.get("fio"));
            dsr.setGraph(MessageFormat.format("{0}{1}.pdf", getLinkPrefix(), dsr.getId()));
            values.add(dsr);
        }
        res.setValues(values);
        return res;
    }
    
    protected String getDocumentTypeName(Long typeId)
    {
        return getDocumentTypes().get(typeId);
    }
    
    protected Map<Long, String> getDocumentTypes()
    {
        if (documentTypes == null)
            documentTypes = getFlatDescMap("DOCUMENT_TYPE");
        return documentTypes;
    }
    
    protected Map<Long, String> getFlatDescMap(String desc)
    {
        Map<Long, String> map = new HashMap<>();
        List<JsonOut> values = dbHandler.getDescValuesForGroup(desc, false);
        for (JsonOut val : values)
        {
            ScalarItem item = (ScalarItem)val;
            map.put(item.getId(), item.getName());
        }
        return map;
    }
    
    protected String getLinkPrefix()
    {
        if (LINK_PREFIX == null)
            LINK_PREFIX = dbHandler.getCoreParameterValue("LINK_PREFIX");
        return LINK_PREFIX;
    }
}

package ru.insoft.archive.eavkks.ejb;

import java.text.DateFormat;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms.Bucket;
import org.elasticsearch.search.aggregations.metrics.max.Max;
import org.elasticsearch.search.aggregations.metrics.min.Min;
import ru.insoft.archive.eavkks.ejb.es.EsSearchHelper;
import ru.insoft.archive.eavkks.model.EaCase;
import ru.insoft.archive.eavkks.webmodel.CaseSearchCriteria;
import ru.insoft.archive.eavkks.webmodel.CaseSearchResult;
import ru.insoft.archive.eavkks.webmodel.DocumentSearchCriteria;
import ru.insoft.archive.eavkks.webmodel.DocumentSearchResult;
import ru.insoft.archive.eavkks.webmodel.ToporefItem;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.extcommons.webmodel.ScalarItem;
import ru.insoft.archive.extcommons.webmodel.SearchResult;
import ru.insoft.archive.extcommons.webmodel.TreeItem;

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
    private Map<Long, Set<Long>> toporefHierarchy;
    private Map<Long, String> toporefNames;
    private Map<Long, String> caseTypes;
    private Map<Long, String> caseStoreLifeTypes;
    private String LINK_PREFIX;
    
    public SearchHandler()
    {
        logger = Logger.getLogger(getClass().getName());
    }
    
    public SearchResult searchDocuments(DocumentSearchCriteria q, Integer start, Integer limit)
    {
        return processDocSearchHits(esSearch.searchDocuments(q, start, limit));
    }
    
    protected SearchResult processDocSearchHits(SearchHits hits)
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
    
    public SearchResult searchCases(CaseSearchCriteria q, Integer start, Integer limit)
    {
        if (q.getToporef() != null)
            q.setToporefIds(getToporefHierarchy().get(q.getToporef()));
        SearchHits hits = esSearch.searchCases(q, start, limit);
        SearchResult res = new SearchResult();
        res.setResults(hits.getTotalHits());
        List<CaseSearchResult> values = new ArrayList<>();
        Set<String> caseIds = new HashSet<>();
        for (SearchHit hit : hits.getHits())
        {
            CaseSearchResult csr = new CaseSearchResult();
            csr.setId(hit.getId());
            Map<String, Object> source = hit.getSource();
            csr.setNumber((String)source.get("number"));
            csr.setType(getCaseTypeName(((Number)source.get("type")).longValue()));
            csr.setStoreLife(getStoreLifeName(((Number)source.get("storeLife")).longValue()));
            csr.setTitle((String)source.get("title"));
            
            Number toporef = (Number)source.get("toporef");
            if (toporef != null)
                csr.setToporef(getToporefItemName(toporef.longValue()));
            csr.setRemark((String)source.get("remark"));
            
            values.add(csr);
            caseIds.add(hit.getId());
        }
        
        Terms datesInfo = esSearch.queryCaseEdgeDates(caseIds);
        DateFormat df = new SimpleDateFormat("dd.MM.YYYY");
        for (CaseSearchResult csr : values)
        {
            Bucket bucket = datesInfo.getBucketByKey(csr.getId());
            if (bucket == null)
                continue;
            Date startDate = new Date(((Number)((Min)bucket.getAggregations().get("startDate")).getValue()).longValue());
            Date endDate   = new Date(((Number)((Max)bucket.getAggregations().get("endDate")).getValue()).longValue());
            if (startDate.equals(endDate))
                csr.setDates(df.format(startDate));
            else
                csr.setDates(MessageFormat.format("{0} - {1}", df.format(startDate), df.format(endDate)));
        }
        
        res.setValues(values);
        return res;
    }
    
    public EaCase getCaseById(String id)
    {
        Map<String, Object> esData = esSearch.getCaseById(id);
        Bucket datesInfo = esSearch.queryCaseEdgeDates(Arrays.asList(id)).getBucketByKey(id);
        
        EaCase eaCase = new EaCase();
        eaCase.setId(id);
        eaCase.setNumber((String)esData.get("number"));
        eaCase.setType(((Number)esData.get("type")).longValue());
        eaCase.setStoreLife(((Number)esData.get("storeLife")).longValue());
        eaCase.setTitle((String)esData.get("title"));
        if (datesInfo != null)
        {
            Date startDate = new Date(((Number)((Min)datesInfo.getAggregations().get("startDate")).getValue()).longValue());
            Date endDate   = new Date(((Number)((Max)datesInfo.getAggregations().get("endDate")).getValue()).longValue());
            eaCase.setStartDate(startDate);
            eaCase.setEndDate(endDate);
        }
        Number toporef = (Number)esData.get("toporef");
        if (toporef != null)
            eaCase.setToporef(toporef.longValue());
        eaCase.setRemark((String)esData.get("remark"));
        return eaCase;
    }
    
    public SearchResult searchCaseDocuments(String caseId, String context, Integer start, Integer limit)
    {
        return processDocSearchHits(esSearch.searchCaseDocuments(caseId, context, start, limit));
    }
    
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
    
    protected String getLinkPrefix()
    {
        if (LINK_PREFIX == null)
            LINK_PREFIX = dbHandler.getCoreParameterValue("LINK_PREFIX");
        return LINK_PREFIX;
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

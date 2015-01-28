package ru.insoft.archive.eavkks.ejb;

import java.text.DateFormat;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms.Bucket;
import org.elasticsearch.search.aggregations.metrics.max.Max;
import org.elasticsearch.search.aggregations.metrics.min.Min;
import ru.insoft.archive.eavkks.ejb.es.EsSearchHelper;
import ru.insoft.archive.eavkks.webmodel.CaseSearchCriteria;
import ru.insoft.archive.eavkks.webmodel.CaseSearchResult;
import ru.insoft.archive.eavkks.webmodel.DocumentSearchCriteria;
import ru.insoft.archive.eavkks.webmodel.DocumentSearchResult;
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
    DescValueMapsProvider dvMaps;
    
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
            dsr.setCaseId((String)source.get("_parent"));
            dsr.setAcase((String)source.get("acase"));
            
            Number toporef = (Number)source.get("toporef");
            if (toporef != null)
                dsr.setToporef(dvMaps.getToporefItemName(toporef.longValue()));
            //dsr.setVolume((Integer)source.get("volume"));
            dsr.setNumber((String)source.get("number"));
            dsr.setType(dvMaps.getDocumentTypeName(((Number)source.get("type")).longValue()));
            dsr.setTitle((String)source.get("title"));
            
            //Integer startPage = (Integer)source.get("startPage");
            //Integer endPage   = (Integer)source.get("endPage");
            /*if (startPage.equals(endPage))
                dsr.setPages(startPage.toString());
            else
                dsr.setPages(MessageFormat.format("{0} - {1}", startPage, endPage));*/
            dsr.setPages((Integer)source.get("pages"));
            dsr.setDate((String)source.get("date"));
            dsr.setRemark((String)source.get("remark"));
            dsr.setCourt((String)source.get("court"));
            dsr.setFio((String)source.get("fio"));
            if (esSearch.isExistsImageFile(dsr.getId()))
                dsr.setGraph(MessageFormat.format("{0}{1}.pdf", esSearch.getLinkPrefix(), dsr.getId()));
            values.add(dsr);
        }
        res.setValues(values);
        return res;
    }
    
    public SearchResult searchCases(CaseSearchCriteria q, Integer start, Integer limit)
    {
        if (q.getToporef() != null)
            q.setToporefIds(dvMaps.getToporefHierarchy().get(q.getToporef()));
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
            csr.setType(dvMaps.getCaseTypeName(((Number)source.get("type")).longValue()));
            csr.setStoreLife(dvMaps.getStoreLifeName(((Number)source.get("storeLife")).longValue()));
            csr.setTitle((String)source.get("title"));
            
            Number toporef = (Number)source.get("toporef");
            if (toporef != null)
                csr.setToporef(dvMaps.getToporefItemName(toporef.longValue()));
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
    
    public SearchResult searchCaseDocuments(String caseId, String context, Integer start, Integer limit)
    {
        return processDocSearchHits(esSearch.searchCaseDocuments(caseId, context, start, limit));
    }    
}

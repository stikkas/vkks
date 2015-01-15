package ru.insoft.archive.eavkks.ejb.es;

import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.index.query.BoolFilterBuilder;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.FilterBuilder;
import org.elasticsearch.index.query.FilterBuilders;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeFilterBuilder;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms.Bucket;
import org.elasticsearch.search.aggregations.metrics.max.Max;
import org.elasticsearch.search.aggregations.metrics.min.Min;
import org.javatuples.Pair;
import ru.insoft.archive.eavkks.ejb.CommonDBHandler;
import ru.insoft.archive.eavkks.model.EaCase;
import ru.insoft.archive.eavkks.model.EaDocument;
import ru.insoft.archive.eavkks.webmodel.CaseSearchCriteria;
import ru.insoft.archive.eavkks.webmodel.DocumentSearchCriteria;

/**
 *
 * @author melnikov
 */
@Stateless
public class EsSearchHelper 
{
    @Inject
    EsAdminHelper esAdmin;
    @Inject
    EsIndexHelper esIndex;
    @Inject
    CommonDBHandler dbHandler;
    
    private String LINK_PREFIX;
    
    public List<String> searchFios(String prefix)
    {
        Client esClient = esAdmin.getClient();
        SearchResponse resp = esClient.prepareSearch(esAdmin.getIndexName())
                .setTypes("document")
                .setQuery(prefix == null || prefix.isEmpty() ?
                        QueryBuilders.matchAllQuery() :
                        QueryBuilders.matchPhrasePrefixQuery("fio", prefix))
                .setSize(0)
                .addAggregation(AggregationBuilders.terms("fio")
                        .field("fio.raw")
                )
                .execute().actionGet();
        Terms fios = resp.getAggregations().get("fio");
        List<String> res = new ArrayList<>();
        for (Bucket bucket : fios.getBuckets())
            res.add(bucket.getKey());
        return res;
    }
    
    public List<String> searchCourts(String prefix)
    {
        Client esClient = esAdmin.getClient();
        SearchResponse resp = esClient.prepareSearch(esAdmin.getIndexName())
                .setTypes("document")
                .setQuery(prefix == null || prefix.isEmpty() ?
                        QueryBuilders.matchAllQuery() :
                        QueryBuilders.matchPhrasePrefixQuery("court", prefix))
                .setSize(0)
                .addAggregation(AggregationBuilders.terms("court")
                        .field("court.raw")
                )
                .execute().actionGet();
        Terms fios = resp.getAggregations().get("court");
        List<String> res = new ArrayList<>();
        for (Bucket bucket : fios.getBuckets())
            res.add(bucket.getKey());
        return res;
    }
    
    public SearchHits searchDocuments(DocumentSearchCriteria q, Integer start, Integer limit)
    {
        Map<String, Object> queryMap = new HashMap<>();
        queryMap.put("title", q.getTitle());
        queryMap.put("court", q.getCourt());
        queryMap.put("remark", q.getRemark());
        queryMap.put("fio", q.getFio());
        queryMap.put("graph", q.getContext());
        
        Map<String, Object> filterMap = new HashMap<>();
        filterMap.put("volume", q.getVolume());
        filterMap.put("number", q.getNumber());
        filterMap.put("type", q.getType());
        filterMap.put("pages", (q.getStartPage() == null && q.getEndPage() == null ? null :
                        new Pair<>(q.getStartPage(), q.getEndPage())));
        filterMap.put("date", q.getDate());
        
        QueryBuilder query = makeQuery(queryMap, filterMap);
        
        Client esClient = esAdmin.getClient();
        SearchResponse resp = esClient.prepareSearch(esAdmin.getIndexName())
                .setTypes("document")
                .setQuery(query)
                .setFrom(start)
                .setSize(limit)
                .setFetchSource(null, new String[]
                    {"graph", "_parent", "addUserId", "modUserId", "insertDate" ,"lastUpdateDate"})
                .execute().actionGet();
        return resp.getHits();
    }
    
    public SearchHits searchCases(CaseSearchCriteria q, Integer start, Integer limit)
    {
        Map<String, Object> queryMap = new HashMap<>();
        queryMap.put("title", q.getTitle());
        queryMap.put("remark", q.getRemark());
        
        Map<String, Object> filterMap = new HashMap<>();
        filterMap.put("number", q.getNumber());
        filterMap.put("type", q.getType());
        filterMap.put("storeLife", q.getStoreLife());
        filterMap.put("dates", (q.getStartDate() == null && q.getEndDate() == null) ? null :
                new Pair<>(q.getStartDate(), q.getEndDate()));
        filterMap.put("toporef", q.getToporefIds());
        
        QueryBuilder query = makeQuery(queryMap, filterMap);
        Client esClient = esAdmin.getClient();
        SearchResponse resp = esClient.prepareSearch(esAdmin.getIndexName())
                .setTypes("case")
                .setQuery(query)
                .setFrom(start)
                .setSize(limit)
                .setFetchSource(null, new String[]
                    {"addUserId", "modUserId", "insertDate" ,"lastUpdateDate"})
                .execute().actionGet();
        return resp.getHits();
    }
    
    public Terms queryCaseEdgeDates(Iterable<String> caseIds)
    {
        Client esClient = esAdmin.getClient();
        SearchResponse resp = esClient.prepareSearch(esAdmin.getIndexName())
                .setTypes("document")
                .setQuery(QueryBuilders.filteredQuery(QueryBuilders.matchAllQuery(), 
                        FilterBuilders.hasParentFilter("case", 
                                FilterBuilders.termsFilter("_id", caseIds))))
                .setSize(0)
                .addAggregation(AggregationBuilders.terms("dates").field("_parent")
                    .subAggregation(AggregationBuilders.min("startDate").field("date"))
                    .subAggregation(AggregationBuilders.max("endDate").field("date")))
                .execute().actionGet();
        Terms ids = resp.getAggregations().get("dates");
        return ids;        
    }
    
    public EaCase getCaseById(String id)
    {
        Client esClient = esAdmin.getClient();
        GetResponse resp = esClient.prepareGet(esAdmin.getIndexName(), "case", id)
                .execute().actionGet();
        EaCase eaCase = parseCase(resp.getSource());
        eaCase.setId(id);
        Bucket datesInfo = queryCaseEdgeDates(Arrays.asList(id)).getBucketByKey(id);
        if (datesInfo != null)
        {
            Date startDate = new Date(((Number)((Min)datesInfo.getAggregations().get("startDate")).getValue()).longValue());
            Date endDate   = new Date(((Number)((Max)datesInfo.getAggregations().get("endDate")).getValue()).longValue());
            eaCase.setStartDate(startDate);
            eaCase.setEndDate(endDate);
        }
        return eaCase;
    }
    
    public EaCase parseCase(Map<String, Object> esData)
    {
        EaCase eaCase = new EaCase();
        eaCase.setNumber((String)esData.get("number"));
        eaCase.setType(((Number)esData.get("type")).longValue());
        eaCase.setStoreLife(((Number)esData.get("storeLife")).longValue());
        eaCase.setTitle((String)esData.get("title"));
        Number toporef = (Number)esData.get("toporef");
        if (toporef != null)
            eaCase.setToporef(toporef.longValue());
        eaCase.setRemark((String)esData.get("remark"));
        return eaCase;
    }
    
    public SearchHits searchCaseDocuments(String caseId, String context, Integer start, Integer limit)
    {
        QueryBuilder query;
        if (context == null || context.isEmpty())
            query = QueryBuilders.matchAllQuery();
        else
            query = getQuery("graph", context);
        FilterBuilder filter = getFilter("caseId", caseId);
        
        Client esClient = esAdmin.getClient();
        SearchResponse resp = esClient.prepareSearch(esAdmin.getIndexName())
                .setTypes("document")
                .setQuery(QueryBuilders.filteredQuery(query, filter))
                .setFrom(start)
                .setSize(limit)
                .setFetchSource(null, new String[]
                    {"addUserId", "modUserId", "insertDate" ,"lastUpdateDate"})
                .execute().actionGet();
        return resp.getHits();
    }
    
    public EaDocument getDocumentById(String id, String caseId)
    {
        Client esClient = esAdmin.getClient();
        GetResponse resp = esClient.prepareGet(esAdmin.getIndexName(), "document", id)
                .setParent(caseId)
                .execute().actionGet();
        EaDocument doc = parseDocument(resp.getSource());
        doc.setId(id);
        doc.setCaseId(caseId);
        doc.setCaseTitle(getCaseById(caseId).getTitle());
        if (esIndex.isExistsImageFile(id))
            doc.setGraph(MessageFormat.format("{0}{1}.pdf", getLinkPrefix(), id));
        return doc;
    }
    
    public EaDocument parseDocument(Map<String, Object> docData)
    {
        EaDocument doc = new EaDocument();
        doc.setVolume((Integer)docData.get("volume"));
        doc.setNumber((String)docData.get("number"));
        doc.setType(((Number)docData.get("type")).longValue());
        doc.setTitle((String)docData.get("title"));
        doc.setStartPage((Integer)docData.get("startPage"));
        doc.setEndPage((Integer)docData.get("endPage"));
        doc.setDate((String)docData.get("date"));
        doc.setRemark((String)docData.get("remark"));
        doc.setCourt((String)docData.get("court"));
        doc.setFio((String)docData.get("fio"));
        return doc;
    }
    
    protected QueryBuilder makeQuery(Map<String, Object> queryMap, Map<String, Object> filterMap)
    {
        QueryBuilder query;
        if (allNulls(queryMap))
            query = QueryBuilders.matchAllQuery();
        else
        {
            if (oneNotNull(queryMap))
            {
                String field = getNotNull(queryMap);
                query = getQuery(field, queryMap.get(field));
            }
            else
            {
                BoolQueryBuilder bool = QueryBuilders.boolQuery();
                for (String field : queryMap.keySet())
                {
                    Object obj = queryMap.get(field);
                    if (obj != null)
                        bool.must(getQuery(field, obj));
                }
                query = bool;
            }
        }                
        
        if (!allNulls(filterMap))
        {
            FilterBuilder filter;
            if (oneNotNull(filterMap))
            {
                String field = getNotNull(filterMap);
                filter = getFilter(field, filterMap.get(field));
            }
            else
            {
                BoolFilterBuilder bool = FilterBuilders.boolFilter();
                for (String field : filterMap.keySet())
                {
                    Object obj = filterMap.get(field);
                    if (obj != null)
                        bool.must(getFilter(field, obj));
                }
                filter = bool;
            }
            query = QueryBuilders.filteredQuery(query, filter);
        }
        return query;
    }
    
    protected boolean allNulls(Map<String, Object> objMap)
    {
        for (Object obj : objMap.values())
            if (obj != null)
                return false;
        return true;
    }
    
    protected boolean oneNotNull(Map<String, Object> objMap)
    {
        boolean found = false;
        for (Object obj : objMap.values())
            if (obj != null)
            {
                if (found)
                    return false;
                found = true;
            }
        return found;
    }
    
    protected String getNotNull(Map<String, Object> objMap)
    {
        for (String key : objMap.keySet())
            if (objMap.get(key) != null)
                return key;
        return null;
    }
    
    protected QueryBuilder getQuery(String field, Object value)
    {
        return QueryBuilders.matchQuery(field, value);
    }
    
    protected FilterBuilder getFilter(String field, Object value)
    {
        if (field.equals("pages"))
        {
            Pair<Integer, Integer> pages = (Pair<Integer, Integer>)value;
            if (pages.getValue0() == null)
                return FilterBuilders.rangeFilter("startPage").lte(pages.getValue1());
            if (pages.getValue1() == null)
                return FilterBuilders.rangeFilter("endPage").gte(pages.getValue0());
            
            return FilterBuilders.boolFilter()
                    .should(FilterBuilders.boolFilter()
                        .must(FilterBuilders.rangeFilter("startPage").lte(pages.getValue0()))
                        .must(FilterBuilders.rangeFilter("endPage").gte(pages.getValue0())))
                    .should(FilterBuilders.boolFilter()
                        .must(FilterBuilders.rangeFilter("startPage").lte(pages.getValue1()))
                        .must(FilterBuilders.rangeFilter("endPage").gte(pages.getValue1())))
                    .should(FilterBuilders.boolFilter()
                        .must(FilterBuilders.rangeFilter("startPage").gte(pages.getValue0()))
                        .must(FilterBuilders.rangeFilter("endPage").lte(pages.getValue1())));
        }
        if (field.equals("date"))
            return FilterBuilders.termFilter(field, new SimpleDateFormat("dd.MM.YYYY").format(value));
        
        if (field.equals("dates"))
        {
            Pair<Date, Date> dates = (Pair<Date, Date>)value;
            RangeFilterBuilder range = FilterBuilders.rangeFilter("date");
            SimpleDateFormat df = new SimpleDateFormat("dd.MM.YYYY");
            if (dates.getValue1() != null)
                range = range.lte(df.format(dates.getValue1()));
            if (dates.getValue0() != null)
                range = range.gte(df.format(dates.getValue0()));
            return FilterBuilders.hasChildFilter("document", range);
        }
        if (field.equals("toporef"))
            return FilterBuilders.termsFilter(field, (Iterable<Long>)value);
        if (field.equals("caseId"))
            return FilterBuilders.hasParentFilter("case", 
                    FilterBuilders.termFilter("_id", value));
        
        return FilterBuilders.termFilter(field, value);
    }
    
    public String getLinkPrefix()
    {
        if (LINK_PREFIX == null)
            LINK_PREFIX = dbHandler.getCoreParameterValue("LINK_PREFIX");
        return LINK_PREFIX;
    }
}

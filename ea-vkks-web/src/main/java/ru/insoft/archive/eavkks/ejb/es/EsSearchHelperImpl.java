package ru.insoft.archive.eavkks.ejb.es;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.Local;
import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.elasticsearch.action.count.CountResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.common.xcontent.ToXContent;
import org.elasticsearch.common.xcontent.json.JsonXContent;
import org.elasticsearch.index.query.BoolFilterBuilder;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.FilterBuilder;
import org.elasticsearch.index.query.FilterBuilders;
import static org.elasticsearch.index.query.FilterBuilders.scriptFilter;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeFilterBuilder;
import org.elasticsearch.index.query.functionscore.FunctionScoreQueryBuilder;
import static org.elasticsearch.index.query.functionscore.ScoreFunctionBuilders.factorFunction;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms.Bucket;
import org.elasticsearch.search.aggregations.metrics.max.Max;
import org.elasticsearch.search.aggregations.metrics.min.Min;
import org.elasticsearch.search.aggregations.metrics.sum.Sum;
import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;
import org.javatuples.Pair;
import ru.insoft.archive.eavkks.ejb.CommonDBHandler;
import ru.insoft.archive.eavkks.model.EaCase;
import ru.insoft.archive.eavkks.model.EaDocument;
import ru.insoft.archive.eavkks.webmodel.CaseSearchCriteria;
import ru.insoft.archive.eavkks.webmodel.DocumentSearchCriteria;
import ru.insoft.archive.extcommons.webmodel.OrderBy;

/**
 *
 * @author melnikov
 */
@Stateless
@Local(EsSearchHelper.class)
@Remote(EsSearchHelperRemote.class)
public class EsSearchHelperImpl implements EsSearchHelper, EsSearchHelperRemote {

	@Inject
	EsAdminHelper esAdmin;
	@Inject
	CommonDBHandler dbHandler;

	private String LINK_PREFIX;

	private static Boolean isLinux;

	@PostConstruct
	private void init() {
		if (isLinux == null) {
			isLinux = System.getProperty("os.name").equalsIgnoreCase("linux");
		}
	}

	private String encodeString(String string) {
		try {
			return new String(string.getBytes("iso-8859-1"), "UTF-8");
		} catch (UnsupportedEncodingException ex) {
			Logger.getLogger(EsSearchHelper.class.getName()).log(Level.SEVERE, null, ex);
		}
		return string;
	}

	@Override
	public List<String> searchFios(String prefix) {
		if (isLinux) {
			prefix = encodeString(prefix);
		}
		Client esClient = esAdmin.getClient();
		SearchResponse resp = esClient.prepareSearch(esAdmin.getIndexName())
				.setTypes("document")
				.setQuery(prefix == null || prefix.isEmpty()
								? QueryBuilders.matchAllQuery()
								: QueryBuilders.matchPhrasePrefixQuery("fio", prefix))
				.setSize(0)
				.addAggregation(AggregationBuilders.terms("fio")
						.field("fio.search")
				)
				.execute().actionGet();
		Terms fios = resp.getAggregations().get("fio");
		List<String> res = new ArrayList<>();
		for (Bucket bucket : fios.getBuckets()) {
			res.add(bucket.getKey());
		}
		return res;
	}

	@Override
	public List<String> searchCourts(String prefix) {
		if (isLinux) {
			prefix = encodeString(prefix);
		}
		Client esClient = esAdmin.getClient();
		SearchResponse resp = esClient.prepareSearch(esAdmin.getIndexName())
				.setTypes("document")
				.setQuery(prefix == null || prefix.isEmpty()
								? QueryBuilders.matchAllQuery()
								: QueryBuilders.matchPhrasePrefixQuery("court", prefix))
				.setSize(0)
				.addAggregation(AggregationBuilders.terms("court")
						.field("court.search")
				)
				.execute().actionGet();
		Terms courts = resp.getAggregations().get("court");
		List<String> res = new ArrayList<>();
		for (Bucket bucket : courts.getBuckets()) {
			res.add(bucket.getKey());
		}
		return res;
	}

	@Override
	public List<String> searchCaseNumPrefixes(String prefix) {
		if (isLinux) {
			prefix = encodeString(prefix);
		}
		Client esClient = esAdmin.getClient();
		SearchResponse resp = esClient.prepareSearch(esAdmin.getIndexName())
				.setTypes("case")
				.setQuery(prefix == null || prefix.isEmpty()
								? QueryBuilders.matchAllQuery()
								: QueryBuilders.matchPhrasePrefixQuery("num_prefix", prefix))
				.setSize(0)
				.addAggregation(AggregationBuilders.terms("prefixes").field("num_prefix"))
				.execute().actionGet();
		Terms prefixes = resp.getAggregations().get("prefixes");
		List<String> res = new ArrayList<>();
		for (Bucket bucket : prefixes.getBuckets()) {
			res.add(bucket.getKey());
		}
		return res;
	}

	@Override
	public SearchHits searchDocuments(final DocumentSearchCriteria q,
			Integer start, Integer limit, List<OrderBy> orders) {
		Map<String, Object> queryMap = new HashMap<String, Object>() {
			{
				put("number", q.getNumber());
				put("title", q.getTitle());
				put("court", q.getCourt());
				put("remark", q.getRemark());
				put("fio", q.getFio());
				put("graph", q.getContext());

			}
		};

		Map<String, Object> filterMap = new HashMap<String, Object>() {
			{
				put("type", q.getType());
				put("dates", (q.getStartDate() == null && q.getEndDate() == null) ? null
						: new Pair<>(q.getStartDate(), q.getEndDate()));
			}
		};
		//filterMap.put("volume", q.getVolume());        
		/*filterMap.put("pages", (q.getStartPage() == null && q.getEndPage() == null ? null :
		 new Pair<>(q.getStartPage(), q.getEndPage())));*/

		QueryBuilder query = makeQuery(queryMap, filterMap);

		Client esClient = esAdmin.getClient();
		SearchRequestBuilder req = esClient.prepareSearch(esAdmin.getIndexName())
				.setTypes("document")
				.setQuery(query)
				.setFrom(start)
				.setSize(limit)
				.setFetchSource(null, new String[]{"graph", "addUserId", "modUserId", "insertDate", "lastUpdateDate"});
		if (orders != null) {
			for (OrderBy order : orders) {
				String field = order.getField();
				if (field.equals("fio") || field.equals("court")
						|| field.equals("title") || field.equals("remark")) {
					// Сортируем по целому полю а не по токенам
					field += ".raw";
				}
				req.addSort(SortBuilders.fieldSort(field)
						.order(order.asc() ? SortOrder.ASC : SortOrder.DESC));
			}
		}
		SearchResponse resp = req.execute().actionGet();
		return resp.getHits();
	}

	@Override
	public SearchHits searchCases(final CaseSearchCriteria q, Integer start, Integer limit, List<OrderBy> orders) {
		Map<String, Object> queryMap = new HashMap<String, Object>() {
			{
				put("num_number.str", q.getNumNumber());
				put("title", q.getTitle());
				put("case_court", q.getCourt());
				put("case_fio", q.getFio());
				put("remark", q.getRemark());
			}
		};
		Map<String, Object> filterMap = new HashMap<String, Object>() {
			{
				put("num_prefix", q.getNumPrefix());
				put("type", q.getType());
				put("storeLife", q.getStoreLife());
				put("case_dates", (q.getStartDate() == null && q.getEndDate() == null) ? null
						: new Pair<>(q.getStartDate(), q.getEndDate()));
				put("toporef", q.getToporefIds());
			}
		};

		FunctionScoreQueryBuilder sbuilder = 
				new FunctionScoreQueryBuilder(makeQuery(queryMap, filterMap))
						.add(scriptFilter("_source.remark != null && _source.remark.length() == 0"), 
								factorFunction(2.0f));

		Client esClient = esAdmin.getClient();
		SearchRequestBuilder req = esClient.prepareSearch(esAdmin.getIndexName())
				.setTypes("case")
				.setQuery(sbuilder)
				.setFrom(start)
				.setSize(limit)
				.setTrackScores(true)
				.setFetchSource(null, new String[]{"addUserId", "modUserId", "insertDate", "lastUpdateDate"});
		if (orders != null) {
			for (OrderBy order : orders) {
				String field = order.getField();
				SortOrder so = order.asc() ? SortOrder.ASC : SortOrder.DESC;
				if (field.equals("number")) {
					req.addSort(SortBuilders.fieldSort("num_prefix").order(so));
					req.addSort(SortBuilders.fieldSort("num_number").order(so));
				} else {
					if (field.equals("title") || field.equals("remark")) {
						field += ".raw";
					}
					req.addSort(SortBuilders.fieldSort("_score").order(SortOrder.ASC));
					req.addSort(SortBuilders.fieldSort(field).order(so));
				}
			}
		}
		try {
			System.out.println(
					req.internalBuilder().toXContent(JsonXContent.contentBuilder(),
							ToXContent.EMPTY_PARAMS).
					prettyPrint().
					string()
			);
		} catch (IOException ex) {
			Logger.getLogger(EsSearchHelperImpl.class.getName()).log(Level.SEVERE, null, ex);
		}
		SearchResponse resp = req.execute().actionGet();
		return resp.getHits();
	}

	@Override
	public Terms queryCaseEdgeDates(Iterable<String> caseIds) {
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

	@Override
	public EaCase getCaseById(String id) {
		Client esClient = esAdmin.getClient();
		GetResponse resp = esClient.prepareGet(esAdmin.getIndexName(), "case", id)
				.execute().actionGet();
		EaCase eaCase = parseCase(resp.getSource());
		eaCase.setId(id);
		Bucket datesInfo = queryCaseEdgeDates(Arrays.asList(id)).getBucketByKey(id);
		if (datesInfo != null) {
			Date startDate = new Date(((Number) ((Min) datesInfo.getAggregations().get("startDate")).getValue()).longValue());
			Date endDate = new Date(((Number) ((Max) datesInfo.getAggregations().get("endDate")).getValue()).longValue());
			eaCase.setStartDate(startDate);
			eaCase.setEndDate(endDate);
		}
		eaCase.setPages(queryCasePageCount(id));
		return eaCase;
	}

	@Override
	public EaCase parseCase(Map<String, Object> esData) {
		EaCase eaCase = new EaCase();
		//eaCase.setNumber((String)esData.get("number"));
		eaCase.setNumPrefix((String) esData.get("num_prefix"));
		eaCase.setNumNumber((Integer) esData.get("num_number"));
		eaCase.setType(((Number) esData.get("type")).longValue());
		eaCase.setStoreLife(((Number) esData.get("storeLife")).longValue());
		eaCase.setTitle((String) esData.get("title"));
		Number toporef = (Number) esData.get("toporef");
		if (toporef != null) {
			eaCase.setToporef(toporef.longValue());
		}
		eaCase.setRemark((String) esData.get("remark"));
		return eaCase;
	}

	protected Integer queryCasePageCount(String id) {
		Client esClient = esAdmin.getClient();
		SearchResponse resp = esClient.prepareSearch(esAdmin.getIndexName())
				.setTypes("document")
				.setQuery(QueryBuilders.filteredQuery(QueryBuilders.matchAllQuery(),
								FilterBuilders.hasParentFilter("case",
										FilterBuilders.termFilter("_id", id))))
				.setSize(0)
				.addAggregation(AggregationBuilders.terms("pages").field("_parent")
						.subAggregation(AggregationBuilders.sum("count").field("pages")))
				.execute().actionGet();
		Bucket pagesInfo = ((Terms) resp.getAggregations().get("pages")).getBucketByKey(id);
		if (pagesInfo == null) {
			return null;
		}
		return ((Number) ((Sum) pagesInfo.getAggregations().get("count")).getValue()).intValue();
	}

	@Override
	public int queryMaxCaseNumberForPrefix(String numPrefix) {
		Client esClient = esAdmin.getClient();
		SearchResponse resp = esClient.prepareSearch(esAdmin.getIndexName())
				.setTypes("case")
				.setQuery(QueryBuilders.filteredQuery(QueryBuilders.matchAllQuery(),
								FilterBuilders.termFilter("num_prefix", numPrefix)))
				.setSize(0)
				.addAggregation(AggregationBuilders.max("maxNumber").field("num_number"))
				.execute().actionGet();
		Number maxNumber = (Number) ((Max) resp.getAggregations().get("maxNumber")).getValue();
		return maxNumber.equals(Double.NEGATIVE_INFINITY) ? 0 : maxNumber.intValue();
	}

	@Override
	public boolean checkCaseNumberUniqueness(String numPrefix, Integer numNumber, String id) {
		Client esClient = esAdmin.getClient();
		CountResponse resp = esClient.prepareCount(esAdmin.getIndexName())
				.setTypes("case")
				.setQuery(QueryBuilders.filteredQuery(QueryBuilders.matchAllQuery(),
								FilterBuilders.boolFilter()
								.must(FilterBuilders.termFilter("num_prefix", numPrefix))
								.must(FilterBuilders.termFilter("num_number", numNumber))
								.mustNot(FilterBuilders.termFilter("_id", id))))
				.execute().actionGet();
		return resp.getCount() == 0;
	}

	@Override
	public SearchHits searchCaseDocuments(String caseId, String context, Integer start, Integer limit, List<OrderBy> orders) {
		QueryBuilder query;
		if (context == null || context.isEmpty()) {
			query = QueryBuilders.matchAllQuery();
		} else {
			query = getQuery("graph", context);
		}
		FilterBuilder filter = getFilter("caseId", caseId);

		Client esClient = esAdmin.getClient();
		SearchRequestBuilder req = esClient.prepareSearch(esAdmin.getIndexName())
				.setTypes("document")
				.setQuery(QueryBuilders.filteredQuery(query, filter))
				.setFrom(start)
				.setSize(limit)
				.setFetchSource(null, new String[]{"addUserId", "modUserId", "insertDate", "lastUpdateDate"});

		if (orders != null) {
			for (OrderBy order : orders) {
				String field = order.getField();
				if (field.equals("fio") || field.equals("court")
						|| field.equals("title") || field.equals("remark")) {
					// Сортируем по целому полю а не по токенам
					field += ".raw";
				}
				req.addSort(SortBuilders.fieldSort(field)
						.order(order.asc() ? SortOrder.ASC : SortOrder.DESC));
			}
		}

		SearchResponse resp = req.execute().actionGet();
		return resp.getHits();
	}

	@Override
	public EaDocument getDocumentById(String id, String caseId) {
		Client esClient = esAdmin.getClient();
		GetResponse resp = esClient.prepareGet(esAdmin.getIndexName(), "document", id)
				.setParent(caseId)
				.execute().actionGet();
		EaDocument doc = parseDocument(resp.getSource());
		doc.setId(id);
		doc.setCaseId(caseId);
		doc.setCaseTitle(getCaseById(caseId).getTitle());
		if (isExistsImageFile(id)) {
			doc.setGraph(MessageFormat.format("{0}{1}.pdf", getLinkPrefix(), id));
		}
		return doc;
	}

	@Override
	public EaDocument parseDocument(Map<String, Object> docData) {
		EaDocument doc = new EaDocument();
		doc.setCaseId((String) docData.get("_parent"));
		//doc.setVolume((Integer)docData.get("volume"));
		doc.setNumber((String) docData.get("number"));
		doc.setType(((Number) docData.get("type")).longValue());
		doc.setTitle((String) docData.get("title"));
		//doc.setStartPage((Integer)docData.get("startPage"));
		//doc.setEndPage((Integer)docData.get("endPage"));
		doc.setPages((Integer) docData.get("pages"));
		doc.setDate((String) docData.get("date"));
		doc.setRemark((String) docData.get("remark"));
		doc.setCourt((String) docData.get("court"));
		doc.setFio((String) docData.get("fio"));
		return doc;
	}

	protected QueryBuilder makeQuery(Map<String, Object> queryMap, Map<String, Object> filterMap) {
		QueryBuilder query;
		if (allNulls(queryMap)) {
			query = QueryBuilders.matchAllQuery();
		} else {
			if (oneNotNull(queryMap)) {
				String field = getNotNull(queryMap);
				query = getQuery(field, queryMap.get(field));
			} else {
				BoolQueryBuilder bool = QueryBuilders.boolQuery();
				for (String field : queryMap.keySet()) {
					Object obj = queryMap.get(field);
					if (obj != null) {
						bool.must(getQuery(field, obj));
					}
				}
				query = bool;
			}
		}

		if (!allNulls(filterMap)) {
			FilterBuilder filter;
			if (oneNotNull(filterMap)) {
				String field = getNotNull(filterMap);
				filter = getFilter(field, filterMap.get(field));
			} else {
				BoolFilterBuilder bool = FilterBuilders.boolFilter();
				for (String field : filterMap.keySet()) {
					Object obj = filterMap.get(field);
					if (obj != null) {
						bool.must(getFilter(field, obj));
					}
				}
				filter = bool;
			}
			query = QueryBuilders.filteredQuery(query, filter);
		}
		return query;
	}

	protected boolean allNulls(Map<String, Object> objMap) {
		for (Object obj : objMap.values()) {
			if (obj != null) {
				return false;
			}
		}
		return true;
	}

	protected boolean oneNotNull(Map<String, Object> objMap) {
		boolean found = false;
		for (Object obj : objMap.values()) {
			if (obj != null) {
				if (found) {
					return false;
				}
				found = true;
			}
		}
		return found;
	}

	protected String getNotNull(Map<String, Object> objMap) {
		for (String key : objMap.keySet()) {
			if (objMap.get(key) != null) {
				return key;
			}
		}
		return null;
	}

	protected QueryBuilder getQuery(String field, Object value) {
		if (field.startsWith("case_")) {
			String dbField = field.replaceFirst("case_", "");
			return QueryBuilders.hasChildQuery("document",
					QueryBuilders.matchQuery(dbField, value)
					.operator(MatchQueryBuilder.Operator.AND));
		}
		if (field.contains("number")) {
			return QueryBuilders.wildcardQuery(field, MessageFormat.format("*{0}*", value));
		}
		return QueryBuilders.matchQuery(field, value).operator(MatchQueryBuilder.Operator.AND);
	}

	protected FilterBuilder getFilter(String field, Object value) {
		/*if (field.equals("pages"))
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
		 }*/
		if (field.equals("dates")) {
			Pair<Date, Date> dates = (Pair<Date, Date>) value;
			RangeFilterBuilder range = FilterBuilders.rangeFilter("date");
			SimpleDateFormat df = new SimpleDateFormat("dd.MM.YYYY");
			if (dates.getValue1() != null) {
				range = range.lte(df.format(dates.getValue1()));
			}
			if (dates.getValue0() != null) {
				range = range.gte(df.format(dates.getValue0()));
			}
			return range;
		}

		if (field.equals("case_dates")) {
			Pair<Date, Date> dates = (Pair<Date, Date>) value;
			RangeFilterBuilder range = FilterBuilders.rangeFilter("date");
			SimpleDateFormat df = new SimpleDateFormat("dd.MM.YYYY");
			if (dates.getValue1() != null) {
				range = range.lte(df.format(dates.getValue1()));
			}
			if (dates.getValue0() != null) {
				range = range.gte(df.format(dates.getValue0()));
			}
			return FilterBuilders.hasChildFilter("document", range);
		}
		if (field.equals("toporef")) {
			return FilterBuilders.termsFilter(field, (Iterable<Long>) value);
		}
		if (field.equals("caseId")) {
			return FilterBuilders.hasParentFilter("case",
					FilterBuilders.termFilter("_id", value));
		}

		return FilterBuilders.termFilter(field, value);
	}

	@Override
	public String getLinkPrefix() {
		if (LINK_PREFIX == null) {
			LINK_PREFIX = dbHandler.getCoreParameterValue("LINK_PREFIX");
		}
		return LINK_PREFIX;
	}

	@Override
	public boolean isExistsImageFile(String documentId) {
		File f = new File(esAdmin.getPathToSaveFiles(), documentId + ".pdf");
		return f.exists();
	}
}

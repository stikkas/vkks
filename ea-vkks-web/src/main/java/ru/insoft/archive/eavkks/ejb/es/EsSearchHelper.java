package ru.insoft.archive.eavkks.ejb.es;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms.Bucket;

/**
 *
 * @author melnikov
 */
@Stateless
public class EsSearchHelper 
{
    @Inject
    EsAdminHelper esAdmin;
    
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
}

package ru.insoft.archive.eavkks.ejb.es;

import java.io.IOException;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.admin.indices.exists.indices.IndicesExistsRequest;
import org.elasticsearch.action.admin.indices.exists.indices.IndicesExistsResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.IndicesAdminClient;
import org.elasticsearch.client.transport.NoNodeAvailableException;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.common.xcontent.XContentBuilder;
import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;
import ru.insoft.archive.eavkks.ejb.CommonDBHandler;
import ru.insoft.archive.eavkks.ejb.LogWriter;

/**
 *
 * @author melnikov
 */
@Stateless
public class EsAdminHelper 
{
    @Inject
    CommonDBHandler dbHandler;
    @Inject
    LogWriter log;
    
    private Client esClient;
    private String ES_HOST_NAME;
    private Integer ES_PORT;
    private Integer NUMBER_OF_SHARDS;
    private Integer NUMBER_OF_REPLICAS;
    private String INDEX_NAME;
    private String PATH_TO_SAVE_FILES;
    
    @PostConstruct
    private void init()
    {
        ES_HOST_NAME       = dbHandler.getCoreParameterValue("ES_HOST_NAME");
        ES_PORT            = Integer.valueOf(dbHandler.getCoreParameterValue("ES_PORT"));
        NUMBER_OF_SHARDS   = Integer.valueOf(dbHandler.getCoreParameterValue("ES_NUMBER_OF_SHARDS"));
        NUMBER_OF_REPLICAS = Integer.valueOf(dbHandler.getCoreParameterValue("ES_NUMBER_OF_REPLICAS"));
        INDEX_NAME         = dbHandler.getCoreParameterValue("ES_INDEX_NAME");
    }
    
    public String getIndexName()
    {
        return INDEX_NAME;
    }
    
    public String getPathToSaveFiles()
    {
        if (PATH_TO_SAVE_FILES == null)
        {
            PATH_TO_SAVE_FILES = dbHandler.getCoreParameterValue("PATH_TO_SAVE_FILES");
        }
            
        return PATH_TO_SAVE_FILES;
    }
    
    public Client getClient()
    {
        if (esClient == null)
            esClient = new TransportClient()
                    .addTransportAddress(new InetSocketTransportAddress(ES_HOST_NAME, ES_PORT));
        
        return esClient;
    }
    
    @PreDestroy
    private void onDestroy()
    {
        if (esClient != null)
            esClient.close();
    }
    
    public void createSchema() throws Exception
    {
        try
        {
            esClient = getClient();
            IndicesAdminClient indices = esClient.admin().indices();
            IndicesExistsRequest ieRequest = new IndicesExistsRequest(INDEX_NAME);
            IndicesExistsResponse ieResponse = indices.exists(ieRequest).actionGet();
            if (ieResponse.isExists())
            {
                DeleteIndexRequest diRequest = new DeleteIndexRequest(INDEX_NAME);
                indices.delete(diRequest).actionGet();
                log.logClearData();
            }
            
            XContentBuilder src = jsonBuilder()
                    .startObject()
                        .startObject("settings")
                            .field("number_of_shards", NUMBER_OF_SHARDS)
                            .field("number_of_replicas", NUMBER_OF_REPLICAS)                            
                            .startObject("analysis")
                                .startObject("analyzer")
                                    .startObject("default")
                                        .field("type", "russian")
                                    .endObject()
                                    .startObject("sortable")
										.field("tokenizer","keyword")
										.field("filter","lowercase")
                                    .endObject()
                                .endObject()
                            .endObject()
                        .endObject()                        
                        .rawField("mappings", getMapping().bytes())
                    .endObject();
            indices.prepareCreate(INDEX_NAME).setSource(src).execute().actionGet();
        }
        catch (NoNodeAvailableException e)
        {
            throw new Exception("Сервер ElasticSearch недоступен по адресу " + 
                    ES_HOST_NAME + ":" + ES_PORT);
        }
    }
    
    protected XContentBuilder getMapping() throws IOException
    {
        XContentBuilder builder = jsonBuilder()
                .startObject()
                    .startObject("case")
                        .startObject("properties")
                            .startObject("num_prefix")
                                .field("type", "string")
                                .field("index", "not_analyzed")
                            .endObject()
                            .startObject("num_number")
                                .field("type", "integer")
                                .startObject("fields")
                                    .startObject("str")
                                        .field("type", "string")
                                        .field("index", "not_analyzed")
                                    .endObject()
                                .endObject()
                            .endObject()
                            .startObject("type")
                                .field("type", "long")
                            .endObject()
                            .startObject("storeLife")
                                .field("type", "long")
                            .endObject()
                            .startObject("title")
                                .field("type", "string")
                                .field("index", "analyzed")
                                .startObject("fields")
                                    .startObject("raw")
                                        .field("type", "string")
										.field("analyzer","sortable")
                                    .endObject()
                                .endObject()
                            .endObject()
                            .startObject("toporef")
                                .field("type", "long")                           
                            .endObject()
                            .startObject("remark")
                                .field("type", "string")
                                .field("index", "analyzed")
                                .startObject("fields")
                                    .startObject("raw")
                                        .field("type", "string")
										.field("analyzer","sortable")
                                    .endObject()
                                .endObject()
                            .endObject()
                            .startObject("addUserId")
                                .field("type", "long")
                            .endObject()
                            .startObject("modUserId")
                                .field("type", "long")
                            .endObject()
                            .startObject("insertDate")
                                .field("type", "date")
                                .field("format", "dd.MM.YYYY HH:mm:ss")
                            .endObject()
                            .startObject("lastUpdateDate")
                                .field("type", "date")
                                .field("format", "dd.MM.YYYY HH:mm:ss")
                            .endObject()
                        .endObject()
                    .endObject()
                    .startObject("document")
                        .startObject("_parent")
                            .field("type", "case")
                        .endObject()
                        .startObject("properties")
                            .startObject("acase")
                                .field("type", "string")
								.field("analyzer","sortable")
                            .endObject()
                            .startObject("toporef")
                                .field("type", "long")
                            .endObject()
                            .startObject("number")
                                .field("type", "string")
								.field("analyzer","sortable")
                            .endObject()
                            /*.startObject("volume")
                                .field("type", "integer")
                            .endObject()*/
                            .startObject("type")
                                .field("type", "long")
                            .endObject()
                            .startObject("title")
                                .field("type", "string")
                                .field("index", "analyzed")
                                .startObject("fields")
                                    .startObject("raw")
                                        .field("type", "string")
										.field("analyzer","sortable")
                                    .endObject()
                                .endObject()
                            .endObject()
                            /*.startObject("startPage")
                                .field("type", "integer")
                            .endObject()
                            .startObject("endPage")
                                .field("type", "integer")
                            .endObject()*/
                            .startObject("pages")
                                .field("type", "integer")                                
                            .endObject()
                            .startObject("date")
                                .field("type", "date")
                                .field("format", "dd.MM.YYYY")
                            .endObject()
                            .startObject("remark")
                                .field("type", "string")
                                .field("index", "analyzed")
                                .startObject("fields")
                                    .startObject("raw")
                                        .field("type", "string")
										.field("analyzer","sortable")
                                    .endObject()
                                .endObject()
                            .endObject()
                            .startObject("court")
                                .field("type", "string")
                                .field("index", "analyzed")
                                .field("analyzer", "standard")
                                .startObject("fields")
                                    .startObject("raw")
                                        .field("type", "string")
										.field("analyzer","sortable")
                                    .endObject()
                                    .startObject("search")
                                        .field("type", "string")
                                        .field("index", "not_analyzed")
                                    .endObject()
                                .endObject()
                            .endObject()
                            .startObject("fio")
                                .field("type", "string")
                                .field("index", "analyzed")
                                .field("analyzer", "standard")
                                .startObject("fields")
                                    .startObject("raw")
                                        .field("type", "string")
										.field("analyzer","sortable")
                                    .endObject()
                                    .startObject("search")
                                        .field("type", "string")
                                        .field("index", "not_analyzed")
                                    .endObject()
                                .endObject()
                            .endObject()
                            .startObject("graph")
                                .field("type", "attachment")
                                .startObject("fields")
                                    .startObject("graph")
                                        .field("type", "string")
                                        .field("index", "analyzed")
                                    .endObject()
                                .endObject()
                            .endObject()
                            .startObject("addUserId")
                                .field("type", "long")
                            .endObject()
                            .startObject("modUserId")
                                .field("type", "long")
                            .endObject()
                            .startObject("insertDate")
                                .field("type", "date")
                                .field("format", "dd.MM.YYYY HH:mm:ss")
                            .endObject()
                            .startObject("lastUpdateDate")
                                .field("type", "date")
                                .field("format", "dd.MM.YYYY HH:mm:ss")
                            .endObject()
                        .endObject()
                    .endObject()
                .endObject();
        return builder;
    }
    
    public void refreshIndex()
    {
        esClient = getClient();
        IndicesAdminClient indices = esClient.admin().indices();
        indices.prepareRefresh(getIndexName()).execute().actionGet();
    }
}

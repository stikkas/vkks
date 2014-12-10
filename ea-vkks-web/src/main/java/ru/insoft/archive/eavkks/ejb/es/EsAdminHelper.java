package ru.insoft.archive.eavkks.ejb.es;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
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

/**
 *
 * @author melnikov
 */
@Stateless
public class EsAdminHelper 
{
    @Inject
    CommonDBHandler dbHandler;
    
    private final Logger logger;
    private Client esClient;
    private String ES_HOST_NAME;
    private Integer ES_PORT;
    private Integer NUMBER_OF_SHARDS;
    private Integer NUMBER_OF_REPLICAS;
    private String INDEX_NAME;
    
    public EsAdminHelper()
    {
        logger = Logger.getLogger(getClass().getName());
    }
    
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
        logger.info("destroying elastic search client");
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
                logger.log(Level.WARNING, "index ''{0}'' deleted", INDEX_NAME);
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
                                .endObject()
                            .endObject()
                        .endObject()                        
                        .rawField("mappings", getMapping().bytes())
                    .endObject();
            logger.log(Level.INFO, "settings: {0}", src.string());
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
                            .startObject("number")
                                .field("type", "string")
                                .field("index", "not_analyzed")
                            .endObject()
                            .startObject("type")
                                .field("type", "integer")
                            .endObject()
                            .startObject("storeLife")
                                .field("type", "integer")
                            .endObject()
                            .startObject("title")
                                .field("type", "string")
                                .field("index", "analyzed")
                            .endObject()
                            .startObject("toporef")
                                .field("type", "integer")                           
                            .endObject()
                            .startObject("remark")
                                .field("type", "string")
                                .field("index", "analyzed")
                            .endObject()
                        .endObject()
                    .endObject()
                    .startObject("document")
                        .startObject("_parent")
                            .field("type", "case")
                        .endObject()
                        .startObject("properties")
                            .startObject("number")
                                .field("type", "string")
                                .field("index", "not_analyzed")
                            .endObject()
                            .startObject("volume")
                                .field("type", "integer")
                            .endObject()
                            .startObject("type")
                                .field("type", "integer")
                            .endObject()
                            .startObject("title")
                                .field("type", "string")
                                .field("index", "analyzed")
                            .endObject()
                            .startObject("startPage")
                                .field("type", "integer")
                            .endObject()
                            .startObject("endPage")
                                .field("type", "integer")
                            .endObject()
                            .startObject("date")
                                .field("type", "date")
                                .field("format", "dd.MM.YYYY")
                            .endObject()
                            .startObject("remark")
                                .field("type", "string")
                                .field("index", "analyzed")
                            .endObject()
                            .startObject("court")
                                .field("type", "string")
                                .field("index", "analyzed")
                                .field("analyzer", "standard")
                                .startObject("fields")
                                    .startObject("raw")
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
                        .endObject()
                    .endObject()
                .endObject();
        logger.log(Level.INFO, "mapping for {0}: \r\n{1}", new Object[]{INDEX_NAME, builder.string()});
        return builder;
    }
}

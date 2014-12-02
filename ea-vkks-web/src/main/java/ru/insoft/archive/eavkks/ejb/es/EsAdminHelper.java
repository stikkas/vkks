package ru.insoft.archive.eavkks.ejb.es;

import java.io.IOException;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.elasticsearch.action.admin.indices.create.CreateIndexRequest;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.admin.indices.exists.indices.IndicesExistsRequest;
import org.elasticsearch.action.admin.indices.exists.indices.IndicesExistsResponse;
import org.elasticsearch.action.admin.indices.mapping.put.PutMappingRequest;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.IndicesAdminClient;
import org.elasticsearch.client.Requests;
import org.elasticsearch.client.transport.NoNodeAvailableException;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.ImmutableSettings;
import org.elasticsearch.common.settings.Settings;
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
                logger.warning("index '" + INDEX_NAME + "' deleted");
            }
            
            Settings settings = ImmutableSettings.settingsBuilder()
                    .put("number_of_shards", NUMBER_OF_SHARDS)
                    .put("number_of_replicas", NUMBER_OF_REPLICAS)
                    .build();
            CreateIndexRequest ciRequest = new CreateIndexRequest(INDEX_NAME, settings);
            indices.create(ciRequest).actionGet();
            
            PutMappingRequest pmRequest = Requests.putMappingRequest(INDEX_NAME);
            pmRequest.type("case");
            pmRequest.source(getCaseMapping());
            indices.putMapping(pmRequest).actionGet();
        }
        catch (NoNodeAvailableException e)
        {
            throw new Exception("Сервер ElasticSearch недоступен по адресу " + 
                    ES_HOST_NAME + ":" + ES_PORT);
        }
    }
    
    protected XContentBuilder getCaseMapping() throws IOException
    {
        XContentBuilder builder = jsonBuilder();
        return builder;
    }
}

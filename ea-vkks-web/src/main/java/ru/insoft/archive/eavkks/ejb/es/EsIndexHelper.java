package ru.insoft.archive.eavkks.ejb.es;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.elasticsearch.client.Client;
import org.elasticsearch.common.Base64;
import org.elasticsearch.common.joda.time.format.DateTimeFormat;
import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;
import org.elasticsearch.index.query.FilterBuilders;
import org.elasticsearch.index.query.QueryBuilders;
import ru.insoft.archive.eavkks.ejb.CommonDBHandler;
import ru.insoft.archive.eavkks.model.EaCase;
import ru.insoft.archive.eavkks.model.EaDocument;

/**
 *
 * @author melnikov
 */
@Stateless
public class EsIndexHelper 
{
    @Inject
    EsAdminHelper esAdmin;
    @Inject
    CommonDBHandler dbHandler;
    
    private String PATH_TO_SAVE_FILES;
    
    public void indexCase(EaCase eaCase) throws IOException
    {
        Client esClient = esAdmin.getClient();
        esClient.prepareUpdate(esAdmin.getIndexName(), "case", eaCase.getId().toString())
                .setDoc(jsonBuilder()
                        .startObject()
                            .field("number", eaCase.getNumber())
                            .field("type", eaCase.getTypeId())
                            .field("storeLife", eaCase.getStoreLifeTypeId())
                            .field("title", eaCase.getTitle())
                            .field("toporef", eaCase.getToporefId())
                            .field("remark", eaCase.getRemark())
                        .endObject()
                )
                .setDocAsUpsert(true)
                .execute().actionGet();
    }
    
    public void deleteCase(Long id)
    {
        Client esClient = esAdmin.getClient();
        esClient.prepareDelete(esAdmin.getIndexName(), "case", id.toString())
                .execute().actionGet();
    }
    
    public void indexDocument(EaDocument eaDoc) throws IOException
    {
        Client esClient = esAdmin.getClient();
        esClient.prepareUpdate(esAdmin.getIndexName(), "document", eaDoc.getId().toString())
                .setParent(eaDoc.getEaCase().getId().toString())
                .setDoc(jsonBuilder()
                        .startObject()
                            .field("_parent", eaDoc.getEaCase().getId().toString())
                            .field("number", eaDoc.getNumber())
                            .field("volume", eaDoc.getVolume())
                            .field("type", eaDoc.getTypeId())
                            .field("title", eaDoc.getTitle())
                            .field("startPage", eaDoc.getStartPage())
                            .field("endPage", eaDoc.getEndPage())
                            .field("date", eaDoc.getDate(), DateTimeFormat.forPattern("dd.MM.YYYY"))
                            .field("remark", eaDoc.getRemark())
                            .field("court", eaDoc.getCourt())
                            .field("fio", eaDoc.getFio())
                        .endObject()
                )
                .setDocAsUpsert(true)
                .execute().actionGet();
    }
    
    public void deleteAllCaseDocuments(Long id, List<EaDocument> docs)
    {
        if (docs != null)
            for (EaDocument doc : docs)
                deleteImageFile(doc.getId().toString());     
        
        Client esClient = esAdmin.getClient();
        esClient.prepareDeleteByQuery(esAdmin.getIndexName())
                .setTypes("document")
                .setQuery(QueryBuilders.filteredQuery(QueryBuilders.matchAllQuery(),
                        FilterBuilders.termFilter("_parent", id.toString())))
                .execute().actionGet();
    }
    
    public void indexImage(String caseId, String documentId, byte[] data) throws IOException
    {
        Path p = FileSystems.getDefault().getPath(getPathToSaveFiles(), documentId + ".pdf");
        try
        {
            Files.write(p, data, StandardOpenOption.CREATE);
        }
        catch (IOException e)
        {
            throw new RuntimeException("Ошибка при записи в файл <" + p.toString() + ">");
        }
        
        Client esClient = esAdmin.getClient();
        esClient.prepareUpdate(esAdmin.getIndexName(), "document", documentId)
                .setParent(caseId)
                .setDoc(jsonBuilder()
                    .startObject()
                        .field("graph", Base64.encodeBytes(data))
                    .endObject()
                )
                .execute().actionGet();
    }
    
    private String getPathToSaveFiles()
    {
        if (PATH_TO_SAVE_FILES == null)
        {
            PATH_TO_SAVE_FILES = dbHandler.getCoreParameterValue("PATH_TO_SAVE_FILES");
        }
            
        return PATH_TO_SAVE_FILES;
    }
    
    public void deleteImageFile(String documentId)
    {
        File f = new File(getPathToSaveFiles(), documentId + ".pdf");
        if (f.exists())
            f.delete();
    }
}

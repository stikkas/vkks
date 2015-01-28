package ru.insoft.archive.eavkks.load.ejb;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.Resource;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.javatuples.Pair;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.eavkks.load.misc.BadSourceException;
import ru.insoft.archive.eavkks.load.model.LoadedCase;
import ru.insoft.archive.eavkks.load.model.LoadedToporef;
import ru.insoft.archive.eavkks.model.EaCase;
import ru.insoft.archive.eavkks.ejb.CommonDBHandler;
import ru.insoft.archive.eavkks.ejb.LogWriter;
import ru.insoft.archive.eavkks.ejb.es.EsIndexHelper;
import ru.insoft.archive.eavkks.load.model.LoadedDocument;
import ru.insoft.archive.eavkks.model.EaDocument;
import ru.insoft.archive.extcommons.ejb.UserInfo;

/**
 *
 * @author melnikov
 */
@Stateless
@TransactionManagement(TransactionManagementType.CONTAINER)
public class DataSaver 
{
    @PersistenceContext(unitName = "VkksEm")
    private EntityManager em;
    @Inject
    CommonDBHandler dbHandler;
    @Inject
    UserInfo ui;
    @Inject
    EsIndexHelper esIndex;
    @Resource
    SessionContext context;
    @Inject
    LogWriter log;
    
    private Map<String, Long> caseTypes       = new HashMap<String, Long>();
    private Map<String, Long> storeLifeTypes  = new HashMap<String, Long>();
    private Map<LoadedToporef, Long> toporefs = new HashMap<LoadedToporef, Long>();
    private Map<String, Long> documentTypes   = new HashMap<String, Long>();
    private Long loadUserId;
    private Long toporefGroupId;
    
    /*@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
    public void clearDb()
    {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<EaDocument> root = cq.from(EaDocument.class);
        cq.select(root.<Long>get("id"));
        cq.where(cb.equal(root.get("addUserId"), getLoadUserId()));
        List<Long> deletedIds = em.createQuery(cq).getResultList();
        for (Long docId : deletedIds)
            esIndex.deleteImageFile(docId.toString());
        
        Query q = em.createNativeQuery(new StringBuilder()
                .append("delete from EA_DOCUMENT where add_user_id = ?; ")
                .append("delete from EA_CASE where add_user_id = ?; ")
                .toString());
        q.setParameter(1, getLoadUserId());
        q.setParameter(2, getLoadUserId());
        q.executeUpdate();
    }*/
    
    @TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
    public void saveLoadedData(LoadedCase lCase, File filesDir) throws BadSourceException, IOException
    {       
        EaCase eaCase = new EaCase();
        try
        {            
            eaCase.setNumber(lCase.getNumber());
            eaCase.setTitle(lCase.getTitle());
            eaCase.setRemark(lCase.getRemark());
            eaCase.setType(getDescriptorValueId(caseTypes, "CASE_TYPE", lCase.getType(),
                    "Неверный код типа дела"));
            eaCase.setStoreLife(getDescriptorValueId(storeLifeTypes, "CASE_STORE_LIFE", lCase.getStoreLife(),
                    "Неверный код срока хранения"));
            eaCase.setToporef(getToporefValueId(lCase.getToporef()));
            eaCase.setDocuments(new ArrayList<EaDocument>());

            eaCase.setAddUserId(getLoadUserId());
            eaCase.setModUserId(getLoadUserId());
            eaCase.setInsertDate(new Date());
            eaCase.setLastUpdateDate(eaCase.getInsertDate());

            //em.persist(eaCase);
            //em.flush();
            eaCase.setId(esIndex.indexCase(eaCase));

            for (LoadedDocument lDoc : lCase.getDocuments())
            {
                EaDocument eaDoc = new EaDocument();
                eaDoc.setCaseId(eaCase.getId());
                eaDoc.setType(getDescriptorValueId(documentTypes, "DOCUMENT_TYPE", lDoc.getType(),
                        "Неверный код вида документа"));
                //eaDoc.setVolume(lDoc.getVolume());
                eaDoc.setNumber(lDoc.getNumber());
                eaDoc.setTitle(lDoc.getTitle());
                //eaDoc.setStartPage(lDoc.getStartPage());
                //eaDoc.setEndPage(lDoc.getEndPage());
                eaDoc.setDate(new SimpleDateFormat("dd.MM.YYYY").format(lDoc.getDate()));
                eaDoc.setRemark(lDoc.getRemark());
                eaDoc.setCourt(lDoc.getCourt());
                eaDoc.setFio(lDoc.getFio());

                eaDoc.setAddUserId(getLoadUserId());
                eaDoc.setModUserId(getLoadUserId());
                eaDoc.setInsertDate(new Date());
                eaDoc.setLastUpdateDate(eaCase.getInsertDate());

                //em.persist(eaDoc);
                //em.flush();
                eaDoc.setId(esIndex.indexDocument(eaDoc, eaCase.getNumber(), eaCase.getToporef()));
                eaCase.getDocuments().add(eaDoc);                

                Path imageFilePath = FileSystems.getDefault().getPath(filesDir.getPath(), lDoc.getGraph());                
                try
                {
                    byte[] fileData = Files.readAllBytes(imageFilePath);
                    esIndex.indexImage(eaCase.getId(), eaDoc.getId(), fileData);
                }
                catch (IOException e)
                {
                    throw new BadSourceException("Невозможно прочитать файл <" + imageFilePath.toString() + ">");
                }
            }
        }
        catch (BadSourceException e)
        {
            context.setRollbackOnly();
            if (eaCase.getId() != null)
            {
                esIndex.deleteAllCaseDocuments(eaCase.getId(), eaCase.getDocuments());
                esIndex.deleteCase(eaCase.getId());
            }
            throw e;
        }
    }
    
    public Long getLoadUserId()
    {
        if (loadUserId == null)
        {
            loadUserId = ui.getUser().getId();
            /*try
            {
                AdmUser loadUser = ui.queryUserByLogin("LOAD");
                loadUserId = loadUser.getId();
            }
            catch (EJBTransactionRolledbackException e)
            {
                if (e.getCause().getClass().equals(NoResultException.class))
                    throw new RuntimeException("В БД не существует пользователя LOAD");
                else
                    throw e;
            }*/
        }
        return loadUserId;
    }
    
    private Long getDescriptorValueId(Map<String, Long> codeMap, String groupCode, 
                                      String valueCode, String badCodeMessage)
            throws BadSourceException
    {
        Long dvId = codeMap.get(valueCode);
        if (dvId == null)
        {
            DescriptorValue dv = dbHandler.getDescValueByCodes(groupCode, valueCode);
            if (dv == null)
                throw new BadSourceException(MessageFormat.format("{0}: \"{1}\"", 
                        badCodeMessage, valueCode));
            dvId = dv.getId();
            codeMap.put(valueCode, dvId);
        }
        return dvId;
    }
    
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    private Long getToporefValueId(LoadedToporef lTopo) throws BadSourceException
    {
        if (lTopo == null)
            return null;
        if (lTopo.getRoom() == null || lTopo.getRack() == null || lTopo.getShelf() == null)
            throw new BadSourceException("Недостаточно данных по топографии");
        
        Long shelfId = toporefs.get(lTopo);
        if (shelfId == null)
        {
            Pair<Long, Boolean> room  = getToporefPart(lTopo.getRoom(), "Комната", "ком.", null, false);
            Pair<Long, Boolean> rack  = getToporefPart(lTopo.getRack(), "Стеллаж", "ст.", 
                    room.getValue0(), room.getValue1());
            Pair<Long, Boolean> shelf = getToporefPart(lTopo.getShelf(), "Полка", "п.", 
                    rack.getValue0(), rack.getValue1());
            shelfId = shelf.getValue0();
            toporefs.put(lTopo, shelfId);
        }
        
        return shelfId;
    }
    
    private Long getToporefGroupId()
    {
        if (toporefGroupId == null)
            try
            {
                toporefGroupId = dbHandler.getDescGroupIdByCode("TOPOREF");
            }
            catch (Exception e)
            {
                String msg = "В БД отсутствует справочник топографического указателя";
                log.logError(msg);
                throw new RuntimeException(msg);
            }
        
        return toporefGroupId;
    }
    
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    private Pair<Long, Boolean> getToporefPart(Integer loadedValue, String fullValuePrefix,
                                               String shortValuePrefix, Long parentId,
                                               Boolean newValue)
    {
        String dvName = MessageFormat.format("{0} {1}", fullValuePrefix, loadedValue);
        Long dvId = null;
        if (!newValue)
            dvId = dbHandler.getToporefValueId(dvName, parentId);
        if (dvId == null)
        {
            DescriptorValue dv = new DescriptorValue();
            dv.setGroupId(getToporefGroupId());
            dv.setValue(dvName);
            dv.setShortValue(MessageFormat.format("{0} {1}", shortValuePrefix, loadedValue));
            dv.setSortIndex(dbHandler.getMaxSortIndex(getToporefGroupId(), parentId) + 1);
            dv.setParentId(parentId);
            em.persist(dv);
            em.flush();
            dvId = dv.getId();
            newValue = true;
        }
        return new Pair<>(dvId, newValue);
    }
}

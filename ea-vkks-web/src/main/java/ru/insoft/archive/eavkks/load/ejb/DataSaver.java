package ru.insoft.archive.eavkks.load.ejb;

import java.text.MessageFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.ejb.EJBTransactionRolledbackException;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.javatuples.Pair;
import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.eavkks.load.misc.BadSourceException;
import ru.insoft.archive.eavkks.load.model.LoadedCase;
import ru.insoft.archive.eavkks.load.model.LoadedToporef;
import ru.insoft.archive.eavkks.model.EaCase;
import ru.insoft.archive.eavkks.ejb.CommonDBHandler;
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
    
    private Map<String, Long> caseTypes       = new HashMap<String, Long>();
    private Map<String, Long> storeLifeTypes  = new HashMap<String, Long>();
    private Map<LoadedToporef, Long> toporefs = new HashMap<LoadedToporef, Long>();
    private Map<String, Long> documentTypes   = new HashMap<String, Long>();
    private Long loadUserId;
    private Long toporefGroupId;
    
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void clearDb()
    {
        Query q = em.createNativeQuery(new StringBuilder()
                .append("delete from EA_DOCUMENT where add_user_id = ?; ")
                .append("delete from EA_CASE where add_user_id = ?; ")
                .toString());
        q.setParameter(1, getLoadUserId());
        q.setParameter(2, getLoadUserId());
        q.executeUpdate();
    }
    
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void saveLoadedData(LoadedCase lCase) throws BadSourceException
    {        
        EaCase eaCase = new EaCase();
        eaCase.setNumber(lCase.getNumber());
        eaCase.setTitle(lCase.getTitle());
        eaCase.setRemark(lCase.getRemark());
        eaCase.setTypeId(getDescriptorValueId(caseTypes, "CASE_TYPE", lCase.getType(),
                "Неверный код типа дела"));
        eaCase.setStoreLifeTypeId(getDescriptorValueId(storeLifeTypes, "CASE_STORE_LIFE", lCase.getStoreLife(),
                "Неверный код срока хранения"));
        eaCase.setToporefId(getToporefValueId(lCase.getToporef()));
        
        eaCase.setAddUserId(getLoadUserId());
        eaCase.setModUserId(getLoadUserId());
        eaCase.setInsertDate(new Date());
        eaCase.setLastUpdateDate(eaCase.getInsertDate());
        
        em.persist(eaCase);
        em.flush();
        
        for (LoadedDocument lDoc : lCase.getDocuments())
        {
            EaDocument eaDoc = new EaDocument();
            eaDoc.setEaCase(eaCase);
            eaDoc.setTypeId(getDescriptorValueId(documentTypes, "DOCUMENT_TYPE", lDoc.getType(),
                    "Неверный код вида документа"));
            eaDoc.setVolume(lDoc.getVolume());
            eaDoc.setNumber(lDoc.getNumber());
            eaDoc.setTitle(lDoc.getTitle());
            eaDoc.setStartPage(lDoc.getStartPage());
            eaDoc.setEndPage(lDoc.getEndPage());
            eaDoc.setDate(lDoc.getDate());
            eaDoc.setRemark(lDoc.getRemark());
            eaDoc.setCourt(lDoc.getCourt());
            eaDoc.setFio(lDoc.getFio());
            
            eaDoc.setAddUserId(getLoadUserId());
            eaDoc.setModUserId(getLoadUserId());
            eaDoc.setInsertDate(new Date());
            eaDoc.setLastUpdateDate(eaCase.getInsertDate());
            
            em.persist(eaDoc);
            em.flush();
        }
    }
    
    private Long getLoadUserId()
    {
        if (loadUserId == null)
        {
            try
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
            }
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
                throw new RuntimeException("В БД отсутствует справочник топографического указателя");
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

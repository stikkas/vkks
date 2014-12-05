package ru.insoft.archive.eavkks.load.ejb;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.eavkks.load.misc.BadSourceException;
import ru.insoft.archive.eavkks.load.model.LoadedCase;
import ru.insoft.archive.eavkks.load.model.LoadedToporef;
import ru.insoft.archive.eavkks.model.EaCase;
import ru.insoft.archive.eavkks.ejb.CommonDBHandler;

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
    
    private Map<String, Long> caseTypes       = new HashMap<String, Long>();
    private Map<String, Long> storeLifeTypes  = new HashMap<String, Long>();
    private Map<LoadedToporef, Long> toporefs = new HashMap<LoadedToporef, Long>();
    private Map<String, Long> documentTypes   = new HashMap<String, Long>();
    private Long toporefGroupId;
    
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
            String roomName = "Комната " + lTopo.getRoom().toString();
            Long roomId = dbHandler.getToporefValueId(roomName, null);
            if (roomId == null)
            {
                DescriptorValue room = new DescriptorValue();
                room.setGroupId(getToporefGroupId());
                room.setValue(roomName);
                room.setShortValue("ком. " + lTopo.getRoom().toString());
                room.setSortIndex(dbHandler.getMaxSortIndex(getToporefGroupId(), null));
                em.persist(room);
                roomId = room.getId();
            }
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
}

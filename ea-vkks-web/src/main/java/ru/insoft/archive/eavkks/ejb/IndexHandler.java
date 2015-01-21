package ru.insoft.archive.eavkks.ejb;

import java.io.IOException;
import java.util.Date;
import java.util.Map;
import javax.ejb.Stateless;
import javax.inject.Inject;
import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.eavkks.ejb.es.EsIndexHelper;
import ru.insoft.archive.eavkks.ejb.es.EsSearchHelper;
import ru.insoft.archive.eavkks.model.EaCase;
import ru.insoft.archive.eavkks.model.EaDocument;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.entity.HasUserInfo;

/**
 *
 * @author melnikov
 */
@Stateless
public class IndexHandler 
{
    @Inject
    UserInfo ui;
    @Inject
    EsIndexHelper esIndex;
    @Inject
    EsSearchHelper esSearch;
    @Inject
    LogWriter log;
    
    public String indexCase(EaCase eaCase) throws IOException
    {
        setUserInfo(eaCase);
        return esIndex.indexCase(eaCase);
    }
    
    public String indexDocument(EaDocument eaDoc) throws IOException
    {
        setUserInfo(eaDoc);
        EaCase eaCase = esSearch.getCaseById(eaDoc.getCaseId());
        return esIndex.indexDocument(eaDoc, eaCase.getNumber());
    }
    
    protected void setUserInfo(HasUserInfo entity)
    {
        AdmUser user = ui.getUser();
        if (user == null)
        {
            String msg = "Пользователь не авторизован";
            log.logError(msg);
            throw new RuntimeException(msg);
        }
        
        entity.setModUserId(user.getId());
        entity.setLastUpdateDate(new Date());
        if (HasId.class.isAssignableFrom(entity.getClass()))
            if (((HasId)entity).getId() == null)
            {
                entity.setAddUserId(entity.getModUserId());
                entity.setInsertDate(entity.getLastUpdateDate());
            }
    }
}

package ru.insoft.archive.eavkks.ejb;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.Date;
import javax.ejb.Stateless;
import javax.inject.Inject;
import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.eavkks.ejb.es.EsIndexHelper;
import ru.insoft.archive.eavkks.ejb.es.EsSearchHelper;
import ru.insoft.archive.eavkks.model.EaCase;
import ru.insoft.archive.eavkks.model.EaDocument;
import ru.insoft.archive.eavkks.webmodel.SavedCaseInfo;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.entity.HasUserInfo;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.extcommons.webmodel.ActionResult;

/**
 *
 * @author melnikov
 */
@Stateless
public class IndexHandler 
{
    @Inject
//    UserInfo ui;
	UserBean ui;

    @Inject
    EsIndexHelper esIndex;
    @Inject
    EsSearchHelper esSearch;
    @Inject
    LogWriter log;
    @Inject
    CommonDBHandler dbHandler;
    
    public JsonOut indexCase(EaCase eaCase, boolean ignoreDuplicates) throws IOException
    {
        setUserInfo(eaCase);
        if (eaCase.getId() == null)
        {
            String numPrefix = dbHandler.getDescAttrValue(eaCase.getType(), "CASE_TYPE_INDEX");
            eaCase.setNumPrefix(numPrefix);
            eaCase.setNumNumber(esSearch.queryMaxCaseNumberForPrefix(numPrefix) + 1);
        }
        else
            if (!ignoreDuplicates && !esSearch.checkCaseNumberUniqueness(eaCase.getNumPrefix(), eaCase.getNumNumber(), eaCase.getId()))
            {
                String msg = MessageFormat.format("Номер дела \"{0}\" не является уникальным", eaCase.getNumber());
                log.logError(msg);
                return ActionResult.wrapError(msg);
            }
        
        String caseId = esIndex.indexCase(eaCase);
        SavedCaseInfo sci = new SavedCaseInfo();
        sci.setId(caseId);
        sci.setNumPrefix(eaCase.getNumPrefix());
        sci.setNumNumber(eaCase.getNumNumber());
        return sci;
    }
    
    public String indexDocument(EaDocument eaDoc) throws IOException
    {
        setUserInfo(eaDoc);
        EaCase eaCase = esSearch.getCaseById(eaDoc.getCaseId());
        return esIndex.indexDocument(eaDoc, eaCase.getNumber(), eaCase.getToporef());
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

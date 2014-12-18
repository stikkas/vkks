package ru.insoft.archive.eavkks.ejb;

import java.io.IOException;
import java.util.Date;
import javax.ejb.Stateless;
import javax.inject.Inject;
import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.eavkks.ejb.es.EsIndexHelper;
import ru.insoft.archive.eavkks.model.EaCase;
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
    
    public String indexCase(EaCase eaCase) throws IOException
    {
        setUserInfo(eaCase);
        return esIndex.indexCase(eaCase);
    }
    
    protected void setUserInfo(HasUserInfo entity)
    {
        AdmUser user = ui.getUser();
        if (user == null)
            throw new RuntimeException("Пользователь не авторизован");
        
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

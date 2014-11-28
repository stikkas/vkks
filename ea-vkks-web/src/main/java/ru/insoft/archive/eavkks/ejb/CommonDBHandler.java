package ru.insoft.archive.eavkks.ejb;

import javax.annotation.Resource;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ru.insoft.archive.extcommons.ejb.UserInfo;

/**
 *
 * @author melnikov
 */
@Stateless(name = "CommonDBHandler")
@TransactionManagement(TransactionManagementType.CONTAINER)
public class CommonDBHandler extends ru.insoft.archive.extcommons.ejb.CommonDBHandler
{
    @PersistenceContext(unitName = "VkksEm")
    EntityManager em;
    
    @Resource
    SessionContext context;
    
    @Inject
    UserInfo userInfo;

    @Override
    protected EntityManager getEntityManager() 
    {
        return em;
    }

    @Override
    protected UserInfo getUserInfo() 
    {
        return userInfo;
    }

    @Override
    protected SessionContext getContext() 
    {
        return context;
    }
        
}

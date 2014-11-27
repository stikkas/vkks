package ru.insoft.archive.eavkks.ejb;

import javax.annotation.Resource;
import javax.ejb.EJBContext;
import javax.ejb.Stateful;
import javax.enterprise.context.SessionScoped;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author melnikov
 */
@Named
@Stateful
@SessionScoped
public class UserInfo extends ru.insoft.archive.extcommons.ejb.UserInfo
{
    @PersistenceContext(unitName = "VkksEm")
    EntityManager em;
    
    @Resource
    EJBContext context;

    @Override
    protected EntityManager getEntityManager() 
    {
        return em;
    }

    @Override
    protected EJBContext getEjbContext() 
    {
        return context;
    }
    
}

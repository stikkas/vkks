package ru.insoft.archive.eavkks.ejb;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author melnikov
 */
@Stateless(name = "JsonTools")
public class JsonTools extends ru.insoft.archive.extcommons.ejb.JsonTools
{
    @PersistenceContext(unitName = "VkksEm")
    EntityManager em;    

    @Override
    protected EntityManager getEntityManager() 
    {
        return em;
    }    
}

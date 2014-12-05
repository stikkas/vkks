package ru.insoft.archive.eavkks.ejb;

import javax.annotation.Resource;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import ru.insoft.archive.core_model.table.desc.DescriptorGroup;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
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
     
    public Long getToporefValueId(String name, Long parentId)
    {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<DescriptorValue> root = cq.from(DescriptorValue.class);
        Join<DescriptorValue, DescriptorGroup> join = root.join("group");
        cq.select(root.<Long>get("id"));
        cq.where(cb.and(
                cb.equal(join.get("code"), "TOPOREF"),
                cb.equal(cb.lower(root.<String>get("value")), name.toLowerCase()),
                (parentId == null ? cb.isNull(root.get("parentId")) : 
                        cb.equal(root.get("parentId"), parentId))
        ));
        try
        {
            return em.createQuery(cq).getSingleResult();
        }
        catch (NoResultException e)
        {
            return null;
        }
    }
}

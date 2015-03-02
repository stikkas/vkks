package ru.insoft.archive.eavkks.ejb;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.ejb.EJBContext;
import javax.ejb.Lock;
import javax.ejb.LockType;
import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.core_model.view.adm.VAdmUserRule;

/**
 *
 * @author Благодатских С.
 */
@Lock(LockType.READ)
@Singleton
public class UserBean extends ru.insoft.archive.extcommons.ejb.UserInfo {

	@Resource
	EJBContext ctx;

	@PersistenceContext(unitName = "VkksEm")
	EntityManager em;

	private Map<String, AdmUser> users;

	@PostConstruct
	private void init() {
		users = new HashMap<>();
	}

	public void sessionDestroyed() {
		users.remove(ctx.getCallerPrincipal().getName());
	}

	/**
	 * Возвращает текущего пользователя системы
	 *
	 * @return пользователь, который работает с системой в данный момент
	 */
	@Override
	public AdmUser getUser() {
		String userName = ctx.getCallerPrincipal().getName();
		if (userName.equals("anonymous")) {
			userName = "LOAD";
		}
		AdmUser user = users.get(userName);
		if (user == null) {
			user = queryUserByLogin(userName);
			users.put(userName, user);
		}
		return user;
	}

	/**
	 * Запрос к БД на получение пользователя с заданным логином
	 *
	 * @param login Логин пользователя
	 * @return запись о пользователе
	 */
	@Override
	public AdmUser queryUserByLogin(String login) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<AdmUser> cq = cb.createQuery(AdmUser.class);
		Root<AdmUser> root = cq.from(AdmUser.class);
		cq.where(cb.equal(cb.upper(root.<String>get("login")), login.toUpperCase()));
		return em.createQuery(cq).getSingleResult();
	}

	/**
	 * Возвращает список прав доступа, которые назначены текущему пользователю
	 *
	 * @return список кодов прав доступа
	 * @see ru.insoft.archive.core_model.table.adm.AdmAccessRule
	 */
	@Override
	public List<String> getAccessRules() {
		AdmUser user = getUser();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<String> cq = cb.createQuery(String.class);
		Root<VAdmUserRule> root = cq.from(VAdmUserRule.class);
		cq.select(root.<String>get("rule")).where(cb.equal(root.get("userId"), user.getId()));
		List<String> access = em.createQuery(cq).getResultList();
		return access;
	}

	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

	@Override
	protected EJBContext getEjbContext() {
		return ctx;
	}

}

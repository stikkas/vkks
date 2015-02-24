package ru.insoft.archive.eavkks.ejb;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.ejb.EJBContext;
import javax.ejb.Lock;
import javax.ejb.LockType;
import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ru.insoft.archive.core_model.table.adm.AdmUser;

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

	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

	@Override
	protected EJBContext getEjbContext() {
		return ctx;
	}

	@Override
	public AdmUser getUser() {
		String userName = ctx.getCallerPrincipal().getName();
		boolean load = false;
		if (userName.equals("anonymous")) {
			userName = "LOAD";
			load = true;
		}
		AdmUser user = users.get(userName);
		if (user == null) {
			if (load) {
				user = super.queryUserByLogin(userName);
			} else {
				user = super.getUser();
			}
			users.put(userName, user);
		}
		return user;
	}

	@Override
	public AdmUser queryUserByLogin(String login) {
		AdmUser user = users.get(login);
		if (user == null) {
			user = super.queryUserByLogin(login);
			users.put(login, user);
		}
		return user;
	}

}

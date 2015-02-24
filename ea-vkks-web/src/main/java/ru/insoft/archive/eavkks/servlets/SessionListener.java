package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import ru.insoft.archive.eavkks.ejb.UserBean;

/**
 *
 * @author Благодатских С.
 */
@WebListener("session listener")
public class SessionListener implements HttpSessionListener{
	@Inject
	UserBean ub;

	@Override
	public void sessionCreated(HttpSessionEvent se) {
		
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		ub.sessionDestroyed();
	}

}

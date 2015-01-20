package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.eavkks.ejb.LogWriter;
import ru.insoft.archive.extcommons.ejb.JsonTools;

/**
 *
 * @author С. Благодатских
 */
@WebServlet("/srvcs/logout")
public class Logout extends ru.insoft.archive.extcommons.servlet.Logout {

    @Inject
    JsonTools jsonTools;
    @Inject
    LogWriter log;

    @Override
    protected JsonTools getJsonTools() 
    {
    	return jsonTools;
    }

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        try
        {
            super.handleRequest(req, resp);
        }
        catch (Exception e)
        {
            log.logUncaughtError();
            throw e;
        }
    }        
}

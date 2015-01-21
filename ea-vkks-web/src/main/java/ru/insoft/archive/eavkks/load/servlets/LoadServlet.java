package ru.insoft.archive.eavkks.load.servlets;

import javax.inject.Inject;
import javax.security.auth.login.FailedLoginException;
import javax.security.auth.login.LoginContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jboss.security.auth.callback.UsernamePasswordHandler;
import ru.insoft.archive.eavkks.ejb.LogWriter;
import ru.insoft.archive.eavkks.load.ejb.Loader;
import ru.insoft.archive.eavkks.servlets.VkksAbstractServlet;

/**
 *
 * @author melnikov
 */
@WebServlet("/load")
public class LoadServlet extends VkksAbstractServlet
{
    @Inject
    Loader loader;
    @Inject
    LogWriter log;

    @Override
    protected void handleRequest(final HttpServletRequest hsr, HttpServletResponse hsr1) throws Exception 
    {
        String res;
        try
        {
            LoginContext lc = new LoginContext("vkks", new UsernamePasswordHandler("LOAD", "loader"));
            lc.login();
            
            String fromDir = readRequestData(hsr);
            res = loader.load(fromDir);
        }
        catch (FailedLoginException e)
        {
            res = "В БД не существует пользователя LOAD/loader";
            log.logError(res);
        }                
                
        hsr1.getWriter().write(res);
    }    
}

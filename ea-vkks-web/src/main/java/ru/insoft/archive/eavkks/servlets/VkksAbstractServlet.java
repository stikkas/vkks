package ru.insoft.archive.eavkks.servlets;

import java.io.IOException;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.eavkks.ejb.LogWriter;
import ru.insoft.archive.extcommons.ejb.JsonTools;
import ru.insoft.archive.extcommons.servlet.AbstractServlet;

/**
 *
 * @author melnikov
 */
public abstract class VkksAbstractServlet extends AbstractServlet
{
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
    protected void doGet(HttpServletRequest hsr, HttpServletResponse hsr1) throws ServletException, IOException 
    {
        try
        {
            super.doGet(hsr, hsr1);
        }
        catch (ServletException se)
        {
            log.logUncaughtError();
            throw se;
        }
    }    
}

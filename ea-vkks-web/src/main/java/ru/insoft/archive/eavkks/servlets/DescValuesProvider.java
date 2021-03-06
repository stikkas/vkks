package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.json.JsonStructure;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.eavkks.ejb.CommonDBHandler;
import ru.insoft.archive.eavkks.ejb.LogWriter;
import ru.insoft.archive.extcommons.ejb.JsonTools;
import ru.insoft.archive.extcommons.webmodel.TreeItem;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/dict")
public class DescValuesProvider extends ru.insoft.archive.extcommons.servlet.DescValuesProvider
{
    @Inject
    CommonDBHandler dbHandler;
    @Inject
    JsonTools jsonTools;       
    @Inject
    LogWriter log;
    
    @Override
    protected CommonDBHandler getDbHandler() 
    {
        return dbHandler;
    }

    @Override
    protected JsonTools getJsonTools() 
    {
        return jsonTools;
    }

    @Override
    protected JsonStructure processCustomAction(String action) throws Exception 
    {
        if ("getToporef".equals(action))
        {
            TreeItem obj = dbHandler.getToporef();
            return jsonTools.getJsonForEntity(obj);
        }
        return null;
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

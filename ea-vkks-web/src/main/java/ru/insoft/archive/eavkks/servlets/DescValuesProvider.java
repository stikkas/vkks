package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import ru.insoft.archive.extcommons.ejb.CommonDBHandler;
import ru.insoft.archive.extcommons.ejb.JsonTools;

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
    
}

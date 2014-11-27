package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
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
    
    @Override
    protected JsonTools getJsonTools() 
    {
        return jsonTools;
    }
}

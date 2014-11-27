package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import ru.insoft.archive.extcommons.ejb.JsonTools;

/**
 *
 * @author С. Благодатских
 */
@WebServlet("/srvcs/logout")
public class Logout extends ru.insoft.archive.extcommons.servlet.Logout 
{
    @Inject
    JsonTools jsonTools;

    @Override
    protected JsonTools getJsonTools() 
    {
        return jsonTools;
    }	
}

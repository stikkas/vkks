package ru.insoft.archive.eavkks.load.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

    @Override
    protected void handleRequest(HttpServletRequest hsr, HttpServletResponse hsr1) throws Exception 
    {
        String fromDir = readRequestData(hsr);
        String res = loader.load(fromDir);
        hsr1.getWriter().write(res);
    }    
}

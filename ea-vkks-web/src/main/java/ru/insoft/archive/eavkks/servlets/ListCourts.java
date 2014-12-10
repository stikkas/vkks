package ru.insoft.archive.eavkks.servlets;

import java.util.List;
import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.eavkks.ejb.es.EsSearchHelper;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/courts")
public class ListCourts extends VkksAbstractServlet
{
    @Inject
    EsSearchHelper esSearch;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        String query = req.getParameter("query");
        List<String> fios = esSearch.searchCourts(query);
        resp.getWriter().write(jsonTools.buildStringList(fios).toString());
    }    
}

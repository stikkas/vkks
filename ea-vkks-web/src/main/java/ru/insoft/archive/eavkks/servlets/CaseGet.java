package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.eavkks.ejb.SearchHandler;
import ru.insoft.archive.eavkks.model.EaCase;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/search/case")
public class CaseGet extends VkksAbstractServlet
{
    @Inject
    SearchHandler search;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        String id = req.getParameter(idParamKey);
        EaCase eaCase = search.getCaseById(id);
        resp.getWriter().write(jsonTools.getJsonForEntity(eaCase).toString());
    }    
}

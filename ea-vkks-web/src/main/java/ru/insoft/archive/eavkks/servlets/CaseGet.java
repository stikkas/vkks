package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.eavkks.ejb.es.EsSearchHelper;
import ru.insoft.archive.eavkks.model.EaCase;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/search/case")
public class CaseGet extends VkksAbstractServlet
{
    @Inject
    EsSearchHelper esSearch;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        String id = req.getParameter(idParamKey);
        EaCase eaCase = esSearch.getCaseById(id);
        resp.getWriter().write(jsonTools.getJsonForEntity(eaCase).toString());
    }    
}

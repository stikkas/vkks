package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.eavkks.ejb.SearchHandler;
import ru.insoft.archive.eavkks.model.EaDocument;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/search/doc")
public class DocumentGet extends VkksAbstractServlet
{
    @Inject
    SearchHandler search;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        String id     = req.getParameter(idParamKey);
        String caseId = req.getParameter("caseId");
        EaDocument eaDoc = search.getDocumentById(id, caseId);
        resp.getWriter().write(jsonTools.getJsonForEntity(eaDoc).toString());
    }    
}

package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.eavkks.ejb.es.EsIndexHelper;
import ru.insoft.archive.extcommons.webmodel.FailMessage;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/remove/graph")
public class ImageRemove extends VkksAbstractServlet
{
    @Inject
    EsIndexHelper esIndex;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        String docId  = req.getParameter(idParamKey);
        String caseId = req.getParameter("caseId");
        esIndex.clearImage(caseId, docId);
        FailMessage fm = new FailMessage(true, null);
        resp.getWriter().write(jsonTools.getJsonForEntity(fm).toString());
    }    
}

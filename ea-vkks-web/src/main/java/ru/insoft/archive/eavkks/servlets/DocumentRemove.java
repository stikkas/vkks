package ru.insoft.archive.eavkks.servlets;

import java.text.MessageFormat;
import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.eavkks.ejb.es.EsAdminHelper;
import ru.insoft.archive.eavkks.ejb.es.EsIndexHelper;
import ru.insoft.archive.extcommons.webmodel.FailMessage;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/remove/doc")
public class DocumentRemove extends VkksAbstractServlet
{
    @Inject
    EsIndexHelper esIndex;
    @Inject
    EsAdminHelper esAdmin;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        String docId  = req.getParameter(idParamKey);
        String caseId = req.getParameter("caseId");
        
        FailMessage fm;
        boolean found = esIndex.deleteDocument(docId, caseId);
        if (found)
        {
            fm = new FailMessage(true, null);
            esAdmin.refreshIndex();
        }
        else
            fm = new FailMessage(false, MessageFormat.format("Документ с id=\"{0}\" не существует", docId));
        resp.getWriter().write(jsonTools.getJsonForEntity(fm).toString());
    }    
}

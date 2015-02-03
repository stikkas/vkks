package ru.insoft.archive.eavkks.servlets;

import java.text.MessageFormat;
import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.eavkks.ejb.es.EsAdminHelper;
import ru.insoft.archive.eavkks.ejb.es.EsIndexHelper;
import ru.insoft.archive.eavkks.ejb.es.EsSearchHelper;
import ru.insoft.archive.extcommons.webmodel.FailMessage;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/remove/case")
public class CaseRemove extends VkksAbstractServlet
{
    @Inject
    EsIndexHelper esIndex;
    @Inject
    EsSearchHelper esSearch;
    @Inject
    EsAdminHelper esAdmin;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        String id = req.getParameter(idParamKey);
        FailMessage fm;
        if (esSearch.searchCaseDocuments(id, null, 0, 0, null).getTotalHits() > 0)
            fm = new FailMessage(false, "Невозможно удалить дело, в котором содержатся документы");
        else
        {
            boolean found = esIndex.deleteCase(id);
            if (found)
            {
                fm = new FailMessage(true, null);
                esAdmin.refreshIndex();
            }
            else
                fm = new FailMessage(false, MessageFormat.format("Дело с id=\"{0}\" не существует", id));
        }
        resp.getWriter().write(jsonTools.getJsonForEntity(fm).toString());
    }    
}

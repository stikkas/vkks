package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.eavkks.ejb.IndexHandler;
import ru.insoft.archive.eavkks.model.EaCase;
import ru.insoft.archive.extcommons.webmodel.ActionResult;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/create/case")
public class CaseIndex extends VkksAbstractServlet
{
    @Inject
    IndexHandler index;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        String rawCase = readRequestData(req);
        boolean ignoreDuplicates = "true".equals(req.getParameter("ignoreDuplicates"));
        ActionResult ar = index.indexCase(jsonTools.parseEntity(rawCase, EaCase.class), ignoreDuplicates);
        resp.getWriter().write(jsonTools.getJsonForEntity(ar).toString());
    }    
}

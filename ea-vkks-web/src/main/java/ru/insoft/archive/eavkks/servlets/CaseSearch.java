package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import ru.insoft.archive.eavkks.ejb.SearchHandler;
import ru.insoft.archive.eavkks.webmodel.CaseSearchCriteria;
import ru.insoft.archive.extcommons.webmodel.SearchResult;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/search/cases")
public class CaseSearch extends VkksAbstractServlet
{
    @Inject
    SearchHandler search;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        HttpSession session = req.getSession();
        String rawCriteria = req.getParameter("q");
        if (rawCriteria == null)
            rawCriteria = (String)session.getAttribute("qcases");
        else
            session.setAttribute("qcases", rawCriteria);
        CaseSearchCriteria q = jsonTools.parseEntity(rawCriteria, CaseSearchCriteria.class);
        
        Integer start = Integer.valueOf(req.getParameter(startParamKey));
        Integer limit = Integer.valueOf(req.getParameter(limitParamKey));
        
        SearchResult sr = search.searchCases(q, start, limit);
        resp.getWriter().write(jsonTools.getJsonForEntity(sr).toString());
    }    
}

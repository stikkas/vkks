package ru.insoft.archive.eavkks.servlets;

import java.util.List;
import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import ru.insoft.archive.eavkks.ejb.SearchHandler;
import ru.insoft.archive.eavkks.webmodel.CaseSearchCriteria;
import ru.insoft.archive.extcommons.webmodel.OrderBy;
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
        
        List<OrderBy> orders = null;
        Integer start = Integer.valueOf(req.getParameter(startParamKey));
        Integer limit = Integer.valueOf(req.getParameter(limitParamKey));
        
        String rawSort = req.getParameter("sort");
        if (rawSort == null)
            rawSort = (String)session.getAttribute("sortCases");
        else
            session.setAttribute("sortCases", rawSort);
        if (rawSort != null)
            orders = jsonTools.parseEntitiesList(rawSort, OrderBy.class);
        
        SearchResult sr = search.searchCases(q, start, limit, orders);
        resp.getWriter().write(jsonTools.getJsonForEntity(sr).toString());
    }    
}

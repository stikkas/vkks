package ru.insoft.archive.eavkks.servlets;

import java.io.StringReader;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import ru.insoft.archive.eavkks.ejb.SearchHandler;
import ru.insoft.archive.extcommons.webmodel.SearchResult;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/search/casedocs")
public class CaseDocumentSearch extends VkksAbstractServlet
{
    @Inject
    SearchHandler search;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        HttpSession session = req.getSession();
        String rawCriteria = req.getParameter("q");
        if (rawCriteria == null)
            rawCriteria = (String)session.getAttribute("qcasedocs");
        else
            session.setAttribute("qcasedocs", rawCriteria);
        
        JsonReader reader = Json.createReader(new StringReader(rawCriteria));
        JsonObject jo = reader.readObject();
        String caseId  = jo.getString("id");
        String context = null;
        if (jo.containsKey("context"))
            context = jo.getString("context");
        
        Integer start = Integer.valueOf(req.getParameter(startParamKey));
        Integer limit = Integer.valueOf(req.getParameter(limitParamKey));
        
        SearchResult sr = search.searchCaseDocuments(caseId, context, start, limit);
        resp.getWriter().write(jsonTools.getJsonForEntity(sr).toString());
    }    
}
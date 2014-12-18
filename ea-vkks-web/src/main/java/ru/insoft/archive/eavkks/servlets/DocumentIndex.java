package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.eavkks.ejb.IndexHandler;
import ru.insoft.archive.eavkks.model.EaDocument;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/create/doc")
public class DocumentIndex extends VkksAbstractServlet
{
    @Inject
    IndexHandler index;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        String rawDocument = readRequestData(req);
        String docId = index.indexDocument(jsonTools.parseEntity(rawDocument, EaDocument.class));
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", docId);       
        resp.getWriter().write(job.build().toString());
    }    
}

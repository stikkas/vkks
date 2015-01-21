package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.eavkks.ejb.LogWriter;
import ru.insoft.archive.eavkks.ejb.Uploader;
import ru.insoft.archive.extcommons.ejb.FileUploadBean;
import ru.insoft.archive.extcommons.ejb.JsonTools;
import ru.insoft.archive.extcommons.servlet.FileUploadServlet;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/create/graph")
public class ImageUpload extends FileUploadServlet
{
    @Inject
    Uploader uploader;
    @Inject
    JsonTools jsonTools;
    @Inject
    LogWriter log;

    @Override
    protected FileUploadBean getBean() 
    {
        return uploader;
    }

    @Override
    protected JsonTools getJsonTools() 
    {
        return jsonTools;
    }

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        try
        {
            super.handleRequest(req, resp);
        }
        catch (Exception e)
        {
            log.logUncaughtError();
            throw e;
        }
    }
}

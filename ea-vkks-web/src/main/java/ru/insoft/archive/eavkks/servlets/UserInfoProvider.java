package ru.insoft.archive.eavkks.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import ru.insoft.archive.eavkks.ejb.LogWriter;
import ru.insoft.archive.eavkks.ejb.UserBean;
import ru.insoft.archive.extcommons.ejb.JsonTools;
import ru.insoft.archive.extcommons.ejb.UserInfo;
import ru.insoft.archive.extcommons.webmodel.ActionResult;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/user")
public class UserInfoProvider extends ru.insoft.archive.extcommons.servlet.UserInfoProvider
{
    @Inject
    JsonTools jsonTools;
    @Inject
//    UserInfo userInfo;
    UserBean userInfo;

    @Inject
    LogWriter log;

    @Override
    protected UserInfo getUserInfo() 
    {
        return userInfo;
    }

    @Override
    protected JsonTools getJsonTools() 
    {
        return jsonTools;
    }

    @Override
    public void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception 
    {
        try
        {
            HttpServletResponse resp1 = new HttpServletResponseWrapper(resp)
            {
                private StringWriter sw = new StringWriter();

                @Override
                public PrintWriter getWriter() throws IOException 
                {
                    return new PrintWriter(sw);
                }
                
                @Override
                public String toString()
                {
                    return sw.toString();
                }
            };
            super.handleRequest(req, resp1);
            ActionResult ar = jsonTools.parseEntity(resp1.toString(), ActionResult.class);
            if (!ar.getSuccess())
                log.logError(ar.getError());
            resp.getWriter().write(resp1.toString());
        }
        catch (Exception e)
        {
            log.logUncaughtError();
            throw e;
        }
    }    
}

package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
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
}

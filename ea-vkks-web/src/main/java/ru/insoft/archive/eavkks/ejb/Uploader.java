package ru.insoft.archive.eavkks.ejb;

import java.util.Map;
import javax.annotation.Resource;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.apache.commons.fileupload.FileItem;
import ru.insoft.archive.eavkks.ejb.es.EsIndexHelper;
import ru.insoft.archive.extcommons.ejb.FileUploadBean;

/**
 *
 * @author melnikov
 */
@Stateless
public class Uploader extends FileUploadBean
{
    @Resource
    SessionContext context;
    @Inject
    EsIndexHelper esIndex;

    @Override
    protected SessionContext getContext() 
    {
        return context;
    }

    @Override
    protected void processUploadedFile(FileItem item, Map<String, String> params) throws Exception 
    {
        esIndex.indexImage(params.get("caseId"), params.get("id"), item.get());
    }    
}

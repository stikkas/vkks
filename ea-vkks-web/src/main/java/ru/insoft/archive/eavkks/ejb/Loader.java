package ru.insoft.archive.eavkks.ejb;

import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.inject.Inject;
import ru.insoft.archive.eavkks.ejb.es.EsAdminHelper;
import ru.insoft.archive.extcommons.webmodel.FailMessage;

/**
 *
 * @author melnikov
 */
@Stateless
public class Loader 
{
    private Logger logger;
    
    @Inject
    EsAdminHelper esAdmin;
    
    public Loader()
    {
        logger = Logger.getLogger(getClass().getName());
    }
    
    public String load(String fromDir)
    {
        try
        {
            if (fromDir == null)
                throw new Exception("Путь для загрузки не может быть пустым");
            logger.info("Loading from: " + fromDir);
            
            esAdmin.createSchema();
            
            return "OK";
        }
        catch (Exception e)
        {
            return e.getMessage();
        }
    }
}

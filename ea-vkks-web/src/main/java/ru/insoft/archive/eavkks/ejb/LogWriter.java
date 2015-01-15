package ru.insoft.archive.eavkks.ejb;

import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.apache.log4j.Logger;
import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.eavkks.model.EaCase;
import ru.insoft.archive.eavkks.model.EaDocument;

/**
 *
 * @author melnikov
 */
@Stateless
public class LogWriter 
{
    private final Logger logger = Logger.getLogger(LogWriter.class);
    
    private enum LogMsgType
    {
        ADD_CASE("Добавление дела"),
        EDIT_CASE("Изменение дела"),
        DELETE_CASE("Удаление дела"),
        ADD_DOCUMENT("Добавление документа"),
        EDIT_DOCUMENT("Изменение документа"),
        DELETE_DOCUMENT("Удаление документа"),
        ATTACH_FILE("Прикрепление графического образа"),
        DETACH_FILE("Удаление графического образа"),
        CLEAR_DATA("Удаление всех данных"),
        ERROR("Ошибка")
        ;
        private String msgType;
        
        public String getMsgType()
        {
            return msgType;
        }
        private LogMsgType(String msgType)
        {
            this.msgType = msgType;
        }
    };    
    
    @Inject
    UserInfo ui;
    @Inject
    DescValueMapsProvider dvMaps;
    
    private void logOperation(LogMsgType msgType, String message)
    {
        AdmUser user = ui.getUser();
        String str = MessageFormat.format("<{0}> [{1}] {2}", 
                user == null ? "Аноним" : user.getName(), msgType.getMsgType(), message);
        if (msgType.equals(LogMsgType.ERROR))
            logger.error(str);
        else
            logger.info(str);
    }
    
    public void logError(String error)
    {
        logOperation(LogMsgType.ERROR, error);
    }
    
    public void logUncaughtError()
    {
        logError("Непредвиденная ошибка");
    }
    
    public void logAddCase(String id, String caseNumber)
    {
        logOperation(LogMsgType.ADD_CASE, 
                MessageFormat.format("ID: \"{0}\", Номер: \"{1}\"", id, caseNumber));
    }
    
    public void logEditCase(EaCase newCase, EaCase oldCase)
    {
        StringBuilder sb = new StringBuilder();
        sb.append(MessageFormat.format("ID: \"{0}\"", newCase.getId()));
        sb.append(getFieldChange(newCase.getNumber(), oldCase.getNumber(), FieldType.STRING, "Номер"));
        sb.append(getFieldChange(newCase.getType(), oldCase.getType(), FieldType.CASE_TYPE, "Тип"));
        sb.append(getFieldChange(newCase.getStoreLife(), oldCase.getStoreLife(), FieldType.CASE_STORE_LIFE, "Срок хранения"));
        sb.append(getFieldChange(newCase.getTitle(), oldCase.getTitle(), FieldType.STRING, "Название"));
        sb.append(getFieldChange(newCase.getToporef(), oldCase.getToporef(), FieldType.TOPOREF, "Топография"));
        sb.append(getFieldChange(newCase.getRemark(), oldCase.getRemark(), FieldType.STRING, "Примечание"));
        logOperation(LogMsgType.EDIT_CASE, sb.toString());
    }
    
    public void logDeleteCase(EaCase eaCase)
    {
        StringBuilder sb = new StringBuilder();
        sb.append(MessageFormat.format("ID: \"{0}\"", eaCase.getId()));
        sb.append(getFieldValue(eaCase.getNumber(), FieldType.STRING, "Номер"));
        sb.append(getFieldValue(eaCase.getType(), FieldType.CASE_TYPE, "Тип"));
        sb.append(getFieldValue(eaCase.getStoreLife(), FieldType.CASE_STORE_LIFE, "Срок хранения"));
        sb.append(getFieldValue(eaCase.getTitle(), FieldType.STRING, "Название"));
        sb.append(getFieldValue(eaCase.getToporef(), FieldType.TOPOREF, "Топография"));
        sb.append(getFieldValue(eaCase.getRemark(), FieldType.STRING, "Примечание"));
        logOperation(LogMsgType.DELETE_CASE, sb.toString());
    }
    
    public void logAddDocument(String id, String docNumber, String caseNumber)
    {
        logOperation(LogMsgType.ADD_DOCUMENT,
                MessageFormat.format("ID: \"{0}\", Номер документа: \"{1}\", Номер дела: \"{2}\"",
                        id, docNumber, caseNumber));
    }
    
    public void logEditDocument(EaDocument newDoc, EaDocument oldDoc, String caseNumber)
    {
        StringBuilder sb = new StringBuilder();
        sb.append(MessageFormat.format("ID: \"{0}\", Номер дела: \"{1}\"", newDoc.getId(), caseNumber));
        sb.append(getFieldChange(newDoc.getVolume(), oldDoc.getVolume(), FieldType.NUMBER, "Том"));
        sb.append(getFieldChange(newDoc.getNumber(), oldDoc.getNumber(), FieldType.STRING, "Номер документа"));
        sb.append(getFieldChange(newDoc.getType(), oldDoc.getType(), FieldType.DOCUMENT_TYPE, "Вид"));
        sb.append(getFieldChange(newDoc.getTitle(), oldDoc.getTitle(), FieldType.STRING, "Заголовок"));
        sb.append(getFieldChange(MessageFormat.format("{0}-{1}", newDoc.getStartPage(), newDoc.getEndPage()),
                MessageFormat.format("{0}-{1}", oldDoc.getStartPage(), oldDoc.getEndPage()),
                FieldType.STRING, "Листы"));
        sb.append(getFieldChange(newDoc.getDate(), oldDoc.getDate(), FieldType.STRING, "Дата"));
        sb.append(getFieldChange(newDoc.getRemark(), oldDoc.getRemark(), FieldType.STRING, "Примечание"));
        sb.append(getFieldChange(newDoc.getCourt(), oldDoc.getCourt(), FieldType.STRING, "Суд"));
        sb.append(getFieldChange(newDoc.getFio(), oldDoc.getFio(), FieldType.STRING, "ФИО"));
        logOperation(LogMsgType.EDIT_DOCUMENT, sb.toString());
    }
    
    public void logDeleteDocument(EaDocument doc, String caseNumber)
    {
        StringBuilder sb = new StringBuilder();
        sb.append(MessageFormat.format("ID: \"{0}\", Номер дела: \"{1}\"", doc.getId(), caseNumber));
        sb.append(getFieldValue(doc.getVolume(), FieldType.NUMBER, "Том"));
        sb.append(getFieldValue(doc.getNumber(), FieldType.STRING, "Номер документа"));
        sb.append(getFieldValue(doc.getType(), FieldType.DOCUMENT_TYPE, "Вид"));
        sb.append(getFieldValue(doc.getTitle(), FieldType.STRING, "Заголовок"));
        sb.append(getFieldValue(MessageFormat.format("{0}-{1}", doc.getStartPage(), doc.getEndPage()),
                FieldType.STRING, "Листы"));
        sb.append(getFieldValue(doc.getDate(), FieldType.STRING, "Дата"));
        sb.append(getFieldValue(doc.getRemark(), FieldType.STRING, "Примечание"));
        sb.append(getFieldValue(doc.getCourt(), FieldType.STRING, "Суд"));
        sb.append(getFieldValue(doc.getFio(), FieldType.STRING, "ФИО"));
        logOperation(LogMsgType.DELETE_DOCUMENT, sb.toString());
    }
    
    public void logAttachFile(String id, String docNumber, String caseNumber)
    {
        logOperation(LogMsgType.ATTACH_FILE,
                MessageFormat.format("ID: \"{0}\", Номер документа: \"{1}\", Номер дела: \"{2}\"",
                        id, docNumber, caseNumber));
    }
    
    public void logDetachFile(String id, String docNumber, String caseNumber)
    {
        logOperation(LogMsgType.DETACH_FILE,
                MessageFormat.format("ID: \"{0}\", Номер документа: \"{1}\", Номер дела: \"{2}\"",
                        id, docNumber, caseNumber));
    }
    
    public void logClearData()
    {
        logOperation(LogMsgType.CLEAR_DATA, "");
    }
    
    protected enum FieldType
    {
        NUMBER,
        STRING,
        DATE,
        CASE_TYPE,
        CASE_STORE_LIFE,
        DOCUMENT_TYPE,
        TOPOREF
    };
    
    protected String getFieldChange(Object value1, Object value2, FieldType valueType, String fieldName)
    {
        if (value1 == null && value2 == null || value1 != null && value1.equals(value2))
            return "";
        
        String val1 = getDisplayedValue(value1, valueType);
        String val2 = getDisplayedValue(value2, valueType);
        return MessageFormat.format(", {0}: {1} -> {2}", fieldName, val1, val2);
    }
    
    protected String getFieldValue(Object value, FieldType valueType, String fieldName)
    {
        return MessageFormat.format(", {0}: {1}", fieldName, getDisplayedValue(value, valueType));
    }
    
    protected String getDisplayedValue(Object value, FieldType valueType)
    {
        if (value == null)
            return "<<пусто>>";
        switch (valueType)
        {
            case NUMBER:
                return value.toString();
            case STRING:
                return MessageFormat.format("\"{0}\"", value);
            case DATE:
                return new SimpleDateFormat("dd.mm.yyyy").format((Date)value);
            case CASE_TYPE:
                return MessageFormat.format("\"{0}\"", dvMaps.getCaseTypeName((Long)value));
            case CASE_STORE_LIFE:
                return MessageFormat.format("\"{0}\"", dvMaps.getStoreLifeName((Long)value));
            case DOCUMENT_TYPE:
                return MessageFormat.format("\"{0}\"", dvMaps.getDocumentTypeName((Long)value));
            case TOPOREF:
                return MessageFormat.format("\"{0}\"", dvMaps.getToporefItemName((Long)value));
        }
        return null;
    }
}

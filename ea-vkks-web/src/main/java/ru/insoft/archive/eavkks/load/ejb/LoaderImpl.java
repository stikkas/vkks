package ru.insoft.archive.eavkks.load.ejb;

import ru.insoft.archive.eavkks.load.misc.BadSourceException;
import java.io.File;
import java.io.FilenameFilter;
import java.io.StringReader;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;
import javax.ejb.Local;
import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonException;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.security.auth.login.LoginContext;
import javax.security.auth.login.LoginException;
import org.jboss.security.auth.callback.UsernamePasswordHandler;
import org.jboss.weld.context.bound.BoundSessionContext;
import ru.insoft.archive.eavkks.ejb.LogWriter;
import ru.insoft.archive.eavkks.ejb.es.EsAdminHelper;
import ru.insoft.archive.eavkks.ejb.es.EsIndexHelper;
import ru.insoft.archive.eavkks.load.model.LoadedCase;
import ru.insoft.archive.extcommons.ejb.JsonTools;

/**
 *
 * @author melnikov
 */
@Stateless
@Local(Loader.class)
@Remote(LoaderRemote.class)
public class LoaderImpl implements Loader, LoaderRemote {

	@Inject
	private BoundSessionContext context;

	@Inject
	EsAdminHelper esAdmin;
	@Inject
	JsonTools jsonTools;
	@Inject
	DataSaver dbSaver;
	@Inject
	EsIndexHelper esIndex;
	@Inject
	LogWriter log;

	@Override
	public String load(String fromDir) {
		try {
			if (fromDir == null) {
				throw new BadSourceException("Путь для загрузки не может быть пустым");
			}
			File mainDir = new File(fromDir);
			if (!mainDir.isDirectory()) {
				throw new BadSourceException("Папка <" + fromDir + "> не существует");
			}
			File dataDir = new File(fromDir + "/data");
			File filesDir = new File(fromDir + "/files");
			if (!dataDir.isDirectory()) {
				throw new BadSourceException("Папка <" + dataDir.getPath() + "> не существует");
			}
			if (!filesDir.isDirectory()) {
				throw new BadSourceException("Папка <" + filesDir.getPath() + "> не существует");
			}

			esAdmin.createSchema();
			esIndex.deleteAllImages();
			//dbSaver.clearDb();
			FilenameFilter jsonFilter = new FilenameFilter() {
				@Override
				public boolean accept(File file, String name) {
					return name.endsWith(".json");
				}
			};
			Integer succ = 0, err = 0;
			StringBuilder retMsg = new StringBuilder();
			for (File jsonFile : dataDir.listFiles(jsonFilter)) {
				try {
					String data = new String(Files.readAllBytes(FileSystems.getDefault().getPath(jsonFile.getPath())));
					data = data.replace("\\", "\\u005C");
					JsonReader reader = Json.createReader(new StringReader(data));
					JsonObject jo = reader.readObject();

					LoadedCase lCase = jsonTools.parseEntity(jo, LoadedCase.class);
					dbSaver.saveLoadedData(lCase, filesDir);
					succ++;
				} catch (JsonException | BadSourceException je) {
					String msg = MessageFormat.format("Ошибка при обработке файла <{0}>:\r\n{1}",
							jsonFile.getName(), je.getMessage());
					log.logError(msg);
					retMsg.append(msg).append("\r\n");
					err++;
				}
			}

			retMsg.append("Успешно загружено: " + succ.toString() + ", ошибочных: " + err.toString());
			return retMsg.toString();
		} catch (BadSourceException e) {
			log.logError(e.getMessage());
			return e.getMessage();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * Для удаленного вызова нет @SessionScoped поэтому нужно стратровать его
	 * вручную
	 *
	 * @param srcDir папка с исходными данными
	 * @return строка с результатами работы
	 */
	@Override
	public String loadRemote(String srcDir) {
		Map<String, Object> myMap = new HashMap<>();
		context.associate(myMap);
		context.activate();
		try {
			try {
				LoginContext lc = new LoginContext("vkks", new UsernamePasswordHandler("LOAD", "loader"));
				lc.login();
			} catch (LoginException ex) {
				return "Failed to login: " + ex.getMessage();
			}
			return load(srcDir);
		} finally {
			context.invalidate();
			context.deactivate();
		}

	}
}

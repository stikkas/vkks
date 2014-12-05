package ru.fake.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Параметры поиска документа
 *
 * @author С. Благодатских
 */
public class DocumentCriteria {

	public Long volume;
	public String number;
	public Long type;
	public String title;

	public Long startPage;
	public Long endPage;
	public Date date;
	public String court;
	public String remark;
	public String fio;
	public String context;

	private static SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy");

	private boolean nullable;

	public DocumentCriteria() {
	}

	public DocumentCriteria(String input) {
		if (input.isEmpty()) {
			nullable = true;
			return;
		}
		try {
			JSONObject jo = new JSONObject(input);
			Iterator it = jo.keys();
			String key, value;
			while (it.hasNext()) {
				key = (String) it.next();
				value = jo.getString(key);
				if (value.isEmpty()) {
					continue;
				}
				try {
					switch (key) {
						case "volume":
						case "type":
						case "startPage":
						case "endPage":
							getClass().getField(key).set(this, Long.parseLong(value));
							break;
						case "date":
							date = sdf.parse(value);
							break;
						case "number":
						case "title":
						case "court":
						case "remark":
						case "fio":
						case "context":
							getClass().getField(key).set(this, value);
					}
				} catch (IllegalArgumentException | ParseException | NoSuchFieldException | SecurityException | IllegalAccessException ex) {
					Logger.getLogger(DocumentCriteria.class.getName()).log(Level.SEVERE, null, ex);
				}
			}
		} catch (JSONException ex) {
			Logger.getLogger(DocumentCriteria.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public boolean isNullable() {
		return nullable;
	}

	@Override
	public String toString() {
		return "DocumentCriteria{" + "volume=" + volume + ", number=" + number + ", type=" + type + ", title=" + title + ", startPage=" + startPage + ", endPage=" + endPage + ", date=" + date + ", court=" + court + ", remark=" + remark + ", fio=" + fio + ", nullable=" + nullable + '}';
	}

}

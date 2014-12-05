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

	public Short volume;
	public String number;
	public Short type;
	public String title;

	public Short startPage;
	public Short endPage;
	public Date date;
	public String court;
	public String remark;
	public String fio;
	public String context;

	public DocumentCriteria() {
	}

	public DocumentCriteria(String input) {
		try {
			JSONObject jo = new JSONObject(input);
			Iterator it = jo.keys();
			String key;
			while (it.hasNext()) {
				key = (String) it.next();
				if (key.equals("volume")) {

				} else if (key.equals("number")) {

				} else if (key.equals("type")) {
				} else if (key.equals("title")) {
				} else if (key.equals("startPage")) {
				} else if (key.equals("endPage")) {
				} else if (key.equals("date")) {
				} else if (key.equals("court")) {
				} else if (key.equals("remark")) {
				} else if (key.equals("fio")) {
				} else if (key.equals("context")) {

				}
			}
		} catch (JSONException ex) {
			Logger.getLogger(DocumentCriteria.class.getName()).log(Level.SEVERE, null, ex);
		} catch (IllegalArgumentException ex) {
			Logger.getLogger(DocumentCriteria.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public Short getVolume() {
		return volume;
	}

	public void setVolume(Short volume) {
		this.volume = volume;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public Short getType() {
		return type;
	}

	public void setType(Short type) {
		this.type = type;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Short getStartPage() {
		return startPage;
	}

	public void setStartPage(Short startPage) {
		this.startPage = startPage;
	}

	public Short getEndPage() {
		return endPage;
	}

	public void setEndPage(Short endPage) {
		this.endPage = endPage;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getCourt() {
		return court;
	}

	public void setCourt(String court) {
		this.court = court;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getFio() {
		return fio;
	}

	public void setFio(String fio) {
		this.fio = fio;
	}

	public String getContext() {
		return context;
	}

	public void setContext(String context) {
		this.context = context;
	}

}

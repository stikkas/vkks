package ru.fake.model;

/**
 * Используется для результатов поиска документов по параметрам
 *
 * @author С. Благодатских
 */
public class DocumentResult {

	/**
	 * Идентификатор
	 */
	private Integer id;
	/**
	 * Дело, которому принадлежит документ
	 */
	private String acase;
	/**
	 * Номер документа
	 */
	private String number;
	/**
	 * Вид документа
	 */
	private String type;
	/**
	 * заголовок документа
	 */
	private String title;
	/**
	 * листы
	 */
	private String pages;
	/**
	 * дата документа
	 */
	private String date;
	/**
	 * суд
	 */
	private String court;
	/**
	 * ФИО
	 */
	private String fio;
	/**
	 * графический образ
	 */
	private String graph;

	public DocumentResult() {
	}

	public DocumentResult(Integer id, String acase, String number,
		String type, String title, String pages, String date,
		String court, String fio, String graph) {
		this.id = id;
		this.acase = acase;
		this.number = number;
		this.type = type;
		this.title = title;
		this.pages = pages;
		this.date = date;
		this.court = court;
		this.fio = fio;
		this.graph = graph;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAcase() {
		return acase;
	}

	public void setAcase(String acase) {
		this.acase = acase;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPages() {
		return pages;
	}

	public void setPages(String pages) {
		this.pages = pages;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getCourt() {
		return court;
	}

	public void setCourt(String court) {
		this.court = court;
	}

	public String getFio() {
		return fio;
	}

	public void setFio(String fio) {
		this.fio = fio;
	}

	public String getGraph() {
		return graph;
	}

	public void setGraph(String graph) {
		this.graph = graph;
	}

}

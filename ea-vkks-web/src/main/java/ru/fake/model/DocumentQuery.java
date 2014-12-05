package ru.fake.model;

/**
 * Используется для получения данных запроса от клиента
 *
 * @author С. Благодатских
 */
public class DocumentQuery {

	public Integer page;
	public Integer start;
	public Integer limit;
	public DocumentCriteria q;

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public DocumentCriteria getQ() {
		return q;
	}

	public void setQ(DocumentCriteria q) {
		this.q = q;
	}

}

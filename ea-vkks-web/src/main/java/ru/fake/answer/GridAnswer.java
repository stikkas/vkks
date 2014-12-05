package ru.fake.answer;

/**
 * Используется для ответов хранилищам с возможностью листания (в том числе и
 * grid)
 *
 * @author С. Благодатских
 */
public class GridAnswer {

	private int total;
	private Object[] items;

	public GridAnswer() {
	}

	public GridAnswer(int total) {
		this.total = total;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public Object[] getItems() {
		return items;
	}

	public void setItems(Object[] items) {
		this.items = items;
	}

}

/*
 * Переопределяем класс для листания страниц грида
 */

Ext.define('Other.toolbar.Paging', {
	override: 'Ext.toolbar.Paging',
	/**
	 * Переопределяем частный метод.
	 * Дешево и сердито.
	 * Не хотим, чтобы отоброжалась кнопка обновить
	 * @returns {Array}
	 */
	getPagingItems: function () {
		var origin = this.callParent();
		origin.pop(); // Сама кнопка обновить
		origin.pop(); // разделитель
		return origin;
	}
});

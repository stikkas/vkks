/**
 * Контроллер для некоторых элементов ЭФ "Документ"
 */
Ext.define('Earh.view.work.DocController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.docwork',
	init: function () {
		this.page = this.view.up('adoc');
	},
	/**
	 * Обрабатывает событие выбора файла пользователем
	 * @param ff {Object} поле выбора файла
	 * @param path {String} имя файла, отдаваемое браузером
	 */
	graphAdded: function (ff, path) {
		// Не работает, т.к. браузер отдает поддельный адрес
		this.page.model.getGraph().set('url', path);
		this.page.setGraph();
	},
	/**
	 * Удаляет графический образ документа
	 */
	removeGraph: function () {
		this.page.model.getGraph().set('url', null);
		this.page.setGraph();
	}
});



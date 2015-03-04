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
		var text;
		if (path) {
			text = path.substr(path.lastIndexOf("\\") + 1);
			this.page.graph = text;
		} else {
			this.page.graph = null;
			text = Trans.addGraph;
		}

		ff.nextSibling().setText(text);
	},
	/**
	 * Удаляет графический образ документа
	 */
	removeGraph: function () {
		var controller = this;
		requestToRemove("графический образ", function () {
			controller.page.removeGraph();
		});
	}
});



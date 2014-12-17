/**
 * Базовая форма для поиска
 * @abstract
 */
Ext.define('Earh.view.search.Base', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.layout.container.VBox',
		'Ext.layout.container.Fit',
		'Ext.grid.Panel',
		'Ext.form.Panel',
		'Ext.toolbar.Paging',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.form.field.Text'
	],
	layout: 'vbox',
	cls: 'fields_panel',
	initComponent: function (searchForm, resultGrid) {
		var baseForm = this;
		baseForm.items = [
			searchForm,
			resultGrid
		];
		baseForm.callParent();
		baseForm._frm = baseForm.items.getAt(0);
		baseForm._rslt = baseForm.items.getAt(1);
		baseForm._gtb = baseForm._rslt.dockedItems.getAt(1);
	},
	/**
	 * Реализация общего интерфейса для всех страниц
	 * Для проверки несохраненных данных
	 * @returns {Boolean}
	 */
	isDirty: function () {
		return false;
	},
	/**
	 * Очищает форму, если приходим с главной страницы
	 * @returns {undefined}
	 */
	clear: function () {
		this._frm.reset();
		this._rslt.store.removeAll();
		this._gtb.onLoad();
	},
	/**
	 * Функция поиска по критериям
	 */
	search: function () {
		var view = this,
				model = view.model;
		view._frm.updateRecord(model);
		view._rslt.store.loadPage(1, {
			params: {q: Ext.encode(model.data)}
		});
	}
});



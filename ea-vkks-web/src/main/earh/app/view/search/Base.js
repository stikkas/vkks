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
	initComponent: function (searchForm, resultGrid) {
		var baseForm = this;
		baseForm.items = [
			baseForm._frm = searchForm,
			baseForm._rslt = resultGrid
		];
		baseForm.callParent();
	}
});



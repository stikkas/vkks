/**
 * Модель атрибутов дела
 */
Ext.define('Earh.model.Case', {
	extend: 'Ext.data.Model',
	requires: ['Ext.data.proxy.Ajax'],
	fields: ['id', 'number', 'type', 'storeLife', 'title', 'toporef', 'remark'],
	constructor: function () {
		this.callParent();
		this.setProxy(Ext.create('Ext.data.proxy.Ajax', {
			type: 'ajax',
			writer: 'json',
			reader: 'json',
			url: Urls.ccase
		}));
	}
});



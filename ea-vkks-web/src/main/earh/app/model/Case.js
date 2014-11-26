/**
 * Модель атрибутов дела
 */
Ext.define('Earh.model.Case', {
	extend: 'Ext.data.Model',
	requires: ['Ext.data.proxy.Ajax'],
	fields: [{name: 'id', type: 'int', defaultValue: null},
		{name: 'number', type: 'string', defaultValue: null},
		{name: 'type', type: 'int', defaultValue: null},
		{name: 'storeLife', type: 'int', defaultValue: null},
		{name: 'title', type: 'string', defaultValue: null},
		{name: 'startDate', type: 'date', defaultValue: null},
		{name: 'endDate', type: 'date', defaultValue: null},
		{name: 'toporef', type: 'int', defaultValue: null},
		{name: 'remark', type: 'string', defaultValue: null}],
	constructor: function () {
		Earh.model.Case.setProxy(Ext.create('Ext.data.proxy.Ajax', {
			type: 'ajax',
			writer: 'json',
			reader: 'json',
			url: Urls.ccase
		}));
		this.callParent();
	}
});



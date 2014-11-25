/**
 * Модель атрибутов дела
 */
Ext.define('Earh.model.Case', {
	extend: 'Ext.data.Model',
	requires: ['Ext.data.proxy.Ajax'],
	fields: [{name: 'id', type: 'int', default: null},
		{name: 'number', type: 'string', default: null},
		{name: 'type', type: 'int', default: null},
		{name: 'storeLife', type: 'int', default: null},
		{name: 'title', type: 'string', default: null},
		{name: 'startDate', type: 'date', default: null},
		{name: 'endDate', type: 'date', default: null},
		{name: 'toporef', type: 'int', default: null},
		{name: 'remark', type: 'string', default: null}],
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



/**
 * Модель атрибутов дела
 * @abstract
 */
Ext.define('Earh.model.Case', {
	extend: 'Ext.data.Model',
	requires: ['Ext.data.proxy.Ajax'],
	fields: [{name: 'id', type: 'string', defaultValue: null, convert: function (v) {
				if (v && v.match(/^Earh/))
					return null;
				return v;
			}},
		{name: 'number', type: 'string', defaultValue: null},
		{name: 'type', type: 'int', defaultValue: null},
		{name: 'storeLife', type: 'int', defaultValue: null},
		{name: 'title', type: 'string', defaultValue: null},
		{name: 'startDate', type: 'date', defaultValue: null, dateFormat: 'd.m.Y'},
		{name: 'endDate', type: 'date', defaultValue: null, dateFormat: 'd.m.Y'},
		{name: 'toporef', type: 'int', defaultValue: null},
		{name: 'remark', type: 'string', defaultValue: null}],
	proxy: {
		type: 'ajax',
		writer: 'json',
		reader: 'json'
	}
});



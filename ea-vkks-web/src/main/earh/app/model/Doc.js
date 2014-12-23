/**
 * Модель для создания, обновления и удаления документа
 */
Ext.define('Earh.model.Doc', {
	extend: 'Ext.data.Model',
	requires: ['Ext.data.proxy.Ajax'],
	uses: 'Earh.model.Graph',
	fields: [
		{name: 'id', type: 'string', defaultValue: null, convert: function (v) {
				if (v && v.match(/^Earh/))
					return null;
				return v;
			}},
		{name: 'volume', type: 'int', defaultValue: null},
		{name: 'caseId', type: 'string', defaultValue: null},
		{name: 'caseTitle', type: 'string', defaultValue: null},
		{name: 'number', type: 'string', defaultValue: null},
		{name: 'type', type: 'int', defaultValue: null},
		{name: 'title', type: 'string', defaultValue: null},
		{name: 'startPage', type: 'int', defaultValue: null},
		{name: 'endPage', type: 'int', defaultValue: null},
		{name: 'date', type: 'date', defaultValue: null, dateFormat: 'd.m.Y'},
		{name: 'remark', type: 'string', defaultValue: null},
		{name: 'court', type: 'string', defaultValue: null},
		{name: 'fio', type: 'string', defaultValue: null},
		{name: 'graph', type: 'string', defaultValue: null}
	],
	/*
	 associations: [
	 {type: 'hasOne', model: 'Earh.model.Graph', foreingKey: 'id',
	 setterName: 'setGraph', getterName: 'getGraph'}
	 ],
	 */
	proxy: {
		type: 'ajax',
		reader: 'json',
		writer: {
			type: 'json',
			writeAllFields: true
		}
	}
});



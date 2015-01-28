/**
 * Модель для найденых документов дела
 */

Ext.define('Earh.model.CaseDocResult', {
	extend: 'Ext.data.Model',
	fields: ['id', 'number', 'type', 'title',
		'pages', 'date', 'remark', 'court', 'fio', 'graph']
});



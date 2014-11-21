/**
 * Модель для результатов поиска дел
 */
Ext.define('Earh.model.CaseResult', {
	extend: 'Ext.data.Model',
	fields: ['id', 'number', 'type', 'storeLife', 'title',
		'dates', 'toporef', 'remark']
});



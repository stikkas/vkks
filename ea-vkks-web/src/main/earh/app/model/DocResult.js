/**
 * Модель для найденых документов (не в зависимости от принадлежности к делу)
 */

Ext.define('Earh.model.DocResult', {
	extend: 'Ext.data.Model',
	fields: ['id', 'caseId', 'acase', 'toporef', 'number', 'type', 'title',
		'pages', 'date', 'court', 'fio', 'graph']
});



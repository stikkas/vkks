/**
 * Модель для найденых документов дела
 */

Ext.define('Earh.model.DocResult', {
	extend: 'Ext.data.Model',
	fields: ['id', 'volume', 'docnumber', 'doctype', 'doctitle',
		'pages', 'docdate', 'court', 'fio', 'graph']
});



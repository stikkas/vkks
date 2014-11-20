/**
 * Модель для результатов поиска дел
 */
Ext.define('Earh.model.CaseResult', {
	extend: 'Ext.data.Model',
	fields: ['id', 'caseNum', 'caseType', 'storeLife', 'caseTitle',
		'startDate', 'endDate', 'topoRef', 'volumeNum']
});



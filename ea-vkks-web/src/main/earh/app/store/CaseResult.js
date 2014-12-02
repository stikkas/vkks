/**
 * Хранилище для найденных дел
 */
Ext.define('Earh.store.CaseResult', {
	extend: 'Earh.store.SearchResult',
	requires: ['Earh.model.CaseResult'],
	model: 'Earh.model.CaseResult',
	storeId: 'casesStore',
	singleton: true,
	pageSize: 12,
	constructor: function () {
		this.callParent(['cases']);
	}
});



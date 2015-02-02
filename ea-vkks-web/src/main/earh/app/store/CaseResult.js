/**
 * Хранилище для найденных дел
 */

Ext.define('Earh.store.CaseResult', {
	extend: 'Earh.store.SearchResult',
	model: 'Earh.model.CaseResult',
	storeId: 'casesStore',
	pageSize: 10,
	constructor: function () {
		this.callParent([Urls.cases]);
	}
});

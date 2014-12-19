/*
 * Хранилище для найденных документов дела
 */
Ext.define('Earh.store.CaseDocResult', {
	extend: 'Earh.store.SearchResult',
	model: 'Earh.model.CaseDocResult',
	storeId: 'caseDocsStore',
	pageSize: 4,
	constructor: function () {
		this.callParent([Urls.casedocs]);
	}
});


/*
 * Хранилище для найденных документов дела
 */
Ext.define('Earh.store.CaseDocResult', {
	extend: 'Earh.store.SearchResult',
	requires: ['Earh.model.CaseDocResult'],
	model: 'Earh.model.CaseDocResult',
	storeId: 'caseDocsStore',
	singleton: true,
	constructor: function () {
		this.callParent(['casedocs']);
	}
});


/*
 * Хранилище для найденных документов дела
 */
Ext.define('Earh.store.CaseDocResult', {
	extend: 'Earh.store.SearchResult',
	model: 'Earh.model.CaseDocResult',
	storeId: 'caseDocsStore',
	singleton: true,
	constructor: function () {
		this.callParent(['casedocs']);
	}
});


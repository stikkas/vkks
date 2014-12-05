/*
 * Хранилище для найденных документов (не в зависимости от принадлежности к делу)
 */
Ext.define('Earh.store.DocResult', {
	extend: 'Earh.store.SearchResult',
	model: 'Earh.model.DocResult',
	storeId: 'docsStore',
	pageSize: 10,
	constructor: function () {
		this.callParent([Urls.docs]);
	}
});


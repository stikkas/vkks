/*
 * Хранилище для найденных документов (не в зависимости от принадлежности к делу)
 */
Ext.define('Earh.store.DocResult', {
	extend: 'Earh.store.SearchResult',
	model: 'Earh.model.DocResult',
	storeId: 'docsStore',
	constructor: function () {
		this.callParent([Urls.docs]);
	}
});


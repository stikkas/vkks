/*
 * Хранилище для найденных документов (не в зависимости от принадлежности к делу)
 */
Ext.define('Earh.store.DocResult', {
	extend: 'Earh.store.SearchResult',
	requires: ['Earh.model.DocResult'],
	model: 'Earh.model.DocResult',
	storeId: 'docsStore',
	singleton: true,
	constructor: function () {
		this.callParent(['docs']);
	}
});


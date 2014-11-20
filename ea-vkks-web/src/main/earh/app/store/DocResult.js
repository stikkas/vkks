/*
 * Хранилище для найденных документов дела
 */
Ext.define('Earh.store.DocResult', {
	extend: 'Earh.store.SearchResult',
	constructor: function () {
		this.callParent(['Earh.model.DocResult', Searchs.doc]);
	}
});




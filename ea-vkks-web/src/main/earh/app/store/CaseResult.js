/**
 * Хранилище для найденных дел
 */
Ext.define('Earh.store.CaseResult', {
	extend: 'Earh.store.SearchResult',
	constructor: function () {
		this.callParent(['Earh.model.CaseResult', Searchs.acase]);
	}
});



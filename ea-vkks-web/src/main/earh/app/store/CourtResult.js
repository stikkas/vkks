/**
 * Хранилище для судов
 */
Ext.define('Earh.store.CourtResult', {
	extend: 'Earh.store.BigDicts',
	storeId: 'courtsStore',
	constructor: function () {
		this.callParent([Urls.courts]);
	}
});



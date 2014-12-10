/**
 * Хранилище для ФИО
 */
Ext.define('Earh.store.FioResult', {
	extend: 'Earh.store.BigDicts',
	storeId: 'fiosStore',
	constructor: function () {
		this.callParent([Urls.fios]);
	}
});




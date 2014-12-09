/**
 * Хранилище для ФИО
 */
Ext.define('Earh.store.FioResult', {
	extend: 'Earh.store.BigDicts',
	model: 'Earh.model.FioResult',
	storeId: 'fiosStore',
	constructor: function () {
		this.callParent([Urls.fios]);
	}
});




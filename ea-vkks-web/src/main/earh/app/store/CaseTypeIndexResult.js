/**
 * Хранилище для префиксов номеров дел
 */
Ext.define('Earh.store.CaseTypeIndexResult', {
	extend: 'Earh.store.BigDicts',
	storeId: 'caseTypeIndex',
	constructor: function () {
		this.callParent([Urls.prefixes]);
	}
});



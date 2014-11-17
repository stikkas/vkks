/**
 * Справочник "Тип архивного дела"
 */
Ext.define('Earh.store.CaseType', {
	extend: 'Earh.store.Dict',
	storeId: 'caseTypeStore',
	singleton: true,
	constructor: function () {
		this.callParent([Dicts.casetype]);
	}
});


/**
 * Справочник "Вид архивного документа"
 */
Ext.define('Earh.store.DocType', {
	extend: 'Earh.store.Dict',
	storeId: 'docTypeStore',
	singleton: true,
	constructor: function () {
		this.callParent([Dicts.doctype]);
	}
});


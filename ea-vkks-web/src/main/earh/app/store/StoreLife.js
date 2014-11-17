/**
 * Справочник "Срок хранения архивного дела"
 */
Ext.define('Earh.store.StoreLife', {
	extend: 'Earh.store.Dict',
	storeId: 'storeLifeStore',
	singleton: true,
	constructor: function () {
		this.callParent([Dicts.storelife]);
	}
});


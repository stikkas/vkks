/**
 * Справочник "Срок хранения архивного дела"
 */
Ext.define('Earh.store.StoreLife', {
	extend: 'Earh.store.Dict',
	storeId: 'storeLifeStore',
	singleton: true,
	data: [
		{id: 1, value: "дело постоянного хранения", code: ''},
		{id: 2, value: "дело временного хранения (> 10 лет)", code: ''},
		{id: 3, value: "дело временного хранения (< 10 лет)", code: ''},
		{id: 4, value: "дело по личному составу", code: ''},
		{id: 5, value: "5 лет", code: ''}],
	constructor: function () {
		this.callParent(['storelife']);
	}
});


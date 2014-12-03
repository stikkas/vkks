/**
 * Хранилище для судов
 */
Ext.define('Earh.store.CourtResult', {
	extend: 'Earh.store.SearchResult',
	model: 'Earh.model.CourtResult',
	storeId: 'courtsStore',
	data: [
		{court: "Хамовнический"},
		{court: "Рамовнический"},
		{court: "Бамовнический"},
		{court: "Гамовнический"},
		{court: "Жамовнический"},
		{court: "Памовнический"},
		{court: "Замовнический"},
		{court: "Цамовнический"},
		{court: "Шамовнический"},
		{court: "Петровский"},
		{court: "Высший"}
	],
	singleton: true,
	constructor: function () {
		this.callParent(['courts']);
	}
});



/**
 * Хранилище для ФИО
 */
Ext.define('Earh.store.FioResult', {
	extend: 'Earh.store.SearchResult',
	requires: ['Earh.model.FioResult'],
	model: 'Earh.model.FioResult',
	storeId: 'fiosStore',
	data: [
		{fio: "Иванов И.М."},
		{fio: "Петров И.П."},
		{fio: "Цветков И.Я."},
		{fio: "Конанов И.Н."},
		{fio: "Ушаков И.И."},
		{fio: "Бузенков И.И."},
		{fio: "Безногий Б.Б."},
		{fio: "Ручейник Р.И."},
		{fio: "Гнездо Г.И."},
		{fio: "Окно И.И."},
		{fio: "Качан К.И."},
		{fio: "Трутнов И.И."},
		{fio: "Ковалев И.И."},
		{fio: "Жмульков В.В."}
	],
	singleton: true,
	constructor: function () {
		this.callParent(['fios']);
	}
});




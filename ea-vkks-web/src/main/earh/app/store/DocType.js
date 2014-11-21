/**
 * Справочник "Вид архивного документа"
 */
Ext.define('Earh.store.DocType', {
	extend: 'Earh.store.Dict',
	storeId: 'docTypeStore',
	singleton: true,
	data: [
		{id: 1, value: "Поручение", code: ''},
		{id: 2, value: "Обращение", code: ''},
		{id: 3, value: "Опись", code: ''},
		{id: 4, value: "CD диск", code: ''},
		{id: 5, value: "Копия обращения", code: ''},
		{id: 6, value: "Копия сопроводительного письма", code: ''},
		{id: 7, value: "Ответ Председателя Совета судей РФ", code: ''},
		{id: 8, value: "Копия сопроводительного письма Председателю Следственного комитета РФ", code: ''},
		{id: 9, value: "Ответ Следственного комитета РФ", code: ''},
		{id: 10, value: "Конверт", code: ''},
		{id: 11, value: "Докладная записка Председателю ВККС РФ", code: ''},
		{id: 12, value: "Ответ ВККС РФ", code: ''},
		{id: 13, value: "Объявление", code: ''},
		{id: 14, value: "Заявление", code: ''},
		{id: 15, value: "Справка", code: ''},
		{id: 16, value: "Характеристика", code: ''},
		{id: 17, value: "Основные показатели", code: ''},
		{id: 18, value: "Уведомления", code: ''},
		{id: 19, value: "Копия анкеты", code: ''},
		{id: 20, value: "Запрос", code: ''},
		{id: 21, value: "Заявление об ознакомлении с материалами", code: ''},
		{id: 22, value: "Жалоба с приложением", code: ''},
		{id: 23, value: "Конверт (приложение к жалобе)", code: ''},
		{id: 24, value: "Ходатайство о приобщении документов к материалам дела с приложением", code: ''},
		{id: 25, value: "Файл с фотографиями (приложение к ходатайству)", code: ''},
		{id: 26, value: "Протокол", code: ''},
		{id: 27, value: "Решение", code: ''},
		{id: 28, value: "Заявление о выдаче протокола", code: ''},
		{id: 29, value: "Сопроводительное письмо", code: ''}
	],
	constructor: function () {
		this.callParent(['doctype']);
	}
});


/**
 * Главная страница. Каждая страница имеет свойство tbb,
 * в котором перечесляются нулями и единицами, кнопки панели инструментов:
 * 0 - кнопка не будет показана,
 * 1 - кнопка будет показана.
 */
Ext.define('Earh.view.home.Home', {
	extend: 'Ext.container.Container',
	alias: 'widget.home',
	requires: [
		'Ext.layout.container.HBox',
		'Ext.button.Button'
	],
	layout: 'hbox',
	initComponent: function () {
		this.items = [{
				xtype: 'container',
				layout: 'vbox',
				items: [{
						xtype: 'button',
						text: Trans.caseSearch,
						handler: 'toCasesSearch'
					}, {
						xtype: 'button',
						text: Trans.caseAdd,
						handler: 'toCaseAdd'
					}]
			}, {
				xtype: 'button',
				text: Trans.docAdd,
				handler: 'toDocAdd'
			}];
		this.callParent();
		this.tbb = [0, // Главная
			0, // Вернуться к результатам поиска
			0, // Вернуться в дело
			0, // пробел
			0, // Поиск
			0, // Сохранить
			0, // Удалить
			0, // Редактировать
			1, // сдвиг вправо
			1, // ФИО
			1, // разделитель
			1];// Выход
	}
});
